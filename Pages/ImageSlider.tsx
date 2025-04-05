import { useState, useEffect, useRef } from "react";
import { ArrowBigLeft, ArrowBigRight, CircleDot, Circle, X } from "lucide-react";
import "./ImageSlider.css";
import asuLogo from "../assets/asuLogo.png";
import { FaClipboard, FaUsers } from "react-icons/fa";

type ImageSliderProps = {
  imageUrls: string[];
};

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function showNextImage() {
    if (!isModalOpen) {
      setImageIndex((index) => (index === imageUrls.length - 1 ? 0 : index + 1));
    }
  }

  function showPrevImage() {
    if (!isModalOpen) {
      setImageIndex((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
    }
  }

  function openModal() {
    setIsModalOpen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    intervalRef.current = setInterval(showNextImage, 5000);
  }

  useEffect(() => {
    intervalRef.current = setInterval(showNextImage, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
          {imageUrls.map((url, index) => (
            <img
              key={url}
              src={url}
              className="img-slider-img"
              style={{
                translate: `${-100 * imageIndex}%`,
                transition: isModalOpen ? "none" : "transform 0.5s ease",
              }}
              onClick={openModal}
            />
          ))}
        </div>
        <button onClick={showPrevImage} className="img-slider-btn" style={{ left: 0 }}>
          <ArrowBigLeft />
        </button>
        <button onClick={showNextImage} className="img-slider-btn" style={{ right: 0 }}>
          <ArrowBigRight />
        </button>

        <div style={{ position: "absolute", bottom: ".5rem", left: "50%", translate: "-50%", display: "flex", gap: "0.25rem" }}>
          {imageUrls.map((_, index) => (
            <button key={index} className="img-slider-dot-btn" onClick={() => setImageIndex(index)}>
              {index === imageIndex ? <CircleDot /> : <Circle />}
            </button>
          ))}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>X</button>
            <div className="project-menu">
              <header className="modal-header-background" >
              </header>
            </div>           
            <div className="project-header">
            <div className="project-info">
                <span className="semester-tag">Fall 2024</span>
                <img src={asuLogo} alt="ASU Logo" className="modal-asu-logo" />
                <h2 className="project-title">
                </h2>
                <p className="project-category">
                <FaClipboard style={{ marginRight: '8px' }} />
                Capstone Showcase 1st Place Winner</p>
                <p className="team-members">
                <FaUsers style={{ marginRight: '8px' }} />
                 Team Members: TBA
                </p>
                </div>
            </div>
            <div className="project-details">
              <div className="left-section">
                <h3>Team Mentors</h3>
                <p>TBA</p>
              <div className="right-section">
                <div className="poster-container">
                  <p>
                    <i className="fas fa-file-pdf poster-icon"></i> <strong>Poster</strong>
                  </p>
                    <button className="poster-button">View the poster</button>
                </div>
              </div>
                <h3>Abstract</h3>
                <p>Description</p>
              </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
}