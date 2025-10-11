import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Award,
  Zap,
  Shield,
  Play,
  Mail,
  User,
  Building,
} from "lucide-react";
import "../CSS/SurveryDetails.css";
import { useParams } from 'react-router-dom';
import React from "react";
import { useState } from "react";

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
}

export  function SurveyDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(
    (state && (state as { project?: ProjectData }).project) || null
  );

  console.log("Project Data:", id);
  console.log("Project Data:", project?.teamMemberNames);
  const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000/api";

  if (!project) {
    fetch(`${API_BASE_URL}/single_survey/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Failed to fetch project data");
          }
        })
        .then((data) => {
          console.log("Fetched project data:", data);
            setProject(data);
        })
        .catch((error) => {
          console.error("Error fetching project data:", error);
        });

        if (!project) {
          return (
            <div className="survey-details-error">
              <p>Error: Project data not available.</p>
              <button onClick={() => navigate(-1)} className="back-button">
                <ArrowLeft size={20} />
                Back to Projects
              </button>
            </div>
          );
        }
    
  }

  const getBadgeText = (value: number, type: "demo" | "power" | "nda") => {
    if (type === "demo") return value === 1 ? "Demo Required" : "No Demo";
    if (type === "power") return value === 1 ? "Power Required" : "No Power";
    if (type === "nda") return value === 1 ? "NDA Required" : "No NDA";
    return "Unknown";
  };

  const getBadgeClass = (value: number) => {
    return value === 1 ? "badge-required" : "badge-not-required";
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("embed/")) {
      return url;
    }
    // Convert regular YouTube URL to embed URL if needed
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (

    <div className="survey-details-container">
      <div className="survey-details-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back to Projects
        </button>
      </div>
      {/* main content */}
      <div>
        {/* title  */}
        <div className="survey-title-div">
          <div className="project-badges">
            <span className="major-badge">{project.major}</span>
            <span
              className={`requirement-badge ${getBadgeClass(project.demo)}`}
            >
              <Award size={16} />
              {getBadgeText(project.demo, "demo")}
            </span>
            <span
              className={`requirement-badge ${getBadgeClass(project.power)}`}
            >
              <Zap size={16} />
              {getBadgeText(project.power, "power")}
            </span>
            <span className={`requirement-badge ${getBadgeClass(project.nda)}`}>
              <Shield size={16} />
              {getBadgeText(project.nda, "nda")}
            </span>
          </div>
          <p className="survey-project-title">{project.projectTitle}</p>
        </div>

        {/* project desc  */}
        <div className="project-description-section">
          <h3>Project Description</h3>
          <p className="project-description-text">
            {project.projectDescription}
          </p>
        </div>

        {/* video and team members */}
        <div className="video-and-members">
          {project.youtubeLink && (
            <div className="video-container">
              <iframe
                src={getYouTubeEmbedUrl(project.youtubeLink)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>
          )}
          <div className="team-members-section">
            <h3>
              <Users size={20} />
              Team Members
            </h3>
            <div className="team-members-list">
              {project.teamMemberNames &&
                project.teamMemberNames
                  .split(", ")
                  .map((name: string, index: number) => (
                    <span key={index} className="member-tag">
                      <User size={14} />
                      {name.trim()}
                    </span>
                  ))}
            </div>
            <div>
              <h3>
                <Building size={20} />
                Sponsor
              </h3>
              <span className="member-tag">
                <User size={14} />
                {project.sponsor}
              </span>
            </div>
            <div>
              <h3>
                <User size={20} />
                Project Lead
              </h3>
              <span className="member-tag">
                <User size={14} />
                {project.name}
              </span>
            </div>
            <div>
              <h3>
                <User size={20} />
                Contact Email
              </h3>
              <span className="member-tag">
                <User size={14} />
                {project.email}
              </span>
            </div>
          </div>
        </div>
        {/* black asu logo  */}
        <div className="project-details__asu-branding">
        <img 
          src="https://innovationshowcase.engineering.asu.edu/wp-content/themes/pitchfork/src/endorsed-logos/asu_fultonengineering_white.png" 
          alt="ASU Fulton Engineering" 
          className="project-details__asu-logo"
        />
      </div>
      <Footer />
      </div>
    </div>
  );
}
