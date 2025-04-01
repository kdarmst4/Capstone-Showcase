import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/Interdisciplinary.css";
// import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const Interdisciplinary: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("interdisciplinary-page-body");
    fetch("https://asucapstone.com:3000/api/survey/interdisciplinary")
    //fetch("http://localhost:3000/api/survey/interdisciplinary")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    return () => {
      document.body.classList.remove("interdisciplinary-page-body");
    };
  }, []);

  const extractYouTubeThumbnail = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
  };

  const handleSurveyFormClick = () => {
    navigate("/survey");
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className={`interdisciplinary ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Interdisciplinary</h3>
              <button
                className="survey-form-button"
                onClick={handleSurveyFormClick}
                aria-label="Survey Form Button"
              >
                Survey Form
              </button>
            </div>
          </article>
        </section>

        <section className="projects-list">
          {projects.length === 0 ? (
            <p>No projects available for Interdisciplinary.</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${index % 2 === 0 ? "zigzag-left" : "zigzag-right"}`}
                onClick={() => handleProjectClick(project)}
              >
                {index % 2 === 0 && project.youtubeLink && (
                  <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={extractYouTubeThumbnail(project.youtubeLink) || ""}
                      alt={`${project.projectTitle} Thumbnail`}
                      className="youtube-thumbnail"
                    />
                  </a>
                )}
                <div className="project-details">
                  <h4 className="project-title">{project.projectTitle}</h4>
                  <p>
                    
                  </p>
                </div>
                {index % 2 !== 0 && project.youtubeLink && (
                  <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={extractYouTubeThumbnail(project.youtubeLink) || ""}
                      alt={`${project.projectTitle} Thumbnail`}
                      className="youtube-thumbnail"
                    />
                  </a>
                )}
              </div>
            ))
          )}
                              
        </section>
      </main>

      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>X</button>
            <div className="project-menu">
              <header className="modal-header-background" >
              </header>
            </div>           
            <div className="project-header">
              <div className="project-image">
                {selectedProject.youtubeLink && (
                  <a 
                    href={selectedProject.youtubeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Project Video"
                  >
                    <img 
                      src={extractYouTubeThumbnail(selectedProject.youtubeLink) || ""} 
                      alt={`${selectedProject.projectTitle} Thumbnail`}
                    />
                  </a>
                )}
              </div>

              <div className="project-info">
                <span className="semester-tag">Fall 2024</span>
                <img src={asuLogo} alt="ASU Logo" className="modal-asu-logo" />
                <h2 className="project-title">
                  {selectedProject.projectTitle}
                </h2>
                <p className="project-category">
                
                Computer Science</p>

                <p className="team-members">
                  
                  {selectedProject.teamMemberNames}
                </p>
              </div>
            </div>
            <div className="project-details">
              <div className="left-section">
                <h3>Team Mentors</h3>
                <p>TBA</p>
              <div className="right-section">
                <div className="poster-container">
                  <p>
                    <i className="fas fa-file-pdf poster-icon"></i> <strong>Poster</strong>
                  </p>
                  <a href={selectedProject.posterLink} target="_blank" rel="noopener noreferrer">
                    <button className="poster-button">View the poster</button>
                  </a>
                </div>
              </div>
                <h3>Abstract</h3>
                <p>{selectedProject.projectDescription}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Interdisciplinary;
