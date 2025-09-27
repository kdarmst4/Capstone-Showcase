import { useParams, useLocation, Link } from "react-router-dom";
import "../ProjectDetails.css";
import { 
  UsersRound, Facebook, Linkedin, Twitter, 
  Share, Medal, Calendar, GraduationCap, 
  ChevronLeft, ChevronRight, ExternalLink 
} from "lucide-react";
import { ImageMinus } from "lucide-react";
import Footer from "./Footer";
import { useState, useEffect } from "react";


type ShowcaseEntry = {
  course: string;
  EntryID: number;
  video: string;
  shouldDisplay: "YES" | "NO"; 
  position: number;
  members: string;
  Sponsor: string;
  description: string;
  ProjectTitle: string;
  winning_pic: string | null;
  department?: string;
  NDA: "Yes" | "No"; 
  year: number;
  semester: "Spring" | "Summer" | "Fall" | "Winter"; 
};

export default function ProjectDetails() {
  const { id: projectId } = useParams(); // gets "123"
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const winnerData = queryParams.get("data");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [winner, setWinner] = useState<ShowcaseEntry | null>(
    winnerData ? JSON.parse(decodeURIComponent(winnerData)) : null
  );
  console.log("Project ID from URL:", projectId);
  console.log("Winner from state:", winner);


  // Mock images array (replace with actual images from winner object when available)
  const projectImages = winner?.winning_pic && winner?.winning_pic.split(",") || [
    "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg",
    "/src/assets/showcase.jpg",
    "/src/assets/capstone-showcase/src/assets/asuSquareLogo.png"
  ];

  useEffect(() => {
    if (!winnerData && projectId) {
      console.log("Fetching winner data for project ID:", projectId);
      fetch(`http://localhost:3000/api/winner/${projectId}`)
        .then(res => res.json())
        .then(data => {
          setWinner(data[0] as ShowcaseEntry);
          console.log("Winner data after fetch (if applicable):", data[0]);
        })
        .catch(err => {
          console.error("Error fetching winner data:", err);
          setWinner(null);
        });
    }
  }, [winnerData, projectId]);
  // Update Open Graph meta tags for better social sharing
  const updateOpenGraphTags = (winner: ShowcaseEntry, imageUrl?: string) => {
    const updateMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    
    const updateNameTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Open Graph tags
    updateMetaTag('og:title', winner.ProjectTitle);
    updateMetaTag('og:description', winner.description?.substring(0, 200) || '');
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('og:type', 'article');
    
    if (imageUrl) {
      updateMetaTag('og:image', imageUrl);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
    }
    
    // Twitter Card tags
    updateNameTag('twitter:card', imageUrl ? 'summary_large_image' : 'summary');
    updateNameTag('twitter:title', winner.ProjectTitle);
    updateNameTag('twitter:description', winner.description?.substring(0, 200) || '');
    
    if (imageUrl) {
      updateNameTag('twitter:image', imageUrl);
    }
  };

  // Update meta tags when component mounts or winner changes
  useEffect(() => {
    if (winner) {
      const imageUrl = projectImages.length > 0 ? projectImages[0] : undefined;
      updateOpenGraphTags(winner, imageUrl);
    }
  }, [winner, projectImages, projectId]);

  // CONDITIONAL RENDERING COMES AFTER ALL HOOKS
  if (!winner) {
    return (
      <div className="project-not-found" style={{color:"black"}}>
        <h2>Project not found</h2>
        <p>The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/winners" className="back-button">
          <ChevronLeft size={18} /> Back to Winners
        </Link>
      </div>
    );
  }

  // Mock team members (replace with actual team members from winner object when available)
  const teamMembers = winner.members.split(",") || ["Project Lead"];

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  // Format position for display
  const getPositionText = (position?: number) => {
    switch (position) {
      case 1: return "1st Place";
      case 2: return "2nd Place";
      case 3: return "3rd Place";
      default: return "Participant";
    }
  };





  // Enhanced social sharing function
  const shareProject = async (platform: string, winner: ShowcaseEntry | null) => {
    if (!winner) {
      alert("No project data to share!");
      return;
    }
  const url = window.location.origin + window.location.pathname;
    const title = "ASU Capstone Project";
    const projectTitle = winner.ProjectTitle;
    const description = winner.description.substring(0, 125) + '...';
    const shareText = `${title}\n${projectTitle}\n\nProject Description: ${description}\n\n${url}`;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Project details copied to clipboard!');
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = shareText;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Project details copied to clipboard!');
        });
        break;
      default:
        console.warn(`Unsupported share platform: ${platform}`);
    }
  };

  return (
    <div className="project-details__container">
      {/* Back to Winners Button */}
      <div className="project-details__back-button-container">
        <Link to="/winners" className="project-details__back-button">
          <ChevronLeft size={18} /> Back to Winners
        </Link>
      </div>

      {/* Project Header */}
      <div className="project-details__project-header">
        <div className="pproject-details__roject-header-content">
          <div className="project-details__project-badge">
            {winner.position && (
              <div className="project-details__position-badge">
                <Medal size={18} /> {getPositionText(winner.position)}
              </div>
            )}
            <div className="project-details__semester-badge">
              <Calendar size={18} /> {winner.semester} {winner.year}
            </div>
            <div className="project-details__department-badge">
              <GraduationCap size={18} /> {winner.department || "Computer Science"}
            </div>
          </div>

          <h1 className="project-details__project-title">{winner.ProjectTitle}</h1>

          <div className="project-details__project-author">
            <UsersRound size={24} /> sponsored by {winner.Sponsor || "John Doe"}
          </div>
        </div>
      </div>

      <div className="project-details__project-content">
        {/* Image Gallery */}
        <div className="project-details__project-gallery">
          <div className="project-details__gallery-image-container">
            {projectImages.length > 0 ? (
              <>
                <img 
                  src={projectImages[currentImageIndex]} 
                  alt={`${winner.ProjectTitle} - Image ${currentImageIndex + 1}`} 
                  className="project-details__gallery-image"
                />
                
                {projectImages.length > 1 && (
                  <div className="project-details__gallery-controls">
                    <button onClick={prevImage} className="project-details__gallery-control-btn">
                      <ChevronLeft size={24} />
                    </button>
                    <span className="project-details__gallery-pagination">
                      {currentImageIndex + 1} / {projectImages.length}
                    </span>
                    <button onClick={nextImage} className="project-details__gallery-control-btn">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="project-details__placeholder-image">
                <ImageMinus size={120} />
                <p>No project images available</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="project-details__project-info">
          <div className="project-details__info-section">
            <h2 className="project-details__section-title">Project Overview</h2>
            <p className="project-details__project-description">{winner.description}</p>
          </div>

          {/* Team Members Section */}
          <div className="project-details__info-section">
            <h2 className="project-details__section-title">Team Members</h2>
            <div className="project-details__team-members">
              {teamMembers.map((member: string, index: number) => (
                <div key={index} className="project-details__team-member">
                  <div className="project-details__member-avatar">
                    <UsersRound size={24} />
                  </div>
                  <span>{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Resources */}
          <div className="project-details__info-section">
            <h2 className="project-details__section-title">Project Resources</h2>
            <div className="project-details__project-resources">
              {winner.video && (
                <a href={winner.video} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <ExternalLink size={18} /> Watch Demo Video
                </a>
              )}
             
              {!winner.video && (
                <p className="project-details__no-resources">No additional resources available</p>
              )}
            </div>
          </div>

          {/* Social Sharing */}
          <div className="project-details__info-section">
            <h2 className="project-details__section-title">Share This Project</h2>
            <div className="project-details__social-icons">
              <button 
                onClick={() => shareProject('facebook', winner)} 
                className="project-details__share-icon" 
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                <Facebook size={24} />
              </button>
              <button 
                onClick={() => shareProject('linkedin', winner)} 
                className="project-details__share-icon" 
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <Linkedin size={24} />
              </button>
              <button 
                onClick={() => shareProject('twitter', winner)} 
                className="project-details__share-icon" 
                aria-label="Share on Twitter"
                title="Share on Twitter"
              >
                <Twitter size={24} />
              </button>
              <button 
                onClick={() => shareProject('copy', winner)} 
                className="project-details__share-icon" 
                aria-label="Copy link"
                title="Copy link to clipboard"
              >
                <Share size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="project-details__asu-branding">
        <img 
          src="https://innovationshowcase.engineering.asu.edu/wp-content/themes/pitchfork/src/endorsed-logos/asu_fultonengineering_white.png" 
          alt="ASU Fulton Engineering" 
          className="project-details__asu-logo"
        />
      </div>
      
      <Footer />
    </div>
  );
}