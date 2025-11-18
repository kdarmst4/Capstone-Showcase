import React, { useEffect, useState, useMemo } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/ComputerScience.css";
import "../CSS/ProjectCards.css";
import "../CSS/Pagination.css";
import "../CSS/ProjectShowcase.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import asuLogo from "../assets/asuLogo.png";
import Footer from "./Footer";
import Pagination from "../Components/Pagination";
import useFetchProjects from "../Hooks/useFetchProjects";
import useFilterProjects from "../Hooks/useFilterProjects";
import usePagination from "../Hooks/usePagination";
import useMajorTabHelpers from "../Hooks/useMajorTabHelpers";

const STATIC_BASE_URL =
  import.meta.env.PROD
    ? "" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000";

const ComputerScience: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const [searchParams] = useSearchParams();
  const selectedSemester = searchParams.get("semester");
  const selectedYear = searchParams.get("year");
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Projects based on selected semester and year
  const DEFAULT_SEMESTER = "fa";
  const DEFAULT_YEAR = "2025";
  const semester = selectedSemester || DEFAULT_SEMESTER;
  const year = selectedYear || DEFAULT_YEAR;
  const major = "computer-science";
  const { projects, loading, error } = useFetchProjects(major, semester, year);
  
  // Filtering Variables and functions
  const {
    searchQuery,
    setSearchQuery, 
    selectedSponsor, 
    setSelectedSponsor, 
    uniqueSponsors, 
    filterProjects
  } = useFilterProjects(projects);

  // Pagination Variables and functions - computed from filteredProjects
  const projectsPerPage = 8;
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentProjects,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
  } = usePagination(filterProjects, projectsPerPage);

  const paginationProps = {
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
    totalProjects: filterProjects.length,
  }
  
  // Major Tab Helpers
  const { 
    extractYouTubeThumbnail,
    getSemesterLabel,
    handleSurveyFormClick, 
    handleMoreProjectsClick 
  } = useMajorTabHelpers();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [projects, filterProjects]);

  useEffect(() => {
    document.body.classList.add(`${major}-page-body`);
    return () => {
      document.body.classList.remove(`${major}-page-body`);
    }
  }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  //TODO:: handle repeated jsx

  return (
    <div className={`computer-science ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3 className="main-page-title">Computer Science</h3>
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
            <p>No projects available for Computer Science.</p>
          ) : (
            <>
            {/* Search and Filter Section */}
            <section className="search-filter-section">
              <div className="search-bar-container">
                  <input
                      type="text"
                      className="search-bar"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>

              <div className="filter-container">
                  <select
                      className="sponsor-filter"
                      value={selectedSponsor}
                      onChange={(e) => setSelectedSponsor(e.target.value)}
                  >
                      {uniqueSponsors.map((sponsor, index) => (
                          <option key={index} value={sponsor}>
                              {sponsor === "all" ? "All Sponsors" : sponsor}
                          </option>
                      ))}
                  </select>
              </div>
            </section>

            {/* Projects Grid */}
            <section className="project-catalog">
              <div className="projects-grid">
                {currentProjects.map((project, index) => (
                  <Link
                    key={project.id || index}
                    to={`/survey/${project.id}`}
                    state={{ project }}
                    className="project-card-link"
                  >
                    <div className="project-card">
                      {project.youtubeLink && (
                        <img
                          src={extractYouTubeThumbnail(project.youtubeLink) || ""}
                          alt={`${project.projectTitle} Thumbnail`}
                          className="youtube-thumbnail"
                        />
                      )}

                      <div className="project-details">
                        <h4 className="project-title left-aligned">
                          {project.projectTitle}
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
                  </Link>
                ))}
              </div>
            </section>

            <Pagination {...paginationProps} />

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
                  <span className="project-showcase-category">Computer Science</span>
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
                          //src={`http://localhost:3000${selectedProject.posterPicturePath}`}
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

export default ComputerScience;
