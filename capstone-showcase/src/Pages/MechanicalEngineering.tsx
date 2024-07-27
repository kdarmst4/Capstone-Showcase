import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/MechanicalEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png"

const MechanicalEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`mechanical-engineering ${isSideMenu ? 'compressed' : ''}`}>
      <header className="header-background">
      </header>
      <main className="content-area">
        <section className="event-details">
          <article>
          <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
            <h3>Mechanical Engineering</h3>
            </div>
            <p>{capstoneDescription}</p>
          </article>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default MechanicalEngineering;
