import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../CSS/AdminDashboard.css";
import { Winners } from "../AdminWinners";
import { AdminDashboardShortcut } from "./AdminDashboardShortcut";
import { useAuth } from "../AuthContext";
// import {Support} from "../Support";
// import asuLogoPlain from "../assets/asuSquareLogo.png";
import {
  // ArrowBigDownDash,
  // PencilRuler,
  LayoutDashboard,
  PencilOff,
  // UserRoundPen,
  // FilePenLine,
  CloudDownload,
  PackageMinus,
  // Info,
  LogOut,
  Crown,
} from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Edit } from "../Edit";
import { DownloadProjects } from "../DownloadProjects";

interface AdminDashboardProps {
  pageTitle: string;
}

const sidebarOptions = [
  { label: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard /> },
  // {
  //   label: "Support Requests",
  //   path: "/admin-dashboard/support",
  //   icon: <FontAwesomeIcon icon={faCircleInfo} />,
  // },
  {
    label: "Make Edits",
    path: "/admin-dashboard/edit-students",
    icon: <PencilOff />,
  },
  // {
  //   label: "Edit Sponsors",
  //   path: "/admin-dashboard/edit-sponsors",
  //   icon: <UserRoundPen />,
  // },
  // {
  //   label: "Edit Presentation Info",
  //   path: "/admin-dashboard/edit-presentation-info",
  //   icon: <FilePenLine />,
  // },
  {
    label: "Download Database",
    path: "/admin-dashboard/download-database",
    icon: <CloudDownload />,
  },
  {
    label: "Winners",
    path: "/admin-dashboard/update-winners",
    icon: <Crown />,
  },
  // { label: "Support", path: "/admin-dashboard/support", icon: <Info /> },
  // {label: "Edit", path: "/admin-dashboard/edit-admins", icon: <UserCog />},
];

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>(
    ""
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>("");
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  // const { token, setToken, isSignedIn } = useAuth(); // Use the useAuth hook
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

  const API_BASE_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";
  const STATIC_BASE_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

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
  const changeTitle = (title: string) => {
    setPageTitle(title);
  }

  const isDashboardPage = location.pathname === "/admin-dashboard";
  const isEditPage = location.pathname === "/admin-dashboard/edit";
  const isSupportPage = location.pathname === "/admin-dashboard/support";

  return (
    <div className="admin-dashboard-container">
      {loggingOut && (
        <div
          className="admin-logout-shade"
          onClick={() => setLoggingOut(false)}
        >
          <div className="admin-logout-msg">
            <LogOut size={50} className="admin-logout-icon" />
            <h2>Log Out</h2>
            <p>
              Are you sure you want to log out? You’ll need to sign in again to
              access your dashboard.
            </p>
            <button className="admin-logout-yes" onClick={handleLogout}>
              Yes, Log Me Out
            </button>
            <button
              className="admin-logout-no"
              onClick={() => setLoggingOut(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <span className="admin-dashboard-navbar">
        <span className="admin-dashboard-navbar-options">
          <span>
            <h1 className="admin-dashboard-navbar-title">{pageTitle}</h1>
          </span>
          <ul className="admin-dashboard-navbar-list">
            {sidebarOptions.map((option) => (
              <li
                key={option.label}
                className="admin-dashboard-navbar-items"
                onClick={() => {
                  setPageTitle(option.label);
                }}
              >
                {option.icon}

                {option.label}
              </li>
            ))}
            <a href="https://betasubmission.asucapstone.com/login" className="admin-dashboard-navbar-items"><PackageMinus />Go to Sponsore Page</a>
              

          </ul>
        </span>

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
      <main className="admin-dashboard-main">
        {pageTitle === "Dashboard" && (
          <AdminDashboardShortcut changeTitle={changeTitle} />
        )}
        {pageTitle === "Download Database" && <DownloadProjects />}
        {pageTitle === "Make Edits" && <Edit />}
        {/* {pageTitle === 'Support' && ( <Support /> )}   */}
        {pageTitle === "Winners" && <Winners />}
      </main>
    </div>
  );
};

export default AdminDashboard;
