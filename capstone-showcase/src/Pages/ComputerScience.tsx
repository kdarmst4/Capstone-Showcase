import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/ComputerScience.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const ComputerScience: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const [projects, setProjects] = useState<any[]>([]); // State to store fetched projects
  const navigate = useNavigate();

  // Fetch projects based on major when component mounts
  useEffect(() => {
    document.body.classList.add("computer-science-page-body");
    
    // Fetch data for Computer Science major
    fetch("/api/survey/computer-science")
      .then((response) => response.json())
      .then((data) => setProjects(data)) // Update state with fetched projects
      .catch((error) => console.error("Error fetching projects:", error));

    return () => {
      document.body.classList.remove("computer-science-page-body");
    };
  }, []);

  const handleSurveyFormClick = () => {
    navigate("/survey");
  };

  return (
    <div className={`computer-science ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Computer Science</h3>
              <button
                className="survey-form-button"
                onClick={handleSurveyFormClick}
                aria-label="Survey Form Button"
              >
                Survey Form
              </button>
            </div>
            <p>{capstoneDescription}</p>
          </article>
        </section>

        {/* Render the list of projects */}
        <section className="projects-list">
          {projects.length === 0 ? (
            <p>No projects available for Computer Science.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <h4>{project.projectTitle}</h4>
                <p>{project.projectDescription}</p>
                <p>Team Members: {project.teamMemberNames}</p>
                <p>Sponsor: {project.sponsor}</p>
                {project.youtubeLink && <a href={project.youtubeLink}>Watch Demo</a>}
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComputerScience;
