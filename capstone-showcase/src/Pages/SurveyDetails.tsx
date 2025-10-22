import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Users, Building, Mail, User, Calendar } from "lucide-react";
import "../CSS/SurveryDetails.css";
import { useMenuContext } from "../MenuContext";
import Missing_photo from "../assets/Missing_photo.svg";
import Footer from "./Footer";

interface ProjectData {
  id: number;
  email: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  sponsor: string;
  teamMemberNames: string;
  numberOfTeamMembers: number;
  major: string;
  demo: number;
  power: number;
  nda: number;
  youtubeLink: string;
  teamPicturePath: string; 
  posterPicturePath: string;
}

export function SurveyDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { getSelectedSemester } = useMenuContext();

  const STATIC_BASE_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3000/api";

  // project may come from location.state
  const [project, setProject] = useState<ProjectData | null>(
    (state && (state as { project?: ProjectData }).project) || null
  );
  console.log("SurveyDetails project:", project);

  // team member names and final resolved photo URLs
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamMemberPhotos, setTeamMemberPhotos] = useState<string[]>([]); 

  const normalizePathToUrl = (path: string) => {
    if (!path) return "";
    const trimmed = path.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `${STATIC_BASE_URL}/${trimmed.replace(/^\/+/, "")}`;
  };

  // Fetch project if not provided via state
  useEffect(() => {
    if (project) return;

    let canceled = false;
    fetch(`${API_BASE_URL}/single_survey/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch project");
        return res.json();
      })
      .then((data: ProjectData) => {
        if (!canceled) setProject(data);
      })
      .catch((err) => {
        console.error("fetch project error:", err);
      });

    return () => {
      canceled = true;
    };
  }, [API_BASE_URL, id, project]);


  useEffect(() => {
    if (!project) return;

    // names
    const names = project.teamMemberNames
      ? project.teamMemberNames
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean)
      : [];
    setTeamMembers(names);

    // paths -> URLs
    const rawPaths = project.teamPicturePath
      ? project.teamPicturePath
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const checkImage = async (path: string) => {
      if (!path) return Missing_photo;
      const url = normalizePathToUrl(path);
      try {
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) return url;
        return Missing_photo;
      } catch (e) {
        return Missing_photo;
      }
    };

    (async () => {
      const validated: string[] = [];
      for (let i = 0; i < Math.max(names.length, rawPaths.length); i++) {
        const path = rawPaths[i] ?? "";
        const result = await checkImage(path);
        validated.push(result);
      }
      while (validated.length < names.length) validated.push(Missing_photo);

      setTeamMemberPhotos(validated);
    })();
  }, [project]);

  // Helpers (YouTube / semester / badges)
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("embed/")) return url;
    const idFromV = url.split("v=")[1]?.split("&")[0];
    const lastSegment = url.split("/").pop();
    const videoId = idFromV || lastSegment;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const formatSelectedSemester = () => {
    const selectedSemester = getSelectedSemester();
    let semester = selectedSemester ? selectedSemester.split("-")[0] : null;
    let year = selectedSemester ? selectedSemester.split("-")[1] : null;
    if (semester === "sp") return `Spring ${year}`;
    if (semester === "fa") return `Fall ${year}`;
    return "Semester Not Set";
  };

  if (!project) {
    return (
      <div className="survey-details-error">
        <p>Loading project...</p>
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="survey-details-container">
      <div className="survey-details-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back to Projects
        </button>
      </div>

      <div className="survey-title-div">
        <div className="project-badges">
          <span className={`requirement-badge`}>
            <Calendar size={16} />
            {formatSelectedSemester()}
          </span>
        </div>
        <p className="survey-project-title">{project.projectTitle}</p>
      </div>

      <div className="project-description-section">
        <h3>Project Description</h3>
        <p className="project-description-text">{project.projectDescription}</p>
      </div>

      <div className="video-and-members">
        {project.youtubeLink && (
          <div className="video-container">
            <iframe
              src={getYouTubeEmbedUrl(project.youtubeLink)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            />
          </div>
        )}

        {project.posterPicturePath ? (
          <div className="poster-container">
            <img
              src={`${STATIC_BASE_URL}${project.posterPicturePath}`}
              alt="Project Poster"
            />
          </div>
        ) : (
          <div
            className="team-members-section"
          >
            <h3>
              <Users size={20} />
              Team Members
            </h3>
            <div className="team-members-list">
              {teamMembers.map((name, i) => (
                <span key={i} className="member-tag">
                  <span className="survey-detail-img-container">
                    <img
                      src={teamMemberPhotos[i] ?? Missing_photo}
                      alt={name}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== Missing_photo)
                          target.src = Missing_photo;
                      }}
                    />
                  </span>
                  {/* <p>{name}</p> */}
                </span>
              ))}
            </div>

            <div style={{ width: "136px" }}>
              <h3>
                <Building size={20} />
                Sponsor
              </h3>
              <span className="sub-member-tag">{project.sponsor}</span>
            </div>

            <div>
              <h3>
                <User size={20} />
                Project Lead
              </h3>
              <span className="sub-member-tag">{project.name}</span>
            </div>

            <div>
              <h3>
                <Mail size={20} />
                Contact Email
              </h3>
              <span className="sub-member-tag">{project.email}</span>
            </div>
          </div>
        )}
      </div>
      {!project.projectDescription && (
        
      <div className="second-team-members-section">
        <span className="second-team-members-section-first-span">
          <h3>
            <Users size={20} />
            Team Members
          </h3>
          <div className="team-members-list">
            {teamMembers.map((name, i) => (
              <span key={i} className="member-tag">
                <span className="survey-detail-img-container">
                  <img
                    src={teamMemberPhotos[i] ?? Missing_photo}
                    alt={name}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src !== Missing_photo)
                        target.src = Missing_photo;
                    }}
                  />
                </span>
                <p>{name}</p>
              </span>
            ))}
          </div>
        </span>
        <span>
          <div >
            <h3>
              <Building size={20} />
              Sponsor
            </h3>
            <span className="sub-member-tag">{project.sponsor}</span>
          </div>

          <div>
            <h3>
              <User size={20} />
              Project Lead
            </h3>
            <span className="sub-member-tag">{project.name}</span>
          </div>

          <div>
            <h3>
              <Mail size={20} />
              Contact Email
            </h3>
            <span className="sub-member-tag">{project.email}</span>
          </div>
        </span>
      </div>      )}


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

export default SurveyDetails;
