import React, { useEffect } from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/ComputerSystemsEngineering.css";
import { capstoneDescription } from "../TextContent";
import asuLogo from "../assets/asuLogo.png";
import Footer from './Footer';
import { useNavigate } from "react-router-dom";


const ComputerSystemsEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add("computer-systems-engineering-page-body");
    return () => {
      document.body.classList.remove("computer-systems-engineering-page-body");
    };
  }, []);

  const handleSurveyFormClick = () => {
    navigate("/survey")
  };

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
              <button
              className="survey-form-button"
              onClick={handleSurveyFormClick}
              aria-label="Survey Form Button"
            >
              Survey Form
            </button>
            </div>
            <p>{capstoneDescription}</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComputerSystemsEngineering;
