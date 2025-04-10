import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
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

  const csvHeaders = [
    'id',
    'email',
    'name',
    'projectTitle',
    'projectDescription',
    'sponsor',
    'teamMemberNames',
    'numberOfTeamMembers',
    'major',
    'demo',
    'power',
    'nda',
    'youtubeLink',
  ];

  const downloadCSV = (csvString: any, filename: string) => {
    // Create CSV file and initiate download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const jsonToCSV = (data: any, headers: string[]) => {
    const csvRows = [];
    // Getting headers
    const headerRow = headers.join(',')
    csvRows.push(headerRow)
    // Getting rows
    for (const row of data) { 
      const rowValues = headers.map(header => { 
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      }); 
      csvRows.push(rowValues.join(',')); 
    }
    return csvRows.join('\n');
  };

  const getDatabaseSubmissions = async () => {
    try {
      const response = await axios.get('https://asucapstone.com:3000/api/admin/submissions');
      //const response = await axios.get('http://localhost:3000/api/admin/submissions'); // Ensure this matches your server URL
      console.log('Fetched submissions:', response.data); // Debug: Log the fetched data
      return response.data
    } catch (error) {
      console.error('Error fetching submissions:', error); // Debug: Log errors
    }
  };

  const handleDownloadClick = async () => {
    const data = await getDatabaseSubmissions()
    if (data === '')
    {
      // Handle empty JSON data
    }
    else
    {
      const csvString = jsonToCSV(data, csvHeaders)
      if (csvString === '')
      {
        // Handle empty CSV data
      }
      else
      {
        downloadCSV(csvString, 'database.csv')
      }
    }
  };

  const isDashboardPage = location.pathname === '/admin-dashboard';
  const isEditPage = location.pathname === '/admin-dashboard/edit';
  const isSupportPage = location.pathname === '/admin-dashboard/support';

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
              <Link to="/admin-dashboard/support">
                <i className="fa-solid fa-envelope-open"></i> Support
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

          {isDashboardPage && (
            <div>
              <div className="button-row">
                <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/edit/presentation')}>
                  Edit Capstone Presentation Information
                </div>
                <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/edit/submissions')}>
                  Edit Student Capstone Submissions
                </div>
                <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/support')}>
                  Contact Support
                </div>
              </div>
              <div className="button-row">
                <div className="dashboard-button" onClick={handleDownloadClick}>
                  Download Database as CSV
                </div>
                <div className="dashboard-button" onClick={() => window.location.replace('https://betasubmission.asucapstone.com/login')}>
                  Go to Sponsor Page
                </div>
              </div>
            </div>
          )}

          {isEditPage && (
            <div className="edit-button-row">
              <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/edit/presentation')}>
                Edit Capstone Presentation Information
              </div>
              <div className="dashboard-button" onClick={() => navigate('/admin-dashboard/edit/submissions')}>
                Edit Student Capstone Submissions
              </div>
            </div>
          )}

          {isSupportPage && (
            <div className="support-content">
              <p>Need help? Fill out the form below or contact us directly!</p>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
