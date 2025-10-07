import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AdminDashboard.css";
import { Winners } from "../AdminWinners";
import { AdminDashboardShortcut } from "./AdminDashboardShortcut";
import { useAuth } from "../AuthContext";
import {
  LayoutDashboard,
  PencilOff,
  CloudDownload,
  PackageMinus,
  LogOut,
  Crown,
} from "lucide-react";
import { Edit } from "../Edit";
import { DownloadProjects } from "../DownloadProjects";

interface AdminDashboardProps {
  pageTitle: string;
}

const sidebarOptions = [
  { label: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard /> },
  {
    label: "Make Edits",
    path: "/admin-dashboard/edit-students",
    icon: <PencilOff />,
  },

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
 
];

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const {  isSignedIn, isTokenValid, setIsSignedIn, setToken } = useAuth();
  const handleLogout = () => {
    setIsSignedIn(false);
    setToken(null);
    navigate("/admin");
  };

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/admin");
    }
    else if (!isTokenValid())
    {
      setIsSignedIn(false);
      setToken(null);
      navigate("/admin");
    }
  }, [isSignedIn, navigate]);







  const changeTitle = (title: string) => {
    setPageTitle(title);
  }

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
        {pageTitle === "Winners" && <Winners />}
      </main>
    </div>
  );
};

export default AdminDashboard;
