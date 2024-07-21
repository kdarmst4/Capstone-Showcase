import React from "react";
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

  return (
    <div className={`pre-event-landing-page ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
      </header>
      <main className="content-area">
        <div className="title-container">
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
