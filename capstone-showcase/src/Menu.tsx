import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";
import { useMenuContext } from "./MenuContext";
import asuLogo from "./assets/asuLogo.png";
import "./Menu.css";

const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const { isSideMenu, toggleMenu } = useMenuContext();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //const submenuRef = useRef<HTMLLIElement>(null);
  const [currentSemester, setCurrentSemester] = useState<"sp" | "fa" | null>(
    null
  );
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const menuOptions = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Winners", path: "/winners" },
    { name: "Computer Science", path: "/computer-science" },
    {
      name: "Computer Systems Engineering",
      path: "/computer-systems-engineering",
    },
    { name: "Interdisciplinary", path: "/interdisciplinary" },
    { name: "Biomedical Engineering", path: "/biomedical-engineering" },
    { name: "Mechanical Engineering", path: "/mechanical-engineering" },
    { name: "Electrical Engineering", path: "/electrical-engineering" },
    { name: "Industrial Engineering", path: "/industrial-engineering" },
    { name: "Informatics", path: "/informatics" },
  ];
  // reactive to size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (!isSideMenu) toggleMenu();
      } else {
        if (isSideMenu) toggleMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSideMenu, toggleMenu]);
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
    // Only run semester/year redirect logic on top-level routes
    const topLevelRoutes = [
      "/",
      "/winners",
      "/about",
      "/computer-science",
      "/computer-systems-engineering",
      "/interdisciplinary",
      "/biomedical-engineering",
      "/mechanical-engineering",
      "/electrical-engineering",
      "/industrial-engineering",
      "/informatics",
    ];
    if (!topLevelRoutes.includes(pathname)) return;

    const semesterFromUrl = searchParams.get("semester") as "sp" | "fa" | null;
    const yearFromUrl = searchParams.get("year");

    if (semesterFromUrl && yearFromUrl) {
      setCurrentSemester(semesterFromUrl);
      setCurrentYear(yearFromUrl);
      localStorage.setItem(
        "selectedSemesterYear",
        `${semesterFromUrl}-${yearFromUrl}`
      );
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
        navigate(`${pathname}?semester=${semester}&year=${year}`, {
          replace: true,
        });
      }
    }
  }, [location.search, pathname]);

  const renderSemesterDropdown = () => (
    <li className="semester-selector">
      <label htmlFor="semesterDropdown">Select Semester:</label>
      <select
        id="semesterDropdown"
        value={
          currentSemester && currentYear
            ? `${currentSemester}-${currentYear}`
            : ""
        }
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
          Showing projects from:{" "}
          <strong>
            {currentSemester === "sp" ? "Spring" : "Fall"} {currentYear}
          </strong>
        </div>
      )}
    </li>
  );

  return (
    <div>
      {isSideMenu ? (
        <div
          className={`menu-wrapper ${isSideMenu ? "side-menu" : "top-menu"}`}
        >
          <div
            className={`page-container ${
              isSideMenu ? "side-menu" : "top-menu"
            }`}
          >
            <div className="menu-container">
              <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
              <button className="toggle-button" onClick={toggleMenu}>
                <i
                  className={`fas ${isSideMenu ? "fa-arrow-left" : "fa-bars"}`}
                ></i>
              </button>
              <div className="menu">
                <ul className="menu-list">
                  <li
                    className={`menu-item ${pathname === "/" ? "active" : ""}`}
                  >
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

                  {/* this is for the side menu */}
                  <li
                    className={`menu-item ${
                      pathname === "/about" ? "active" : ""
                    }`}
                  >
                    <Link to="/about">Meet Our Team </Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/computer-science" ? "active" : ""
                    }`}
                  >
                    <Link to="/computer-science">Computer Science</Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/computer-systems-engineering"
                        ? "active"
                        : ""
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
                    <Link to="/interdisciplinary">Interdisciplinary</Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/biomedical-engineering" ? "active" : ""
                    }`}
                  >
                    <Link to="/biomedical-engineering">
                      Biomedical Engineering
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/mechanical-engineering" ? "active" : ""
                    }`}
                  >
                    <Link to="/mechanical-engineering">
                      Mechanical Engineering
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/electrical-engineering" ? "active" : ""
                    }`}
                  >
                    <Link to="/electrical-engineering">
                      Electrical Engineering
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/industrial-engineering" ? "active" : ""
                    }`}
                  >
                    <Link to="/industrial-engineering">
                      Industrial Engineering
                    </Link>
                  </li>
                  <li
                    className={`menu-item ${
                      pathname === "/informatics" ? "active" : ""
                    }`}
                  >
                    <Link to="/informatics">Informatics</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=""
          style={{
            display: "flex",
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "0",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "4px",

              zIndex: 100,
              width: "100%",
              height: toggleDropdown ? "425px" : "0",
              overflow: "hidden",
              transition: "height 0.3s ease",
              //   display: toggleDropdown ? 'block' : 'none',
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
                width: "100%",
              }}
            >
              {menuOptions.map((option) => (
                <li
                  key={option.path}
                  style={{
                    margin: "10px",
                    // borderTop: "1px solid black",
                  }}
                >
                  <Link
                    to={option.path}
                    className={`menu-item ${
                      pathname === option.path ? "active" : ""
                    }`}
                  >
                    {option.name}
                  </Link>
                </li>
              ))}
              {renderSemesterDropdown()}
            </ul>
          </div>
          <Link to="/" className="">
            <img src={asuLogo} alt="ASU Logo" className="asu-logo" />
          </Link>
          <div>
            <div
              onClick={() => setToggleDropdown(!toggleDropdown)}
              style={{
                background: "none",
                width: "40px",
                height: "40px",
                border: "none",
                outline: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
                zIndex: 101,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: toggleDropdown ? "50%" : "30%",
                  left: "50%",
                  transform: toggleDropdown
                    ? "translate(-50%, -50%) rotate(45deg)"
                    : "translate(-50%, -50%)",
                  background: "black",
                  width: "20px",
                  height: "2px",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "black",
                  width: "20px",
                  height: "2px",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  opacity: toggleDropdown ? 0 : 1,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: toggleDropdown ? "50%" : "70%",
                  left: "50%",
                  transform: toggleDropdown
                    ? "translate(-50%, -50%) rotate(-45deg)"
                    : "translate(-50%, -50%)",
                  background: "black",
                  width: "20px",
                  height: "2px",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
