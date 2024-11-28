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
  const [projects, setProjects] = useState<any[]>([]); // State to store fetched projects

  useEffect(() => {
    document.body.classList.add("biomedical-engineering-page-body");

    // Fetch projects for the Biomedical Engineering major
    fetch("http://localhost:3000/api/survey/biomedical-engineering")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProjects(data)) // Populate the state with fetched projects
      .catch((error) => console.error("Error fetching projects:", error));

    return () => {
      document.body.classList.remove("biomedical-engineering-page-body");
    };
  }, []);

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

        {/* Render the list of projects */}
        <section className="projects-list">
          {projects.length === 0 ? (
            <p>No projects available for Biomedical Engineering.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <h4 className="project-title">{project.projectTitle}</h4>
                <p className="project-description">{project.projectDescription}</p>
                <div className="project-details">
                  <p><strong>Team Members:</strong> {project.teamMemberNames}</p>
                </div>
                {project.youtubeLink && (
                  <a
                    className="project-demo-link"
                    href={project.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Demo
                  </a>
                )}
              </div>
            ))
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default BiomedicalEngineering;
