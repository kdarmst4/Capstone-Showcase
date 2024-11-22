import React, { useEffect, useState } from "react";
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
import Footer from "./Footer";

const PreEventLandingPage: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const navigate = useNavigate();
  const [savedTime, setSavedTime] = useState<string | null>(null);
  const [savedDate, setSavedDate] = useState<string | null>(null);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  useEffect(() => {
    document.body.classList.add("pre-event-landing-page-body");
    return () => {
      document.body.classList.remove("pre-event-landing-page-body");
      const time = localStorage.getItem("savedTime");
      setSavedTime(time);
      const date = localStorage.getItem("savedDate");
      setSavedDate(date);
      const image = localStorage.getItem("savedImage");
      setSavedImage(image);
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
              <p>
                <strong>Showcase Date:</strong> Friday, December 6th
                <br />
                <strong>Location:</strong> Memorial Union - Second floor
                <br />
                <strong>Event Time:</strong> 12:30pm - 3:00pm
                <br />
              </p>
              <p>{landingPageIntro}</p>
              <p>{capstoneDescription}</p>
              <p>{navigationInstructions}</p>
            </article>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PreEventLandingPage;
