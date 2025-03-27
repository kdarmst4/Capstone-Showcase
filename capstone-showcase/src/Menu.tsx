import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMenuContext } from "./MenuContext";
import { AuthContext } from "./Pages/AuthContext";
import asuLogo from "./assets/asuLogo.png";
import "./Menu.css";

const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const { isSideMenu, toggleMenu } = useMenuContext();
  const [isPastSemestersOpen, setIsPastSemestersOpen] = useState(false);
  const submenuRef = useRef<HTMLLIElement>(null);
  const [leaveTimeout, setLeaveTimeout] = useState<number | null>(null);
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);

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
    }, 100);
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
    <div className={`page-container ${isSideMenu ? "side-menu" : "top-menu"}`}>
      <div className="menu-container">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        <button className="toggle-button" onClick={toggleMenu}>
          <i
            className={`fas ${isSideMenu ? "fa-arrow-left" : "fa-bars"}`}
          ></i>
        </button>
        <div className="menu">
          <ul className="menu-list">
            <li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
              <Link to="/" className="home-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  width="22px"
                  height="27px"
                  className="home-icon"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </Link>
            </li>
            {!isSideMenu && (
              <>
                <li
                  className={`menu-item ${
                    pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link to="/about">
                    Meet Our
                    <br />
                    Team
                  </Link>
                </li>

                <div className="majors-container">
                  <div className="majors-list">
                        <li className="menu-item">
                          <Link to="/computer-science"> 
                          Computer Science  
                          <br />
                          Teams</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/computer-systems-engineering"> 
                          Computer Systems  
                          <br />
                          Engineering</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/interdisciplinary">
                          Interdisciplinary 
                          <br />
                          Teams</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/industrial-engineering"> 
                          Industrial Engineering  
                          <br />
                          Teams</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/biomedical-engineering">
                          Biomedical Engineering
                          <br />
                          Teams</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/mechanical-engineering"> 
                          Mechanical Engineering
                         <br />
                          Teams</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/electrical-engineering">
                          Electrical Engineering
                          <br />
                          Teams</Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/informatics"> 
                          Informatics
                          <br />
                          Teams</Link>
                        </li>
                  </div>
                </div>
              </>
            )}
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
            {isAuthenticated && userRole === "Student" && (
              <div className="user-status">
                <strong>Student</strong>
                <button className="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            )}
            {isAuthenticated && userRole === "Sponsor" && (
              <div className="user-status">
                <strong>Sponsor</strong>
                <button className="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            )}
            {isAuthenticated && userRole === "Admin" && (
              <div className="user-status">
                <strong>Admin</strong>
                <button className="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
