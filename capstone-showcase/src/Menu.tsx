import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import asuLogo from "./assets/asuLogo.png";
import "./Menu.css";
import {  Award, UsersRound, ChevronDown  } from "lucide-react";
const Menu: React.FC = () => {
  const { pathname } = useLocation();
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

  useEffect(() =>
  {
    setToggleDropdown(false);
  },[location.pathname]);

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
      <label htmlFor="semesterDropdown">
      </label>
      <select
        id="semesterDropdown"
        className="semesterDropdown"
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
      {/* {currentSemester && currentYear && (
        <div className="selected-semester-label">
          Showing projects from:{" "}
          <strong>
            {currentSemester === "sp" ? "Spring" : "Fall"} {currentYear}
          </strong>
        </div>
      )} */}
    </li>
  );

  return (
    <div className="parent">
      <div className="nav-container">
        <div
          className="nav-mobile-dropdown"
          style={{ height: toggleDropdown ? 525 : 0 }}
        >
          <ul>
            {menuOptions.map((option) => (
              <li key={option.path} className="menu-item">
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
          <img src={asuLogo} alt="ASU Logo" className="asu-logo" width={450}/>
        </Link>
        <div
          className="burger-menu"
          onClick={() => setToggleDropdown(!toggleDropdown)}
        >
          <span
            className="bun"
            style={{
              top: toggleDropdown ? "50%" : "30%",
              left: "50%",
              transform: toggleDropdown
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, -50%)",
            }}
          />
          <span
            className="patty"
            style={{
              opacity: toggleDropdown ? 0 : 1,
            }}
          />
          <span
            className="bun"
            style={{
              top: toggleDropdown ? "50%" : "70%",
              left: "50%",
              transform: toggleDropdown
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, -50%)",
            }}
          />
        </div>
        {/* desktop view menu  */}
        <div className="desktop-menu">
          <Link to="/winners" className="special-link">
            {/* <Award size={24} /> */}
            Winners
          </Link>
          <button className="department-button">
            Department
            <ChevronDown size={14} style={{ marginLeft: 0 }} strokeWidth={3.5} className="arrow" />
            <div className="department-dropdown">
              {menuOptions
                .filter(option => !['About', 'Winners', 'Home'].includes(option.name))
                .map(option => (
                  <Link
                    key={option.path}
                    to={option.path}
                    className={`menu-item ${
                      pathname === option.path ? "active" : ""
                    }`}
                  >
                    {option.name}
                  </Link>
                ))}
            </div>
          </button>
          <div className="semester-dropdown">
            {renderSemesterDropdown()}
          </div>
        </div>
        <div className="far-right-container">
          <Link to="/about" className="special-link">
            {/* <UsersRound size={24} /> */}
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
