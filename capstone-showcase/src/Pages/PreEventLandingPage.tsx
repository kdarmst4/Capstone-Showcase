import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../MenuContext";
import "../CSS/PreEventLandingPage.css";
import asuLogo from "../assets/asuLogo.png";
import showcase from "../assets/showcase.jpg";
import {
  capstoneDescription,
  landingPageIntro,
  navigationInstructions,
} from "../TextContent";

const PreEventLandingPage: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("pre-event-landing-page-body");
    return () => {
      document.body.classList.remove("pre-event-landing-page-body");
    };
  }, []);

  const handleAdminLoginClick = () => {
    navigate("/admin");
  };

  const handleSurveyFormClick = () => {
    navigate("/survey");
  };

  return (
    <>
      <title>ASU Capstone Showcase</title>
      <div
        className={`pre-event-landing-page ${isSideMenu ? "compressed" : ""}`}
      >
        <header
          className="header-background"
          aria-label="ASU Showcase Event Header"
        >
          <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        </header>
        <main className="content-area" aria-label="Main Event Content">
          <div className="button-container">
            <button
              className="admin-login-button"
              onClick={handleAdminLoginClick}
              aria-label="Admin Login Button"
            >
              Admin Login
            </button>
            <button
              className="survey-form-button"
              onClick={handleSurveyFormClick}
              aria-label="Survey Form Button"
            >
              Survey Form
            </button>
          </div>
          <div className="home-page-title-container">
            <img
              src={showcase}
              alt="Showcase Event"
              className="showcase-image"
            />
          </div>
          <section className="event-details" aria-label="Event Details Section">
            <article>
              <p>{landingPageIntro}</p>
              <p>{capstoneDescription}</p>
              <p>{navigationInstructions}</p>
            </article>
          </section>
        </main>
        <footer aria-label="Footer">
          &copy; {new Date().getFullYear()} ASU Capstone Projects. All rights
          reserved.
        </footer>
      </div>
    </>
  );
};

export default PreEventLandingPage;
