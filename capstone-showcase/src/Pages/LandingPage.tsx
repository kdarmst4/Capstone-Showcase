import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/LandingPage.css";
import asuLogo from "../assets/asuLogo.png";
import showcase from "../assets/showcase.jpg";
import firstPlacePoster from "../assets/first_place/poster.jpg";
import firstPlaceTeam from "../assets/first_place/team.jpg";
import firstPlaceGroup from "../assets/first_place/group.jpg";
import secondPlacePoster from "../assets/second_place/poster.jpg";
import secondPlaceTeam from "../assets/second_place/team.jpg";
import secondPlaceGroup from "../assets/second_place/group.jpg";
import thirdPlacePoster from "../assets/third_place/poster.jpg";
import thirdPlaceTeam from "../assets/third_place/team.jpg";
import thirdPlaceGroup from "../assets/third_place/group.jpg";
import {
  capstoneDescription,
  landingPageIntro,
  navigationInstructions,
} from "../TextContent";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  
  const [, setSavedTime] = useState<string | null>(null);
  const [, setSavedDate] = useState<string | null>(null);
  const [, setSavedImage] = useState<string | null>(null);
  useEffect(() => {
    document.body.classList.add("landing-page-body");
    return () => {
      document.body.classList.remove("landing-page-body");
      const time = localStorage.getItem("savedTime");
      setSavedTime(time);
      const date = localStorage.getItem("savedDate");
      setSavedDate(date);
      const image = localStorage.getItem("savedImage");
      setSavedImage(image);
    };
  }, []);

  

  return (
    <>
      <title>ASU Capstone Showcase</title>
      <div
        className={`landing-page ${isSideMenu ? "compressed" : ""}`}
      >
        <header
          className="header-background"
          aria-label="ASU Showcase Event Header"
        >
          <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        </header>
        <main className="content-area" aria-label="Main Event Content">
          
          <div className="home-page-title-container">
            <img
              src={showcase}
              alt="Showcase Event"
              className="showcase-image"
            />
          </div>
          <section className="event-details" aria-label="Event Details Section">
            <article>
              {/* Pre Event
              <p>
                <strong>Showcase Date:</strong> Friday, May 2nd 2025
                <br />
                <strong>Location:</strong> Memorial Union - Second floor<br />301 E Orange St., Tempe, AZ 85281
                <br />
                <strong>Check In & Poster Pickup Time:</strong> 10:00am - 10:30am MST
                <br />
                <strong>Event Time:</strong> 10:30am - 1:30pm MST
                <br />
              </p>
              <section className="pdf-section" aria-label="Event Map and Resourses" style={{ marginTop: "40px", textAlign: "center" }}>
                <h2>Event Map & Resources</h2>
                <p>Explore the venue maps and download the showcase materials below.</p>

                <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
                  <embed
                  src="/pdfs/secondFloor_emsFeatures.pdf"
                  type="application/pdf"
                  width="80%"
                  height="600px"
                  />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <a
                  href="/pdfs/SP25 SCAI Capstone Locations and Diagrams.pdf"
                  download
                  style={{ color: "#8C1D40", fontSize: "18px", fontWeight: "bold", textDecoration: "underline" }}
                  >
                  Download Capstone Locations and Diagrams (PDF)
                  </a>
                </div>
              </section>
              */}

              <p style = {{textAlign: "center"}}>
                First Place Winner
                <img src={firstPlaceTeam} alt="First Place Team" className="team-image" />
                <img src={firstPlaceGroup} alt="First Place Group" className="group-image" />
                <img src={firstPlacePoster} alt="First Place Poster" className="poster-image" />
                {/*Add a link to redirect to the project here?*/}
              </p>
              <p style = {{textAlign: "center"}}>
                Second Place Winner
                <img src={secondPlaceTeam} alt="Second Place Team" className="team-image" />
                <img src={secondPlaceGroup} alt="Second Place Group" className="group-image" />
                <img src={secondPlacePoster} alt="Second Place Poster" className="poster-image" />
                {/*Add a link to redirect to the project here?*/}
              </p>
              <p style = {{textAlign: "center"}}>
                Third Place Winner
                <img src={thirdPlaceTeam} alt="Third Place Team" className="team-image" />
                <img src={thirdPlaceGroup} alt="Third Place Group" className="group-image" />
                <img src={thirdPlacePoster} alt="Third Place Poster" className="poster-image" />
                {/*Add a link to redirect to the project here?*/}
              </p>
                
              <p>{landingPageIntro}</p>
              <p>{capstoneDescription}</p>
              <p>{navigationInstructions}</p>
            </article>
          </section>
          
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
