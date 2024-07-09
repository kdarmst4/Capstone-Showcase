import React from "react";
import "../CSS/PreEventLandingPage.css";
import asuLogo from "../assets/asuLogo.png";
import {
  capstoneDescription,
  landingPageIntro,
  navigationInstructions,
  projectTitle,
} from "../TextContent";

const PreEventLandingPage: React.FC = () => {
  return (
    <div className="pre-event-landing-page">
      <header>
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
      </header>
      <main>
        <h3>{projectTitle}</h3>
        <section className="event-details">
          <p className="reminder">
            INSERT: Location, date, time, map
            <br />
            MODIFY: the paragraphs below, copied from the Fall 2023 capstone
            website.
          </p>
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
