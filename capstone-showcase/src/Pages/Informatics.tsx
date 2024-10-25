import React, { useEffect } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/Informatics.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from './Footer';

const Informatics: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  useEffect(() => {
    document.body.classList.add("informatics-page-body");
    return () => {
      document.body.classList.remove("informatics-page-body");
    };
  }, []);

  return (
    <div className={`informatics ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background"></header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
            <div className="title-container">
              <h3>Informatics</h3>
            </div>
            <p>{capstoneDescription}</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Informatics;
