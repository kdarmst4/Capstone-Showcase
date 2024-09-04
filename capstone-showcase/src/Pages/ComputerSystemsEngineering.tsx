import React, { useEffect } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/ComputerSystemsEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";

const ComputerSystemsEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  useEffect(() => {
    document.body.classList.add("computer-systems-engineering-page-body");
    return () => {
      document.body.classList.remove("computer-systems-engineering-page-body");
    };
  }, []);

  return (
    <div
      className={`computer-systems-engineering ${
        isSideMenu ? "compressed" : ""
      }`}
    >
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Computer Systems Engineering</h3>
            </div>
            <p>{capstoneDescription}</p>
          </article>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default ComputerSystemsEngineering;
