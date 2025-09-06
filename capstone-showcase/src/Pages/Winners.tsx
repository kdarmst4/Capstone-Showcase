import "../CSS/WinnersForm.css";
import { Winners, FeaturedWinners } from "../WinnerComponent";
import {useState, useEffect} from "react";

const Winner: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );

  const[hasFiltered, setHasFiltered] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasFiltered(true);
  };

  
  return (
    <div className="winners-form-container">
      <h1 style={{color:'#8C1D40', fontFamily:'sans-serif', paddingTop:'1rem'}}>ASU Winners Showcase</h1>
      <form className="winners-form" onSubmit={handleSearch}>
        <span>
          <label htmlFor="semester">Semester:</label>
          <select name="semester" id="semester">
            <option value="all">All</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
        </span>
        <span>
          <label htmlFor="year">Year:</label>
          <select name="year" id="year">
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
          <select name="department" id="department">
            <option value="all">All</option>
            <option value="computer-science">Computer Science</option>
            <option value="computer-systems-engineering">
              Computer Systems Engineering
            </option>
            <option value="biomedical-engineering">
              Biomedical Engineering
            </option>
            <option value="mechanical-engineering">
              Mechanical Engineering
            </option>
            <option value="electrical-engineering">
              Electrical Engineering
            </option>
            <option value="industrial-engineering">
              Industrial Engineering
            </option>
            <option value="informatics">Informatics</option>
            <option value="interdisciplinary">Interdisciplinary</option>
          </select>
        </span>
        <button type="submit">Filter</button>
      </form>

      {
        hasFiltered == false ? (
           <Winners />
        ) : (
            <p>Here are the winners:</p>
        )
      }
    </div>
  );
};

export default Winner;
