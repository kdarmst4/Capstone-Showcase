import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  const [isPastSemestersOpen, setIsPastSemestersOpen] = useState(false);
  const submenuRef = useRef<HTMLLIElement>(null);
  const [leaveTimeout, setLeaveTimeout] = useState<number | null>(null);

  const togglePastSemesters = () => {
    setIsPastSemestersOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      submenuRef.current &&
      !submenuRef.current.contains(event.target as Node)
    ) {
      setIsPastSemestersOpen(false);
    }
  };

  const handleMouseLeave = () => {
    const timeout = window.setTimeout(() => {
      setIsPastSemestersOpen(false);
    }, 200);
    setLeaveTimeout(timeout);
  };

  const handleMouseEnter = () => {
    if (leaveTimeout) {
      window.clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container">
      <div className="menu">
        <ul className="menu-list">
          <li>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                width="24px"
                height="24px"
                className="home-icon"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>
          </li>
          <li>
            <Link to="/computer-science">Computer Science</Link>
          </li>
          <li>
            <Link to="/computer-systems-engineering">
              Computer Systems Engineering
            </Link>
          </li>
          <li>
            <Link to="/industrial-engineering">Industrial Engineering</Link>
          </li>
          <li>
            <Link to="/interdisciplinary">Interdisciplinary</Link>
          </li>
          <li
            className="submenu-container"
            ref={submenuRef}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            <div className="submenu-title" onClick={togglePastSemesters}>
              Past Semesters{" "}
              <span className="arrow">{isPastSemestersOpen ? "▲" : "▼"}</span>
            </div>
            {isPastSemestersOpen && (
              <ul className="submenu-list">
                <li>
                  <Link to="/past-semesters/spring-2024">Spring 2024</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
