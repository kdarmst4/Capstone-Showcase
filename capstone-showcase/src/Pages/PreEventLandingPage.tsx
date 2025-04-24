import React, { useEffect, useState } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/PreEventLandingPage.css";
import asuLogo from "../assets/asuLogo.png";
import showcase from "../assets/showcase.jpg";
import {
  capstoneDescription,
  landingPageIntro,
  navigationInstructions,
} from "../TextContent";
import Footer from "./Footer";

const PreEventLandingPage: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  
  const [, setSavedTime] = useState<string | null>(null);
  const [, setSavedDate] = useState<string | null>(null);
  const [, setSavedImage] = useState<string | null>(null);
  useEffect(() => {
    document.body.classList.add("pre-event-landing-page-body");
    return () => {
      document.body.classList.remove("pre-event-landing-page-body");
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
        className={`pre-event-landing-page ${isSideMenu ? "compressed" : ""}`}
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

export default PreEventLandingPage;
