import "../CSS/Winners.css";
import { WinnerComponent } from "../WinnerComponent";
import {useState, useEffect, useRef} from "react";
import Footer from "./Footer";

type ShowcaseEntry = {
  course: string;
  video: string;
  EntryID: number;
  shouldDisplay: "YES" | "NO"; // restrict to YES/NO
  position: number;
  members: string;
  Sponsor: string;
  description: string;
  ProjectTitle: string;
  winning_pic: string | null;
  NDA: "Yes" | "No"; // restrict to Yes/No
  year: number;
  semester: "Spring" | "Summer" | "Fall" | "Winter"; // valid seasons only
};


const Winner: React.FC = () => {

  const [pastWinnersData, setPastWinnersData] = useState<ShowcaseEntry[]>([]);
  const [filteredWinnersData, setFilteredWinnersData] = useState<ShowcaseEntry[]>([]);
  const[hasFiltered, setHasFiltered] = useState(false);

  const semesterRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasFiltered(true);

    const filteredData = pastWinnersData.filter((entry) => {
      const semester = semesterRef.current?.value.toLocaleLowerCase();
      const year = yearRef.current?.value.toLocaleLowerCase();
      // const department = departmentRef.current?.value.toLocaleLowerCase();

      return (
        (semester === "all" || entry.semester.toLowerCase() === semester) &&
        (year === "all" || entry.year.toString() === year)
      );
    }); 

    setFilteredWinnersData(filteredData);
  };

  const handleClearFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasFiltered(false);
    setFilteredWinnersData([]);

    semesterRef.current!.value = "all";
    yearRef.current!.value = "all";
    departmentRef.current!.value = "all";
  };

 //getting the data for testing
  useEffect(() =>
  {
    fetch('http://localhost:3000/api/winners').then(res => res.json())
    .then(data => setPastWinnersData(data));

    console.log('the use effect ran')
  }, []);
  
  return (
    <div className="winners-form-container">
      <h1 style={{color:'#8C1D40', fontFamily:'sans-serif', paddingTop:'1rem'}}>ASU Winners Showcase</h1>
      <p>Celebrating academic excellence and innovation through outstanding student achievements at Arizona State University.</p>
      <form className="winners-form" onSubmit={handleSearch}>
        <span>
          <label htmlFor="semester">Semester:</label>
          <select name="semester" id="semester" ref={semesterRef}>
            <option value="all">All</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
        </span>
        <span>
          <label htmlFor="year">Year:</label>
          <select name="year" id="year" ref={yearRef}>
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
          <select name="department" id="department" ref={departmentRef}>
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
        <div className="button-container">
          <button type="submit" className="form-button">Filter</button>
          <button className="form-button" onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </form>
      <WinnerComponent winners={hasFiltered ? filteredWinnersData : pastWinnersData} />
    <Footer />
    </div>
  );
};

export default Winner;
