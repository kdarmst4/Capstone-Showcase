import React, { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import "../CSS/AdminDashboard.css";
import asuLogoPlain from "../assets/asuSquareLogo.png";
import {
  ArrowBigDownDash,
  PencilRuler,
  LayoutDashboard,
  PencilOff,
  UserRoundPen,
  FilePenLine,
  CloudDownload,
  PackageMinus,
  Info,
  LogOut 
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface AdminDashboardProps {
  pageTitle: string;
}

const semesters = [
  { label: "Spring", value: "sp" },
  { label: "Fall", value: "fa" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const majors = [
  { label: "Biomedical Engineering", value: "biomedical-engineering" },
  { label: "Computer Science", value: "computer-science" },
  {
    label: "Computer Systems Engineering",
    value: "computer-systems-engineering",
  },
  { label: "Electrical Engineering", value: "electrical-engineering" },
  { label: "Industrial Engineering", value: "industrial-engineering" },
  { label: "Informatics", value: "informatics" },
  { label: "Interdisciplinary", value: "interdisciplinary" },
  { label: "Mechanical Engineering", value: "mechanical-engineering" },
];

const sidebarOptions = [
  { label: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard /> },
  {
    label: "Support Requests",
    path: "/admin-dashboard/support",
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
  },
  {
    label: "Edit Students Submissions",
    path: "/admin-dashboard/edit-students",
    icon: <PencilOff />,
  },
  {
    label: "Edit Sponsors",
    path: "/admin-dashboard/edit-sponsors",
    icon: <UserRoundPen />,
  },
  {
    label: "Edit Presentation Info",
    path: "/admin-dashboard/edit-presentation-info",
    icon: <FilePenLine />,
  },
  {
    label: "Download Database",
    path: "/admin-dashboard/download-database",
    icon: <CloudDownload />,
  },
  { label: "Go to Sponsore Page", path: "/sponsor", icon: <PackageMinus /> },
  { label: "Support", path: "/admin-dashboard/support", icon: <Info /> },
  // {label: "Edit", path: "/admin-dashboard/edit-admins", icon: <UserCog />},
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>(
    ""
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>("");
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>("");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/admin");
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

  const downloadCSV = (csvString: any, filename: string) => {
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  //to get major/semester/year
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

  //to get semseter year
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

  const isDashboardPage = location.pathname === "/admin-dashboard";
  const isEditPage = location.pathname === "/admin-dashboard/edit";
  const isSupportPage = location.pathname === "/admin-dashboard/support";

  return (
    
    <div className="admin-dashboard-container">
      {loggingOut && 
      <div className="admin-logout-shade" onClick={ () => setLoggingOut(false)}>
        <div className="admin-logout-msg">
           <LogOut size={50} className="admin-logout-icon" />
           <p>Ohh no! Are you sure you want to log out?</p>
           <p>Are you sure you want to log out?</p>
          <button className="admin-logout-yes" onClick={handleLogout}>Yes</button>
          <button className="admin-logout-no" onClick={() => setLoggingOut(false)}>No</button>
          </div>
      </div>
    }
      <span className="admin-dashboard-navbar">
        <span>
          <h1 className="admin-dashboard-navbar-title">{pageTitle}</h1>
        </span>
        <ul>
          {sidebarOptions.map((option) => (
            <li key={option.label} className="admin-dashboard-navbar-items">
              {option.icon}
              <Link
                to={option.path}
                
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
        <span>
          <button
            className="admin-dashboard-logout-button"
            onClick={() => {
              setLoggingOut(true);
            }}
          >
            Logout
          </button>
        </span>
      </span>
      <main className="admin-dashboard-main"></main>
    </div>
  );
};

export default AdminDashboard;
