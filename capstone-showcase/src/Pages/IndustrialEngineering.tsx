import React, { useEffect } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/IndustrialEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";

const IndustrialEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  useEffect(() => {
    document.body.classList.add("industrial-engineering-page-body");
    return () => {
      document.body.classList.remove("industrial-engineering-page-body");
    };
  }, []);

  return (
    <div className={`industrial-engineering ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Industrial Engineering</h3>
            </div>
            <p>{capstoneDescription}</p>
          </article>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default IndustrialEngineering;
