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
  const [is2025Open, setIs2025Open] = useState(false);
  const [is2024Open, setIs2024Open] = useState(false);
  const submenuRef = useRef<HTMLLIElement>(null);
  const [leaveTimeout, setLeaveTimeout] = useState<number | null>(null);
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);

  const togglePastSemesters = () => {
    setIsPastSemestersOpen((prev) => !prev);
  };

  const toggle2025 = () => {
    setIs2025Open((prev) => !prev);
  };

  const toggle2024 = () => {
    setIs2024Open((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      submenuRef.current &&
      !submenuRef.current.contains(event.target as Node)
    ) {
      setIsPastSemestersOpen(false);
    }
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
            {isSideMenu && (
              <>
                <li
                  className={`menu-item ${
                    pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link to="/about">Meet Our Team</Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/computer-science" ? "active" : ""
                  }`}
                >
                  <Link to="/computer-science">Computer Science Teams</Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/computer-systems-engineering" ? "active" : ""
                  }`}
                >
                  <Link to="/computer-systems-engineering">
                    Computer Systems Engineering
                  </Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/interdisciplinary" ? "active" : ""
                  }`}
                >
                  <Link to="/interdisciplinary">Interdisciplinary Teams</Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/industrial-engineering" ? "active" : ""
                  }`}
                >
                  <Link to="/industrial-engineering">
                    Industrial Engineering Teams
                  </Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/biomedical-engineering" ? "active" : ""
                  }`}
                >
                  <Link to="/biomedical-engineering">
                    Biomedical Engineering Teams
                  </Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/mechanical-engineering" ? "active" : ""
                  }`}
                >
                  <Link to="/mechanical-engineering">
                    Mechanical Engineering Teams
                  </Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/electrical-engineering" ? "active" : ""
                  }`}
                >
                  <Link to="/electrical-engineering">
                    Electrical Engineering Teams
                  </Link>
                </li>
                <li
                  className={`menu-item ${
                    pathname === "/informatics" ? "active" : ""
                  }`}
                >
                  <Link to="/informatics">Informatics Teams</Link>
                </li>
                
              </>
            )}
            <li
              className="submenu-container"
              ref={submenuRef}
              onMouseEnter={handleMouseEnter}
            >
              <div className="submenu-title" onClick={togglePastSemesters}>
                Past Semesters{" "}
                <span className="arrow">{isPastSemestersOpen ? "▲" : "▼"}</span>
              </div>
              {isPastSemestersOpen && (
                <ul className="submenu-list">
                  <div className="submenu-title" onClick={toggle2025}>
                  2025{" "}
                  <span className="arrow">{is2025Open ? "▲" : "▼"}</span>
                  </div>
                  {is2025Open && (
                    <div>
                        <li className="menu-item">
                        <Link to="/"> 
                        Fall 2025</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/">
                        Summer 2025</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/"> 
                        Spring 2025</Link>
                      </li>
                    </div>
                  )}
                  <li></li>
                  <div> <li className="submenu-title" onClick={toggle2024}>
                  2024{" "}
                  <span className="arrow">{is2024Open ? "▲" : "▼"}</span>
                  </li>
                  </div>
                  {is2024Open && (
                    <div>
                    <li className="menu-item">
                    <Link to="/"> 
                    Fall 2024</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/">
                    Summer 2024</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/"> 
                    Spring 2024</Link>
                  </li>
                  <h1>
                  </h1>
                </div>
                  )}
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
