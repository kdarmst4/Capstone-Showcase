import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import "../CSS/AdminDashboard.css";
import asuLogoPlain from "../assets/asuSquareLogo.png";

interface AdminDashboardProps {
  pageTitle: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/admin');
  };

  const showButtons = location.pathname === '/admin-dashboard';

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <nav className="sidebar">
          <div className="admin-info">
            <img src={asuLogoPlain} alt="Admin" />
            <p>Admin</p>
          </div>
          <ul>
            <li>
              <Link to="/admin-dashboard" className="dashboard-header">
                <i className="fa-solid fa-house"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/edit">
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </Link>
            </li>
            <li>
              <Link to="/admin-dashboard/settings">
                <i className="fa-solid fa-gear"></i> Settings
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </ul>
        </nav>

        <div className="admin-dashboard-content">
          <h1>{pageTitle}</h1>

          {showButtons && (
            <div className="button-row">
              <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/edit')}>
                Edit Capstone Presentation Information
              </div>
              <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/edit')}>
                Edit Student Capstone Submissions
              </div>
              <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/contact-support')}>
                Contact Support
              </div>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
