import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/About.css";
import { ourTeamDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import teamMember1 from "../assets/profilePlaceholder.png";
import teamMember2 from "../assets/naveenHeadshot.jpg";
import teamMember3 from "../assets/makenzieHeadshot.jpg";
import teamMember4 from "../assets/profilePlaceholder.png";
import teamMember5 from "../assets/profilePlaceholder.png";

const teamMembers = [
  {
    image: teamMember1,
    text: [<b>Anush Garimella</b>, "Major", "Email"],
  },
  {
    image: teamMember2,
    text: [
      <b>Naveen Ramesh</b>,
      "Computer Science",
      "naveenramesh987@gmail.com",
    ],
  },
  {
    image: teamMember3,
    text: [<b>Makenzie Rutledge</b>, "Informatics", "mmrutled@gmail.com"],
  },
  {
    image: teamMember4,
    text: [<b>Waleed Briouig</b>, "Major", "Email"],
  },
  {
    image: teamMember5,
    text: [<b>Ansh Tiwari</b>, "Major", "Email"],
  },
];

const About: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`about ${isSideMenu ? "compressed" : ""}`}>
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
          </article>
        </section>
        <h3 className="team-header">Capstone Showcase Team</h3>
        <div className="underline"></div>
        <section className="team-section">
          <div className="team-row">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={`Team Member ${index + 1}`} />
                {member.text.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>&copy; 2024 ASU Capstone Projects. All rights reserved.</footer>
    </div>
  );
};

export default About;
