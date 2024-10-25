import React, { useEffect } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/IndustrialEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from './Footer';


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
            <p>The Capstone project courses for the Industrial Engineering and Engineering Management
                programs provide students an opportunity to apply their technical skill and knowledge of
                engineering principles to the development of a complex, team-oriented project on software,
                systems, or devices over a two-semester sequence. In their senior year, students work in teams of
                three to develop a product or process from concept to implementation. As they work on their
                Capstone project, students manage the project from beginning to end, and experience various
                development processes and challenges along the way. An excellent training ground for working in
                industry, the Capstone project mirrors the type of experiences graduates will face after graduating,
                when they begin their careers in engineering.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndustrialEngineering;
