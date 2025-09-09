import { useParams, useLocation, Link } from "react-router-dom";
import "../ProjectDetails.css";
import { pastWinners } from "./Winners";
import { 
  UsersRound, Facebook, Linkedin, Twitter, 
  Share, Medal, Calendar, GraduationCap, 
  ChevronLeft, ChevronRight, Download, ExternalLink 
} from "lucide-react";
import { ImageMinus } from "lucide-react";
import Footer from "./Footer";
import { useState, useEffect } from "react";

interface PastWinnersProps {
  name: string;
  project: string;
  position?: number;
  department: string;
  year: number;
  semester?: string;
  author?: string;
  description: string;
  teamMembers?: string[];
  images?: string[];
  videoLink?: string;
  projectLink?: string;
  projectPdf?: string;
  category?: string;
}

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
 const { id:projectId } = useParams(); // gets "123"
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const winnerData = queryParams.get("data");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const winner: ShowcaseEntry | null = winnerData ? JSON.parse(decodeURIComponent(winnerData)) : null;
  console.log("Project ID from URL:", projectId);
  console.log("Winner from state:", winner);


  // Mock images array (replace with actual images from winner object when available)
  const projectImages = winner?.winning_pic && winner?.winning_pic.split(",") || [
    "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg",
    "/src/assets/showcase.jpg",
    "/src/assets/capstone-showcase/src/assets/asuSquareLogo.png"
  ];

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



  // Generate relevant hashtags
  const generateHashtags = (winner: ShowcaseEntry): string => {
    const tags = ['#ASUEngineering', '#CapstoneProject', '#Innovation'];
    
    if (winner.department || 'Computer Science') {
      tags.push(`#${winner.department?.toLowerCase().replace(/\s+/g, '')}`);
    }
    
    // Add tech-specific hashtags
    const content = (winner.ProjectTitle + ' ' + (winner.description || '')).toLowerCase();
    if (content.includes('ai') || content.includes('machine learning')) tags.push('#AI');
    if (content.includes('react') || content.includes('javascript')) tags.push('#WebDev');
    if (content.includes('mobile') || content.includes('android') || content.includes('ios')) tags.push('#MobileApp');
    if (content.includes('data')) tags.push('#DataScience');
    
    return tags.slice(0, 5).join(' '); // Limit to 5 hashtags
  };

  // Enhanced social sharing function
  const shareProject = (platform: string, winner: ShowcaseEntry) => {
    const url = window.location.href;
    const summary = winner.description?.substring(0, 100) + '...';
    const title = winner.ProjectTitle;
    const imageUrl = winner.winning_pic ? winner.winning_pic.split(",")[0] : undefined;
    const hashtags = generateHashtags(winner);
    
    switch (platform) {
      case 'facebook':
        if (imageUrl) {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`Check out this amazing ASU Engineering project: ${title}!`)}`,
            '_blank'
          );
        } else {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank'
          );
        }
        break;

      case 'twitter':
        const tweetText = `${title}\n\n💡 ${summary}\n\n${hashtags}\n\n👉 ${url}`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
          '_blank'
        );
        break;

      case 'linkedin':
        const linkedinText = `Excited to share this ASU Engineering project: ${title}\n\n${summary}`;
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(linkedinText)}`,
          '_blank'
        );
        break;

      case 'copy':
        const copyText = imageUrl 
          ? `${title}\n\n${summary}\n\nImage: ${imageUrl}\n\n🔗 ${url}\n\n${hashtags}`
          : `${title}\n\n${summary}\n\n🔗 ${url}\n\n${hashtags}`;
        
        navigator.clipboard.writeText(copyText).then(() => {
          alert('Project details copied to clipboard!');
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = copyText;
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
    <div className="project-details-container">
      {/* Back to Winners Button */}
      <div className="back-button-container">
        <Link to="/winners" className="back-button">
          <ChevronLeft size={18} /> Back to Winners
        </Link>
      </div>

      {/* Project Header */}
      <div className="project-header">
        <div className="project-header-content">
          <div className="project-badge">
            {winner.position && (
              <div className="position-badge">
                <Medal size={18} /> {getPositionText(winner.position)}
              </div>
            )}
            <div className="semester-badge">
              <Calendar size={18} /> {winner.semester} {winner.year}
            </div>
            <div className="department-badge">
              <GraduationCap size={18} /> {winner.department || "Computer Science"}
            </div>
          </div>

          <h1 className="project-title">{winner.ProjectTitle}</h1>

          <div className="project-author">
            <UsersRound size={24} /> sponsored by {winner.Sponsor || "John Doe"}
          </div>
        </div>
      </div>

      <div className="project-content">
        {/* Image Gallery */}
        <div className="project-gallery">
          <div className="gallery-image-container">
            {projectImages.length > 0 ? (
              <>
                <img 
                  src={projectImages[currentImageIndex]} 
                  alt={`${winner.ProjectTitle} - Image ${currentImageIndex + 1}`} 
                  className="gallery-image"
                />
                
                {projectImages.length > 1 && (
                  <div className="gallery-controls">
                    <button onClick={prevImage} className="gallery-control-btn">
                      <ChevronLeft size={24} />
                    </button>
                    <span className="gallery-pagination">
                      {currentImageIndex + 1} / {projectImages.length}
                    </span>
                    <button onClick={nextImage} className="gallery-control-btn">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="placeholder-image">
                <ImageMinus size={120} />
                <p>No project images available</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="project-info">
          <div className="info-section">
            <h2 className="section-title">Project Overview</h2>
            <p className="project-description">{winner.description}</p>
          </div>

          {/* Team Members Section */}
          <div className="info-section">
            <h2 className="section-title">Team Members</h2>
            <div className="team-members">
              {teamMembers.map((member: string, index: number) => (
                <div key={index} className="team-member">
                  <div className="member-avatar">
                    <UsersRound size={24} />
                  </div>
                  <span>{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Resources */}
          <div className="info-section">
            <h2 className="section-title">Project Resources</h2>
            <div className="project-resources">
              {winner.video && (
                <a href={winner.video} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <ExternalLink size={18} /> Watch Demo Video
                </a>
              )}
             
              {!winner.video && (
                <p className="no-resources">No additional resources available</p>
              )}
            </div>
          </div>

          {/* Social Sharing */}
          <div className="info-section">
            <h2 className="section-title">Share This Project</h2>
            <div className="social-icons">
              <button 
                onClick={() => shareProject('facebook', winner)} 
                className="share-icon" 
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                <Facebook size={24} />
              </button>
              <button 
                onClick={() => shareProject('linkedin', winner)} 
                className="share-icon" 
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <Linkedin size={24} />
              </button>
              <button 
                onClick={() => shareProject('twitter', winner)} 
                className="share-icon" 
                aria-label="Share on Twitter"
                title="Share on Twitter"
              >
                <Twitter size={24} />
              </button>
              <button 
                onClick={() => shareProject('copy', winner)} 
                className="share-icon" 
                aria-label="Copy link"
                title="Copy link to clipboard"
              >
                <Share size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="asu-branding">
        <img 
          src="https://innovationshowcase.engineering.asu.edu/wp-content/themes/pitchfork/src/endorsed-logos/asu_fultonengineering_white.png" 
          alt="ASU Fulton Engineering" 
          className="asu-logo"
        />
      </div>
      
      <Footer />
    </div>
  );
}