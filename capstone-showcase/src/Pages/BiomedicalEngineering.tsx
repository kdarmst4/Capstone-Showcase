import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/BiomedicalEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png"

const BiomedicalEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`biomedical-engineering ${isSideMenu ? 'compressed' : ''}`}>
      <header className="header-background">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        <div className="title-container">
          <h3>Biomedical Engineering</h3>
        </div>
      </header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <p>{capstoneDescription}</p>
          </article>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default BiomedicalEngineering;
