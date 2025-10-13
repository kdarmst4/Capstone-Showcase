import { ArrowBigDownDash } from "lucide-react";
import "./CSS/DownloadProjects.css";
import asuLogoPlain from "./assets/asuLogoPlain.png";
import { useState } from "react";
import axios from "axios";

export function DownloadProjects() {
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState("csv");
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
const downloadCSV = (csvString: string, filename: string) => {
  try {
    // Add BOM for proper UTF-8 encoding in Excel
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvString;
    
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    
    // Check if URL.createObjectURL is supported
    if (!window.URL || !window.URL.createObjectURL) {
      throw new Error("Browser doesn't support file downloads");
    }
    
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", filename);
    
    // Ensure the link is added to DOM before clicking
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
        console.log(`Successfully downloaded: ${filename}`);
  } catch (error) {
    console.error("Error downloading CSV:", error);
    setError(`Failed to download CSV: ${error}`);
  }
};

  const jsonToCSV = (data: any[], headers: string[]) => {
  console.log('Converting to CSV with data:', data);
  console.log('Using headers:', headers);
  
  const csvRows = [];
  const headerRow = headers.join(",");
  csvRows.push(headerRow);
  
  for (const row of data) {
    console.log('Processing row:', row);
    
    const rowValues = headers.map((header) => {
      let value = row[header];
      
      // Handle undefined/null values
      if (value === undefined || value === null) {
        console.log(`Warning: ${header} is undefined for row:`, row);
        value = '';
      }
      // Convert to string and escape quotes
      const stringValue = String(value);
      
      // If value contains comma, newline, or quotes, wrap in quotes and escape internal quotes
      if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      
      return stringValue;
    });
    
    csvRows.push(rowValues.join(","));
  }
  
  return csvRows.join("\n");
};
  const downloadJSON = (data: any, filename: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const csvHeaders = [
    "EntryID",
    "ProjectTitle",
    "Sponsor",
    "Email",
    "Name",
    "ProjectDescription",
    // "Major",
    "NumberOfMembers",
    "MemberNames",
    "Demo",
    "NDA",
    "PosterNDA",
    "Power",
    "VideoLink",
    "VideoLinkRaw",
    "DateStamp",
    "ShouldDisplay",
    "position",
    "winning_pic",
  ];




  const handleDownloadClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const API_BASE_URL =
      process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be later than end date.");
      return;
    }
    setError("");

    fetch(`${API_BASE_URL}/downloadProjects/${startDate}/${endDate}/${selectedMajor}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then((data) => {
        if (selectedFormat === "csv") {
          const csvString = jsonToCSV(data.results, csvHeaders);
          downloadCSV(csvString, "database.csv");
        } else if (selectedFormat === "json") {
          downloadJSON(data.results, "database.json");
        }
      })
      
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
        <form
          className="download-projects-form"
          onSubmit={(event) => handleDownloadClicked(event)}
        >
          <div className="download-projects-fields">
            <div className="download-projects-field">
              <label htmlFor="startdate">Start Date</label>
              <input type="date" id="startdate" name="startdate" onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="download-projects-field">
              <label htmlFor="enddate">End Date</label>
              <input type="date" id="enddate" name="enddate" onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="download-projects-field">
              <label htmlFor="discipline">Discipline</label>
              <select
                id="discipline"
                onChange={(e) => setSelectedMajor(e.target.value)}
              >
                {disciplines.map((discipline) => (
                  <option
                    key={discipline}
                    value={discipline.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {discipline}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="download-projects-field">
            <label htmlFor="format">Format</label>
            <select id="format" onChange={(e) => setSelectedFormat(e.target.value)}>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <p className="download-projects-error">{error}</p>
          <button type="submit" className="download-projects-btn">
            <ArrowBigDownDash style={{ marginRight: 8 }} /> Download Projects
          </button>
        </form>
        <div className="download-projects-note">
          <strong>Note:</strong> Downloading all projects may take a while.
          Please be patient.
        </div>
      </div>
    </div>
  );
}
