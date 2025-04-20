import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useMenuContext } from "./MenuContext";
import arrowIcon from "./assets/newArrow.png";
import asuLogo from "./assets/asuLogo.png";
import "./Menu.css";

const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const { isSideMenu, toggleMenu } = useMenuContext();
  const [isMajorsOpen, setIsMajorsOpen] = useState(false);
  const submenuRef = useRef<HTMLLIElement>(null);
  const [currentSemester, setCurrentSemester] = useState<"sp" | "fa" | null>(null);
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  
  const toggleMajors = () => setIsMajorsOpen(prev => !prev);

  const getAvailableSemesters = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December
    const semesters: { semester: "sp" | "fa"; year: string }[] = [];
  
    // Always include Spring of the current year
    if (currentMonth < 8) {
      semesters.push({ semester: "sp", year: currentYear.toString() });
    }
  
    // Only include Fall if it's August or later
    if (currentMonth >= 7) {
      semesters.push({ semester: "fa", year: currentYear.toString() });
    }
  
    // Also include last year's semesters
    semesters.push({ semester: "sp", year: (currentYear - 1).toString() });
    semesters.push({ semester: "fa", year: (currentYear - 1).toString() });
  
    return semesters;
  };

  const getDefaultSemester = (): { semester: "sp" | "fa"; year: string } => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
  
    // Default to Fall of the current year if it's August or later.
    if (currentMonth >= 7) {
      return { semester: "fa", year: currentYear.toString() };
    }
  
    // Otherwise, default to Spring of the current year.
    return { semester: "sp", year: currentYear.toString() };
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
      
    }
  };

  const handleSemesterSelection = (semester: "sp" | "fa", year: string) => {
    setCurrentSemester(semester);
    setCurrentYear(year);
    navigate(`${pathname}?semester=${semester}&year=${year}`);
  };

  useEffect(() => {
    const semesterFromUrl = searchParams.get("semester") as "sp" | "fa" | null;
    const yearFromUrl = searchParams.get("year");
  
    if (semesterFromUrl && yearFromUrl) {
      setCurrentSemester(semesterFromUrl);
      setCurrentYear(yearFromUrl);
    } else {
      const defaultSem = getDefaultSemester();
      setCurrentSemester(defaultSem.semester);
      setCurrentYear(defaultSem.year);
      navigate(`${pathname}?semester=${defaultSem.semester}&year=${defaultSem.year}`, { replace: true });
    }
  }, [location.search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSemesterDropdown = () => (
    <li className="semester-selector">
      <label htmlFor="semesterDropdown">Select Semester:</label>
      <select
        id="semesterDropdown"
        value={currentSemester && currentYear ? `${currentSemester}-${currentYear}` : ""}
        onChange={(e) => {
          const [sem, yr] = e.target.value.split("-");
          handleSemesterSelection(sem as "sp" | "fa", yr);
        }}
      >
        <option value="">-- Select --</option>
        {getAvailableSemesters().map(({ semester, year }) => {
          const label = `${semester === "sp" ? "Spring" : "Fall"} ${year}`;
          const value = `${semester}-${year}`;
          return (
            <option key={value} value={value}>
              {label}
            </option>
        );
      })}
      </select>
      {currentSemester && currentYear && (
        <div className="selected-semester-label">
          Selected Semester: <strong>{currentSemester === "sp" ? "Spring" : "Fall"} {currentYear}</strong>
        </div>
      )}
    </li>
  );

  return (
    <div className={`page-container ${isSideMenu ? "side-menu" : "top-menu"}`}>
      <div className="menu-container">
        <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
        <button className="toggle-button" onClick={toggleMenu}>
          <i className={`fas ${isSideMenu ? "fa-arrow-left" : "fa-bars"}`}></i>
        </button>
        <div className="menu">
          <ul className="menu-list">
            <li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
              <Link to="/" className="home-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="22px" height="27px" className="home-icon">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </Link>
              {currentSemester && currentYear && (
                <div className="selected-semester-label">
                  Showing projects from: <strong>{currentSemester === "sp" ? "Spring" : "Fall"} {currentYear}</strong>
                </div>
              )}
            </li>

            {/* Shared Links */}
            {(isSideMenu ? (
              <>
                <li className={`menu-item ${pathname === "/about" ? "active" : ""}`}>
                  <Link to="/about">Meet Our Team</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-science" ? "active" : ""}`}>
                  <Link to="/computer-science">Computer Science Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-systems-engineering" ? "active" : ""}`}>
                  <Link to="/computer-systems-engineering">Computer Systems Engineering Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/interdisciplinary" ? "active" : ""}`}>
                  <Link to="/interdisciplinary">Interdisciplinary Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/biomedical-engineering" ? "active" : ""}`}>
                  <Link to="/biomedical-engineering">Biomedical Engineering Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/mechanical-engineering" ? "active" : ""}`}>
                  <Link to="/mechanical-engineering">Mechanical Engineering Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/electrical-engineering" ? "active" : ""}`}>
                  <Link to="/electrical-engineering">Electrical Engineering Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/industrial-engineering" ? "active" : ""}`}>
                  <Link to="/industrial-engineering">Industrial Engineering Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/informatics" ? "active" : ""}`}>
                  <Link to="/informatics">Informatics Teams</Link>
                </li>
              </>
            ) : (
              <>
                <li className={`menu-item ${pathname === "/about" ? "active" : ""}`}>
                  <Link to="/about">Meet Our<br />Team</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-science" ? "active" : ""}`}>
                  <Link to="/computer-science">Computer Science<br />Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-systems-engineering" ? "active" : ""}`}>
                  <Link to="/computer-systems-engineering">Computer Systems<br />Engineering Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/industrial-engineering" ? "active" : ""}`}>
                  <Link to="/industrial-engineering">Industrial Engineering<br />Teams</Link>
                </li>
                <li className={`menu-item ${pathname === "/interdisciplinary" ? "active" : ""}`}>
                  <Link to="/interdisciplinary">Interdisciplinary<br />Teams</Link>
                </li>
                {isMajorsOpen && (
                  <>
                    <li className={`menu-item ${pathname === "/biomedical-engineering" ? "active" : ""}`}>
                      <Link to="/biomedical-engineering">Biomedical Engineering<br />Teams</Link>
                    </li>
                    <li className={`menu-item ${pathname === "/mechanical-engineering" ? "active" : ""}`}>
                      <Link to="/mechanical-engineering">Mechanical Engineering<br />Teams</Link>
                    </li>
                    <li className={`menu-item ${pathname === "/electrical-engineering" ? "active" : ""}`}>
                      <Link to="/electrical-engineering">Electrical Engineering<br />Teams</Link>
                    </li>
                    <li className={`menu-item ${pathname === "/informatics" ? "active" : ""}`}>
                      <Link to="/informatics">Informatics<br />Teams</Link>
                    </li>
                  </>
                )}
                <div className="majors-title" onClick={toggleMajors}>
                  {isMajorsOpen ? "Less" : "More"}<br />
                  <img src={arrowIcon} alt="Arrow Icon" className={`arrow ${isMajorsOpen ? "revArrow" : ""}`} />
                </div>
              </>
            ))}

            {/* Semester Selector */}
            {renderSemesterDropdown()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;