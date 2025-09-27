import "../CSS/Winners.css";
import { WinnerComponent } from "../Components/WinnerComponent";
import useWinners from "../Hooks/useWinners";
import Footer from "./Footer";

const Winner: React.FC = () => {
  const {
    pastWinnersData,
    filteredWinnersData,
    hasFiltered,
    searchValue,
    filters,
    years,
    setFilters,
    handleSearchChange,
    handleFilterSubmit,
    clearFilters,
  } = useWinners();

  return (
    <div className="winners__form-container">
      <h1 style={{ color: "#8C1D40", fontFamily: "sans-serif", paddingTop: "1rem" }}>
        ASU Winners Showcase
      </h1>
      <p>Celebrating academic excellence and innovation through outstanding student achievements at Arizona State University.</p>

      <form className="winners__form" onSubmit={handleFilterSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="winners__filter-param"
        />

        <span>
          <label htmlFor="semester">Semester:</label>
          <select
            name="semester"
            id="semester"
            className="winners__filter-param"
            value={filters.semester}
            onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
          >
            <option value="all">All</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
        </span>

        <span>
          <label htmlFor="year">Year:</label>
          <select
            name="year"
            id="year"
            className="winners__filter-param"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="all">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </span>

        <span>
          <label htmlFor="department">Department:</label>
          <select
            name="department"
            id="department"
            className="winners__filter-param"
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          >
            <option value="all">All</option>
            <option value="computer-science">Computer Science</option>
            <option value="computer-systems-engineering">Computer Systems Engineering</option>
            <option value="biomedical-engineering">Biomedical Engineering</option>
            <option value="mechanical-engineering">Mechanical Engineering</option>
            <option value="electrical-engineering">Electrical Engineering</option>
            <option value="industrial-engineering">Industrial Engineering</option>
            <option value="informatics">Informatics</option>
            <option value="interdisciplinary">Interdisciplinary</option>
          </select>
        </span>

        <div className="winners__button-container">
          <button type="submit" className="winners__form-button">
            Filter
          </button>
          <button className="winners__form-button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </form>

      <WinnerComponent winners={hasFiltered ? filteredWinnersData : pastWinnersData} />
      <Footer />
    </div>
  );
};

export default Winner;
