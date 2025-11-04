import "../CSS/Winners.css";
import { WinnerComponent } from "../Components/WinnerComponent";
import { useEffect } from "react";
import useWinners from "../Hooks/useWinners";
import Footer from "./Footer";
import firstPlaceTeam from "../assets/winners/team-1.webp";
import secondPlaceTeam from "../assets/winners/team-2.webp";
import thirdPlaceTeam from "../assets/winners/team-3.webp";
import firstPlacePoster from "../assets/winners/poster-1.webp";
import secondPlacePoster from "../assets/winners/poster-2.webp";
import thirdPlacePoster from "../assets/winners/poster-3.webp";
import firstPlaceTeamJPG from "../assets/winners/team-1.jpg";
import secondPlaceTeamJPG from "../assets/winners/team-2.jpg";
import thirdPlaceTeamJPG from "../assets/winners/team-3.jpg";
import firstPlacePosterJPG from "../assets/winners/poster-1.jpg";
import secondPlacePosterJPG from "../assets/winners/poster-2.jpg";
import thirdPlacePosterJPG from "../assets/winners/poster-3.jpg";

const winners = [
  {
    title: "First Place",
    project: "CS/E-026 - ASU - NASA - Web-Based Game for Psyche Mission to Educate and Engage the Public about Asteroid Exploration",
    members: "(Pictured left to right) Andrew Rodriguez, Elias Hilaneh, Munghoon Cho(Not Present)",
    teamImage: firstPlaceTeam,
    teamImageJPG: firstPlaceTeamJPG,
    posterImage: firstPlacePoster,
    posterImageJPG: firstPlacePosterJPG,
  },
  {
    title: "Second Place",
    project: "CS/E-173 - Varsity Media Foundation - Varsity Sports Show subscription internet channel to view sporting events",
    members: "(Pictured left to right) Evangelos Leros, Marisol Alvira, Nilay Patel (Not Present)",
    teamImage: secondPlaceTeam,
    teamImageJPG: secondPlaceTeamJPG,
    posterImage: secondPlacePoster,
    posterImageJPG: secondPlacePosterJPG,
  },
  {
    title: "Third Place",
    project: "IEE-024 - Banner 2: Emergency Department(ED) Simulation 2",
    members: "(Pictured left to right) Ethan McLaughlin, Amanda Zaccardi, Ryan Cassara",
    teamImage: thirdPlaceTeam,
    teamImageJPG: thirdPlaceTeamJPG,
    posterImage: thirdPlacePoster,
    posterImageJPG: thirdPlacePosterJPG,
  },
];

const Winner: React.FC = () => {
  const {
    pastWinnersData,
    filteredWinnersData,
    hasFiltered,
    searchValue,
    filters,
    setFilters,
    handleSearchChange,
    handleFilterSubmit,
    clearFilters,
  } = useWinners(winners);

  // const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);
  // const API_BASE_URL =
  // process.env.NODE_ENV === "production"
  //   ? "/api" // Relative URL - will use https://showcase.asucapstone.com/api
  //   : "http://localhost:3000/api";

  // useEffect(() => {
  //   fetch(`${API_BASE_URL}/winners`)
  //     .then((res) => res.json())
  //     .then((data) => setPastWinnersData(data))
  //     .catch(() => setPastWinnersData([]));
  // }, []);


  return (
    <div className="winners__form-container">
      <h1 className="winners__showcase-title">
        ASU Winners Showcase
      </h1>
      <p className="winners__showcase-desc">Celebrating academic excellence and innovation through outstanding student achievements at Arizona State University.</p>

      <div className="winners__filter-bar-container">
        <form className="winners__form" onSubmit={handleFilterSubmit}>
        {/* <form className="winners__form"> */}
          <div className="winners__left-filter-bar">

              {/* <div className="winners__item-container">
                <label htmlFor="semester"></label>
                <select
                  name="semester"
                  id="semester"
                  className="winners__filter-param"
                  value={filters.semester}
                  onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                >
                  <option value="all">Semester</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                </select>
              </div>

              <div className="winners__item-container">
                <label htmlFor="year"></label>
                <select
                  name="year"
                  id="year"
                  className="winners__filter-param"
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                >
                  <option value="all">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="winners__item-container">
                <label htmlFor="department"></label>
                <select
                  name="department"
                  id="department"
                  className="winners__filter-param winners__department-dropdown"
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                >
                  <option value="all">Department</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="computer-systems-engineering">Computer Systems Engineering</option>
                  <option value="biomedical-engineering">Biomedical Engineering</option>
                  <option value="mechanical-engineering">Mechanical Engineering</option>
                  <option value="electrical-engineering">Electrical Engineering</option>
                  <option value="industrial-engineering">Industrial Engineering</option>
                  <option value="informatics">Informatics</option>
                  <option value="interdisciplinary">Interdisciplinary</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="winners__filter-param winners__search-input"
              />
          </div>

          <div className="winners__item-container">
            <div className="winners__button-container">
              <button type="submit" className="winners__form-button">
                Filter
              </button>
              <button className="winners__form-button" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </form>
      </div>

      <WinnerComponent winners={hasFiltered ? filteredWinnersData : pastWinnersData} />
      {/* <div className="winners__z-index"> */}
        <Footer />
      {/* </div> */}
    </div>
  );
};

export default Winner;
