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
import { useState } from "react";

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
}
export default function ProjectDetails() {
  const location = useLocation();
  const { projectId } = useParams();
  let winner = location.state?.winner;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock images array (replace with actual images from winner object when available)
  const projectImages = winner?.images || [
    "/src/assets/asuSquareLogo.png",
    "/src/assets/showcase.jpg",
    "/src/assets/capstone-showcase/src/assets/asuSquareLogo.png"
  ];

  // Fallback: find winner by projectId if not passed in state
  if (!winner && projectId) {
    winner = pastWinners.find((w: PastWinnersProps) => w.project === projectId);
  }

  if (!winner) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <p>The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/winners" className="back-button">
          <ChevronLeft size={18} /> Back to Winners
        </Link>
      </div>
    );
  }

  // Mock team members (replace with actual team members from winner object when available)
  const teamMembers = winner.teamMembers || [winner.author || "Project Lead"];

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

  // Handle social sharing
  const shareProject = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this amazing capstone project: ${winner.project} - ${winner.description.substring(0, 100)}...`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
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
              <GraduationCap size={18} /> {winner.department}
            </div>
          </div>
          
          <h1 className="project-title">{winner.project}</h1>
          
          <div className="project-author">
            <UsersRound size={24} /> sponsored by {winner.author || "John Doe"}
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
                  alt={`${winner.project} - Image ${currentImageIndex + 1}`} 
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
              {winner.projectLink && (
                <a href={winner.projectLink} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <ExternalLink size={18} /> Visit Project Website
                </a>
              )}
              {winner.videoLink && (
                <a href={winner.videoLink} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <ExternalLink size={18} /> Watch Demo Video
                </a>
              )}
              {winner.projectPdf && (
                <a href={winner.projectPdf} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <Download size={18} /> Download Project PDF
                </a>
              )}
              {!winner.projectLink && !winner.videoLink && !winner.projectPdf && (
                <p className="no-resources">No additional resources available</p>
              )}
            </div>
          </div>

          {/* Social Sharing */}
          <div className="info-section">
            <h2 className="section-title">Share This Project</h2>
            <div className="social-icons">
              <button onClick={() => shareProject('facebook')} className="share-icon" aria-label="Share on Facebook">
                <Facebook size={24}  />
              </button>
              <button onClick={() => shareProject('linkedin')} className="share-icon" aria-label="Share on LinkedIn">
                <Linkedin size={24} />
              </button>
              <button onClick={() => shareProject('twitter')} className="share-icon" aria-label="Share on Twitter">
                <Twitter size={24} />
              </button>
              <button onClick={() => shareProject('copy')} className="share-icon" aria-label="Copy link">
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
