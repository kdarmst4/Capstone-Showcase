
import { ArrowBigDownDash } from "lucide-react";
import './CSS/DownloadProjects.css';
import asuLogoPlain from "./assets/asuLogoPlain.png";
import { useState } from "react";
import axios from "axios";

export function DownloadProjects() {
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const disciplines = [
    "All",
    "Biomedical Engineering",
    "Computer Science",
    "Computer Systems Engineering",
    "Electrical Engineering",
    "Industrial Engineering",
    "Informatics",
    "Interdisciplinary",
  ];
    const downloadCSV = (csvString: any, filename: string) => {
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    const API_BASE_URL = 
    process.env.NODE_ENV === 'production'?
     "":
     'http://localhost:3000/api';
  const STATIC_BASE_URL = 
   process.env.NODE_ENV === 'production' ? "" : 'http://localhost:3000'

  const jsonToCSV = (data: any, headers: string[]) => {
    const csvRows = [];
    const headerRow = headers.join(",");
    csvRows.push(headerRow);
    for (const row of data) {
      const rowValues = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(rowValues.join(","));
    }
    return csvRows.join("\n");
  };
    const csvHeaders = [
    "id",
    "projectTitle",
    "sponsor",
    "attendance",
    "email",
    "name",
    "projectDescription",
    "major",
    "numberOfTeamMembers",
    "teamMemberNames",
    "demo",
    "nda",
    "posterNDA",
    "power",
    "youtubeLink",
    "zoomLink",
    "posterPicturePath",
    "teamPicturePath",
    "submitDate",
  ];
  const getDatabaseSubmissionsAll = async (semester: string, year: string) => {
    try {
      //const response = await axios.get(`http://localhost:3000/api/survey/${major}/term=${semester}-${year}`);
      const response = await axios.get(
        `https://asucapstone.com:3000/api/survey/term=${semester}-${year}`
      );
      console.log(response);
      console.log("Fetched submissions:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

    const getDatabaseSubmissionsMajor = async (
    major: string,
    semester: string,
    year: string
  ) => {
    try {
      //const response = await axios.get(`http://localhost:3000/api/survey/${major}/term=${semester}-${year}`);
      const response = await axios.get(
        `https://asucapstone.com:3000/api/survey/${major}/term=${semester}-${year}`
      );
      console.log("Fetched submissions:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };
  const handleDownloadClickMajor = async () => {
    if (selectedMajor && selectedSemester && selectedYear) {
      const data = await getDatabaseSubmissionsMajor(
        selectedMajor,
        selectedSemester,
        selectedYear
      );
      if (data === "") {
        // Handle empty JSON data
      } else {
        const csvString = jsonToCSV(data, csvHeaders);
        if (csvString === "") {
          // Handle empty CSV data
        } else {
          downloadCSV(csvString, "database.csv");
        }
      }
    } else {
      console.log("Please select all filters (major, semester, and year).");
    }
  };

  const handleDownloadClickAll = async () => {
    if (selectedSemester && selectedYear) {
      const data = await getDatabaseSubmissionsAll(
        selectedSemester,
        selectedYear
      );
      if (data === "") {
        // Handle empty JSON data
      } else {
        const csvString = jsonToCSV(data, csvHeaders);
        if (csvString === "") {
          // Handle empty CSV data
        } else {
          downloadCSV(csvString, "database.csv");
        }
      }
    } else {
      console.log("Please select all filters (semester and year).");
    }
  };
  return (
    <div className="download-projects-page">
      <div className="download-projects-card">
        <img
          src={asuLogoPlain}
          alt="ASU Logo"
          className="download-projects-logo"
        />
        <h1 className="download-projects-title">Download Capstone Projects</h1>
        <form className="download-projects-form">
          <div className="download-projects-fields">
            <div className="download-projects-field">
              <label htmlFor="semester">Semester</label>
              <select id="semester">
                <option value="all">All</option>
                <option value="spring">Spring</option>
                <option value="fall">Fall</option>
              </select>
            </div>
            <div className="download-projects-field">
              <label htmlFor="year">Year</label>
              <select id="year">
                <option value="all">All</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div className="download-projects-field">
              <label htmlFor="discipline">Discipline</label>
              <select id="discipline">
                {disciplines.map((discipline) => (
                  <option key={discipline} value={discipline.toLowerCase().replace(/\s+/g, '-')}>{discipline}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="download-projects-field">
              <label htmlFor="format">Format</label>
              <select id="format">
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
            </div>
          <button type="button" className="download-projects-btn">
            <ArrowBigDownDash style={{ marginRight: 8 }} /> Download Projects
          </button>
        </form>
        <div className="download-projects-note">
          <strong>Note:</strong> Downloading all projects may take a while. Please be patient.
        </div>
      </div>
    </div>
  );
}
