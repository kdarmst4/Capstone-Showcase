import { useEffect } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/About.css";
import { ourTeamDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import teamMember1 from "../assets/jiayuanProfile.png";
import teamMember2 from "../assets/anushHeadshot.jpg";
import teamMember3 from "../assets/naveenProfile.jpg";
import teamMember4 from "../assets/makenzieHeadshot.jpg";
import teamMember5 from "../assets/waleedHeadshot.jpg";
import teamMember6 from "../assets/anshProfile.jpg";
import teamMember7 from "../assets/alexanderProfile.jpg";
import teamMember8 from "../assets/karinaProfile.jpg";
import teamMember9 from "../assets/brianProfile.jpg";
import teamMember10 from "../assets/austinProfile.jpg";
import teamMember11 from "../assets/cameronProfile.jpg";
import teamMember12 from "../assets/kaliProfile.jpg"; 
import Footer from './Footer';
import { Github } from 'lucide-react';


const teamMembers = [
  {
    image: teamMember1,
    name: "Jiayuan Yu",
    major: "Computer Science (Cybersecurity)",
    email: "jiayuany@asu.edu",
    linkedin: "https://www.linkedin.com/in/jiayuan-yu-77b261262/",
    github: "https://github.com/jy202050",
  },
  {
    image: teamMember2,
    name: "Anush Garimella",
    major: "Computer Science",
    email: "anush.garimella@gmail.com",
    linkedin: "https://www.linkedin.com/in/anush-garimella/",
    github: "https://github.com/agarimel",
  },
  {
    image: teamMember3,
    name: "Naveen Ramesh",
    major: "Computer Science",
    email: "naveenramesh987@gmail.com",
    linkedin: "https://www.linkedin.com/in/naveenramesh987/",
    github: "https://github.com/naveenramesh987",
  },
  {
    image: teamMember4,
    name: "Makenzie Rutledge",
    major: "Informatics",
    email: "mmrutled@gmail.com",
    linkedin: "https://www.linkedin.com/in/makenzie-rutledge/",
    github: "https://github.com/mmrutled",
  },
  {
    image: teamMember5,
    name: "Waleed Briouig",
    major: "Computer Science (Software Engineering)",
    email: "wbriouig@asu.edu",
    linkedin: "https://www.linkedin.com/in/waleed-briouig-asu/",
    github: "https://github.com/wbriouig",
  },
  {
    image: teamMember6,
    name: "Ansh Tiwari",
    major: "Computer Science",
    email: "atiwar31@asu.edu",
    linkedin: "https://www.linkedin.com/in/ansht99/",
    github: "https://github.com/ansht9",
  },
  {
    image: teamMember7,
    name: "Alexander Trinh",
    major: "Computer Science",
    email: "atrinh8@asu.edu",
    linkedin: "https://www.linkedin.com/in/alex-trinh-98a577259/",
    github: "https://github.com/at-trinh",
  },
  {
    image: teamMember8,
    name: "Karina Winkelmann",
    major: "Computer Systems Engineering",
    email: "kwinkel2@asu.edu",
    linkedin: "https://www.linkedin.com/in/karina-winkelmann-122055235/",
    github: "https://github.com/Karina528",
  },
  {
    image: teamMember9,
    name: "Brian Amen",
    major: "Computer Science (Cybersecurity)",
    email: "bamen@asu.edu",
    linkedin: "https://www.linkedin.com/in/brian-amen-697bab1b5/",
    github: "https://github.com/brainamen",
  },
  {
    image: teamMember10,
    name: "Austin Mayhew",
    major: "Computer Science (Software Engineering)",
    email: "atmayhew@asu.edu",
    linkedin: "https://www.linkedin.com/in/austin-mayhew-a54a88352/",
    github: "https://github.com/Austin-Mayhew",
  },
  {
    image: teamMember11,
    name: "Cameron Mendez",
    major: "Computer Science (Cybersecurity)",
    email: "cameronbrianmendez@gmail",
    linkedin: "https://www.linkedin.com/in/cameron-mendez-92b749216",
    github: "https://github.com/cameronbmendez",
  },
  {
    image: teamMember12,
    name: "Kali Armstrong",
    major: "Computer Science",
    email: "kdarms5@gmail.com",
    linkedin: "https://www.linkedin.com/in/kali-armstrong/",
    github: "https://github.com/kdarmst4",
  },
];

const About = () => {
  const { isSideMenu } = useMenuContext();

  useEffect(() => {
    document.body.classList.add("about-page-body");
    return () => {
      document.body.classList.remove("about-page-body");
    };
  }, []);

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
          {
            
            teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <img src={member.image} alt={`${member.name} Profile`} className="team-member-image" />
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <p>{member.major}</p>
                  <p>{member.email}</p>
                   <div className="team-icons">
                        <a
                          href={`mailto:${member.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-envelope"></i>
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      </div>

                </div>
              </div>
            ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
