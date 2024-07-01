// src/PreEventLandingPage.tsx
import React from 'react';
import "./PreEventLandingPage.css";
import asuLogo from "./assets/asuLogo.png";
import { 
  capstoneDescription, 
  iraEngineeringText, 
  landingPageIntro, 
  navigationInstructions, 
  projectTitle, 
  schoolHeader 
} from "./TextContent";

const PreEventLandingPage = () => {
  return (
    <div className="pre-event-landing-page">
      <header>
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        <h1>{schoolHeader}</h1>
        <h2>{iraEngineeringText}</h2>
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
      <footer>
        &copy; 2024 ASU Capstone Projects. All rights reserved.
      </footer>
    </div>
  );
};

export default PreEventLandingPage;
