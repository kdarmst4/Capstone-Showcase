import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/About.css";
import { ourTeamDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import teamMember1 from "../assets/jiayuanProfile.jpg";
import teamMember2 from "../assets/anushHeadshot.jpg";
import teamMember3 from "../assets/naveenProfile.jpg";
import teamMember4 from "../assets/makenzieHeadshot.jpg";
import teamMember5 from "../assets/waleedHeadshot.jpg";
import teamMember6 from "../assets/anshProfile.jpg";
import teamMember7 from "../assets/alexanderProfile.jpg";
import teamMember8 from "../assets/profilePlaceholder.png";
import teamMember9 from "../assets/profilePlaceholder.png";

const teamMembers = [
  {
    image: teamMember1,
    text: [
      <b>Jiayuan Yu</b>,
      <span className="nowrap">Computer Science (Cybersecurity)</span>,
      "jiayuany@asu.edu",
    ],
  },
  {
    image: teamMember2,
    text: [
      <b>Anush Garimella</b>,
      "Computer Science",
      "anush.garimella@gmail.com",
    ],
  },
  {
    image: teamMember3,
    text: [
      <b>Naveen Ramesh</b>,
      "Computer Science",
      "naveenramesh987@gmail.com",
    ],
  },
  {
    image: teamMember4,
    text: [<b>Makenzie Rutledge</b>, "Informatics", "mmrutled@gmail.com"],
  },
  {
    image: teamMember5,
    text: [
      <b>Waleed Briouig</b>,
      <span className="nowrap">Computer Science (Software Engineering)</span>,
      "wbriouig@asu.edu",
    ],
  },
  {
    image: teamMember6,
    text: [<b>Ansh Tiwari</b>, "Computer Science", "atiwar31@asu.edu"],
  },
  {
    image: teamMember7,
    text: [<b>Alexander Trinh</b>, "Computer Science", "atrinh8@asu.edu"],
  },
  {
    image: teamMember8,
    text: [<b>Karina Winkelmann</b>, "Major", "Email"],
  },
  {
    image: teamMember9,
    text: [<b>Brian Amen</b>, "Major", "Email"],
  },
];

const About = () => {
  const { isSideMenu } = useMenuContext();
  const membersPerRow = Math.ceil(teamMembers.length / 3);

  return (
    <div className={`about ${isSideMenu ? "compressed" : ""}`}>
      <header className="header-background">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
      </header>
      <main className="about-content-area">
        <section className="event-details">
          <article>
            <p>{ourTeamDescription}</p>
          </article>
        </section>
        <div className="underline"></div>
        <section className="team-section">
          <div className="team-row">
            {teamMembers.slice(0, membersPerRow).map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={`Team Member ${index + 1}`} />
                {member.text.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="team-row">
            {teamMembers
              .slice(membersPerRow, membersPerRow * 2)
              .map((member, index) => (
                <div key={index} className="team-member">
                  <img
                    src={member.image}
                    alt={`Team Member ${index + membersPerRow + 1}`}
                  />
                  {member.text.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              ))}
          </div>
          <div className="team-row">
            {teamMembers.slice(membersPerRow * 2).map((member, index) => (
              <div key={index} className="team-member">
                <img
                  src={member.image}
                  alt={`Team Member ${index + membersPerRow * 2 + 1}`}
                />
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
