import React from "react";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../MenuContext";
import "../CSS/PreEventLandingPage.css";
import asuLogo from "../assets/asuLogo.png";
import {
  capstoneDescription,
  landingPageIntro,
  navigationInstructions,
  projectTitle,
} from "../TextContent";

const PreEventLandingPage: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    navigate("/admin");
  };

  const handleSurveyFormClick = () => {
    navigate("/survey");
  };

  return (
    <div className={`pre-event-landing-page ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
      </header>
      <main className="content-area">
        <div className="button-container">
          <button
            className="admin-login-button"
            onClick={handleAdminLoginClick}
          >
            Admin Login
          </button>
          <button
            className="survey-form-button"
            onClick={handleSurveyFormClick}
          >
            Survey Form
          </button>
        </div>
        <div className="home-page-title-container">
          <h3>{projectTitle}</h3>
        </div>
        <section className="event-details">
          <article>
            <p>{landingPageIntro}</p>
            <p>{capstoneDescription}</p>
            <p>{navigationInstructions}</p>
          </article>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default PreEventLandingPage;
