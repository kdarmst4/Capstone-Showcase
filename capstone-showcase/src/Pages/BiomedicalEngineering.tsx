import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/BiomedicalEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const BiomedicalEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    document.body.classList.add("biomedical-engineering-page-body");

    fetch("http://localhost:3000/api/survey/biomedical-engineering")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    return () => {
      document.body.classList.remove("biomedical-engineering-page-body");
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

  return (
    <div className={`biomedical-engineering ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Biomedical Engineering</h3>
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
            <p>No projects available for Biomedical Engineering.</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${
                  index % 2 === 0 ? "zigzag-left" : "zigzag-right"
                }`}
              >
                {index % 2 === 0 && project.youtubeLink && (
                  <a
                    href={project.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Video Link"
                  >
                    <img
                      src={extractYouTubeThumbnail(project.youtubeLink) || ""}
                      alt={`${project.projectTitle} Thumbnail`}
                      className="youtube-thumbnail"
                    />
                  </a>
                )}
                <div className="project-details">
                  <h4 className="project-title">{project.projectTitle}</h4>
                  <p className="project-description">{project.projectDescription}</p>
                  <p><strong>Team Members:</strong> {project.teamMemberNames}</p>
                </div>
                {index % 2 !== 0 && project.youtubeLink && (
                  <a
                    href={project.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Video Link"
                  >
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
      <Footer />
    </div>
  );
};

export default BiomedicalEngineering;
