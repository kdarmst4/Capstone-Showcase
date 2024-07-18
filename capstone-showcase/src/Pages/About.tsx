import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/About.css";
import { ourTeamDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png"

const About: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`about ${isSideMenu ? 'compressed' : ''}`}>
      <header className="header-background">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        <div className="title-container">
          <h3>Meet Our Team</h3>
        </div>
      </header>
      <main className="content-area">
        <section className="event-details">
          <article>
            <p>{ourTeamDescription}</p>
            {/* Add more content specific to Computer Science */}
          </article>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default About;