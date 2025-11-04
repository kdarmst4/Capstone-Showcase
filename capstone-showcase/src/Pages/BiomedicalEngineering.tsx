import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/BiomedicalEngineering.css";
import "../CSS/ProjectCards.css";
import "../CSS/ProjectShowcase.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";import asuLogo from "../assets/asuLogo.png";
import Footer from "./Footer";
import useFetchProjects from "../Hooks/useFetchProjects";
import usePagination from "../Hooks/usePagination";
import Pagination, { PaginationProps } from "../Components/Pagination";
import SurveyFormButton from "../Components/SurveyFormButton";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000/api";

const STATIC_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000";

const BiomedicalEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const [searchParams] = useSearchParams();
  const selectedSemester = searchParams.get("semester");
  const selectedYear = searchParams.get("year");
  const navigate = useNavigate();

  // project fetching variables
  const DEFAULT_SEMESTER = "fa";
  const DEFAULT_YEAR = "2025";
  const major = "biomedical-engineering";
  const semester = selectedSemester || DEFAULT_SEMESTER;
  const year = selectedYear || DEFAULT_YEAR;
  const { projects, loading, error } = useFetchProjects(major, semester, year);

  // Modal variables 
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination Variables
  const {
    currentPage,
    totalPages,
    currentProjects,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
  } = usePagination(projects, 8);

  const paginationProps: PaginationProps = {
    currentPage,
    totalPages,
    totalProjects: projects.length,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
  }

  const extractYouTubeThumbnail = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
  };

  const handleMoreProjectsClick = () => {
    navigate("/interdisciplinary");
  };

  const getSemesterLabel = () => {
    if (selectedSemester === "fa") return `Fall ${selectedYear}`;

    if (selectedSemester === "sp") return `Spring ${selectedYear}`;

    return "";
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
    <div className={`biomedical-engineering ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3 className="main-page-title">Biomedical Engineering</h3>
              <SurveyFormButton />
            </div>
          </article>
        </section>

        {/* Render the list of projects */}
        <section className="projects-list">
          {projects.length === 0 ? (
            <p>No projects available for Biomedical Engineering.</p>
          ) : (
            <>
              {/* Projects Grid */}
               <section className="project-catalog">
                <div className="projects-grid">
                  {currentProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      className="project-card"
                      // onClick={() => handleProjectClick(project)}
                    >
                      {project.youtubeLink && (
                        <img
                          src={extractYouTubeThumbnail(project.youtubeLink) || ""}
                          alt={`${project.projectTitle} Thumbnail`}
                          className="youtube-thumbnail"
                        />
                      )}
                      <div className="project-details">
                        <h4 className="project-title left-aligned">
                          <Link
                            to={`/survey/${project.id}`}
                            state={{ project }}
                            className="project-title-link"
                          >
                            {project.projectTitle}
                          </Link>
                        </h4>
                        <p className="project-description left-aligned">
                          {project.projectDescription}
                        </p>
                        <div className="project-meta">
                          <p>
                            <strong>Team:</strong> {project.teamMemberNames}
                          </p>
                          <p>
                            <strong>Sponsor:</strong> {project.sponsor}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>


              {/*Pagination*/}
              <Pagination {...paginationProps}/>

              <button
                className="more-projects-button"
                onClick={handleMoreProjectsClick}
                aria-label="More Projects Button"
              >
                Like what you see or don't see your project? Click here to see
                interdisciplinary projects!
              </button>
            </>
          )}
        </section>
      </main>

      {isModalOpen && selectedProject && (
        <div className="project-showcase-overlay" onClick={closeModal}>
          <div className="project-showcase-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-showcase-close" onClick={closeModal}>
              X
            </button>
            <div className="project-showcase-header">
              <figure className="project-showcase-video">
                {selectedProject.youtubeLink && (
                  <a
                    href={selectedProject.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Project Video"
                  >
                    <img
                      src={
                        extractYouTubeThumbnail(selectedProject.youtubeLink) ||
                        ""
                      }
                      alt={`${selectedProject.projectTitle} Thumbnail`}
                    />
                    <figcaption className="project-showcase-video-label">Click Video to View</figcaption>
                  </a>
                )}
              </figure>

              <div className="project-showcase-info">
                <img src={asuLogo} alt="ASU Logo" className="project-showcase-logo" />
                <h2 className="project-showcase-title">{selectedProject.projectTitle}</h2>

                <div className="project-showcase-meta">
                  <span className="project-showcase-category">Biomedical Engineering</span>
                  <span className="project-showcase-semester">{getSemesterLabel()}</span>
                </div>
                
                <p className="project-showcase-team">{selectedProject.teamMemberNames}</p>
              </div>
            </div>
            <div className="project-showcase-details">
              <div className="left-section">
                <h3>Poster</h3>

                <div className="right-section">
                  <div>
                    <p></p>
                    {selectedProject.posterPicturePath ? (
                      <div className="poster-container">
                        <img
                          src={`${STATIC_BASE_URL}${selectedProject.posterPicturePath}`}
                          alt="Project Poster"
                          style={{ maxWidth: "100%", maxHeight: 600 }}
                        />
                      </div>
                    ) : (
                      <p>No poster uploaded.</p>
                    )}

                    {selectedProject.teamPicturePath ? (
                      <div className="team-container">
                        {(selectedProject.teamPicturePath || "")
                          .split(",")
                          .map((path: string, index: number) => {
                            const trimmedPath = path.trim();
                            return (
                              <img
                                key={index}
                                //src={`http://localhost:3000${trimmedPath}`}
                                src={`${STATIC_BASE_URL}${trimmedPath}`}
                                alt={`Team Photo ${index + 1}`}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: 400,
                                  marginBottom: "1rem",
                                }}
                              />
                            );
                          })}
                      </div>
                    ) : (
                      <p>No team image uploaded.</p>
                    )}
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

export default BiomedicalEngineering;
