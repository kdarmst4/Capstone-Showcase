import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useMenuContext } from "./MenuContext";
import asuLogo from "./assets/asuLogo.png";
import "./Menu.css";

const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const { isSideMenu, toggleMenu } = useMenuContext();
  //const submenuRef = useRef<HTMLLIElement>(null);
  const [currentSemester, setCurrentSemester] = useState<"sp" | "fa" | null>(null);
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getAvailableSemesters = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const semesters: { semester: "sp" | "fa"; year: string }[] = [];

    semesters.push({ semester: "sp", year: currentYear.toString() });
    semesters.push({ semester: "fa", year: currentYear.toString() });

    semesters.push({ semester: "sp", year: (currentYear - 1).toString() });
    semesters.push({ semester: "fa", year: (currentYear - 1).toString() });

    return semesters;
  };

  const getDefaultSemester = (): { semester: "sp" | "fa"; year: string } => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    return currentMonth >= 7
      ? { semester: "fa", year: currentYear.toString() }
      : { semester: "sp", year: currentYear.toString() };
  };

  const handleSemesterSelection = (semester: "sp" | "fa", year: string) => {
    setCurrentSemester(semester);
    setCurrentYear(year);
    localStorage.setItem("selectedSemesterYear", `${semester}-${year}`);
    navigate(`${pathname}?semester=${semester}&year=${year}`);
  };

  useEffect(() => {
    const semesterFromUrl = searchParams.get("semester") as "sp" | "fa" | null;
    const yearFromUrl = searchParams.get("year");

    if (semesterFromUrl && yearFromUrl) {
      setCurrentSemester(semesterFromUrl);
      setCurrentYear(yearFromUrl);
      localStorage.setItem("selectedSemesterYear", `${semesterFromUrl}-${yearFromUrl}`);
    } else {
      const stored = localStorage.getItem("selectedSemesterYear");
      if (stored) {
        const [sem, yr] = stored.split("-");
        setCurrentSemester(sem as "sp" | "fa");
        setCurrentYear(yr);
        navigate(`${pathname}?semester=${sem}&year=${yr}`, { replace: true });
      } else {
        const { semester, year } = getDefaultSemester();
        setCurrentSemester(semester);
        setCurrentYear(year);
        localStorage.setItem("selectedSemesterYear", `${semester}-${year}`);
        navigate(`${pathname}?semester=${semester}&year=${year}`, { replace: true });
      }
    }
  }, [location.search]);

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
          return (
            <option key={`${semester}-${year}`} value={`${semester}-${year}`}>
              {label}
            </option>
          );
        })}
      </select>

      {currentSemester && currentYear && (
        <div className="selected-semester-label">
          Showing projects from: <strong>{currentSemester === "sp" ? "Spring" : "Fall"} {currentYear}</strong>
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
            </li>

             {/* Shared Links */}
             {(isSideMenu ? (
              <>
                <li className={`menu-item ${pathname === "/about" ? "active" : ""}`}>
                  <Link to="/about">Meet Our Team</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-science" ? "active" : ""}`}>
                  <Link to="/computer-science">Computer Science</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-systems-engineering" ? "active" : ""}`}>
                  <Link to="/computer-systems-engineering">Computer Systems Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/interdisciplinary" ? "active" : ""}`}>
                  <Link to="/interdisciplinary">Interdisciplinary</Link>
                </li>
                <li className={`menu-item ${pathname === "/biomedical-engineering" ? "active" : ""}`}>
                  <Link to="/biomedical-engineering">Biomedical Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/mechanical-engineering" ? "active" : ""}`}>
                  <Link to="/mechanical-engineering">Mechanical Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/electrical-engineering" ? "active" : ""}`}>
                  <Link to="/electrical-engineering">Electrical Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/industrial-engineering" ? "active" : ""}`}>
                  <Link to="/industrial-engineering">Industrial Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/informatics" ? "active" : ""}`}>
                  <Link to="/informatics">Informatics</Link>
                </li>
              </>
            ) : (
              <>
                <li className={`menu-item ${pathname === "/about" ? "active" : ""}`}>
                  <Link to="/about">Meet Our<br />Team</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-science" ? "active" : ""}`}>
                  <Link to="/computer-science">Computer<br />Science</Link>
                </li>
                <li className={`menu-item ${pathname === "/computer-systems-engineering" ? "active" : ""}`}>
                  <Link to="/computer-systems-engineering">Computer Systems<br />Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/industrial-engineering" ? "active" : ""}`}>
                  <Link to="/industrial-engineering">Industrial<br />Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/interdisciplinary" ? "active" : ""}`}>
                  <Link to="/interdisciplinary">Interdisciplinary</Link>
                </li>
                <li className={`menu-item ${pathname === "/biomedical-engineering" ? "active" : ""}`}>
                  <Link to="/biomedical-engineering">Biomedical<br />Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/mechanical-engineering" ? "active" : ""}`}>
                  <Link to="/mechanical-engineering">Mechanical<br />Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/electrical-engineering" ? "active" : ""}`}>
                  <Link to="/electrical-engineering">Electrical<br />Engineering</Link>
                </li>
                <li className={`menu-item ${pathname === "/informatics" ? "active" : ""}`}>
                  <Link to="/informatics">Informatics</Link>
                </li>
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