import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/Informatics.css";
import "../CSS/Pagination.css";
import "../CSS/ProjectCards.css";
import "../CSS/ProjectModal.css";
// import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from "./Footer";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000/api";

const STATIC_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000";

const Informatics: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const [searchParams] = useSearchParams();
  const selectedSemester = searchParams.get("semester");
  const selectedYear = searchParams.get("year");
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]); // State to store fetched projects
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const DEFAULT_SEMESTER = "fa";
  const DEFAULT_YEAR = "2025";

  const semester = selectedSemester || DEFAULT_SEMESTER;
  const year = selectedYear || DEFAULT_YEAR;

  useEffect(() => {
    console.log("Selected semseter:", semester, year);
    document.body.classList.add("informatics-page-body");

    //fetch(`http://localhost:3000/api/survey/informatics/term=${selectedSemester}-${selectedYear}`)// Fetch projects for the Computer Science major
    fetch(`${API_BASE_URL}/api/survey/informatics/term=${semester}-${year}`) // Fetch projects for the Computer Science major
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    return () => {
      document.body.classList.remove("informatics-page-body");
    };
  }, [semester, year]);

  // Set Starting Page to the first page
  useEffect(() => {
    setCurrentPage(1);
  }, [projects]);

  // Pagination function calls
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const extractYouTubeThumbnail = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
  };

  const handleSurveyFormClick = () => {
    navigate("/survey");
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
    <div className={`informatics ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Informatics</h3>
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
            <p>No projects available for Informatics.</p>
          ) : (
            <>
              {/* Projects Grid */}
              <section className="project-catalog">
              <div className="projects-grid">
                {currentProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="project-card"
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.youtubeLink && (
                      <img
                        src={extractYouTubeThumbnail(project.youtubeLink) || ""}
                        alt={`${project.projectTitle} Thumbnail`}
                        className="youtube-thumbnail"
                      />
                    )}
                    <div className="project-details">
                      <h4 className="project-title">{project.projectTitle}</h4>
                      <p className="project-description">
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
              {totalPages > 1 && (
                <div className="pagination-container">
                  <button
                    className="pagination-button"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      className={`page-number ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => typeof page === "number" && goToPage(page)}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="pagination-button"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <div className="page-info">
                    Page {currentPage} of {totalPages} ({projects.length} total
                    projects)
                  </div>
                </div>
              )}

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
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-close-modal" onClick={closeModal}>
              X
            </button>
            <div className="project-header">
              <div className="project-video">
                {selectedProject.youtubeLink && (
                  <a
                    href={selectedProject.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Project Video"
                  >
                    <p className="project-video-label">Click Video to View</p>
                    <img
                      src={
                        extractYouTubeThumbnail(selectedProject.youtubeLink) ||
                        ""
                      }
                      alt={`${selectedProject.projectTitle} Thumbnail`}
                    />
                  </a>
                )}
              </div>

              <div className="project-info">
                <img src={asuLogo} alt="ASU Logo" className="modal-asu-logo" />
                <h2 className="project-title">
                  {selectedProject.projectTitle}
                </h2>
                <div className="project-category-tagline">
                  <span className="project-category">Informatics</span>
                  <span className="semester-tag">{getSemesterLabel()}</span>
                </div>
                <p className="team-members">
                  {selectedProject.teamMemberNames}
                </p>
              </div>
            </div>
            <div className="project-details">
              <div className="left-section">
                <h3>Poster</h3>

                <div className="right-section">
                  <div>
                    <p></p>
                    {selectedProject.posterPicturePath ? (
                      <div className="poster-container">
                        <img
                          // src={`https://localhost:3000${selectedProject.posterPicturePath}`}
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
                        <h3 style={{ marginBottom: "1rem" }}>Team Photos</h3>

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

export default Informatics;
