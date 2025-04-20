import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../CSS/AdminDashboard.css";
import asuLogoPlain from "../assets/asuSquareLogo.png";

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
  { label: "Computer Systems Engineering", value: "computer-systems-engineering" },
  { label: "Electrical Engineering", value: "electrical-engineering" },
  { label: "Industrial Engineering", value: "industrial-engineering" },
  { label: "Informatics", value: "informatics" },
  { label: "Interdisciplinary", value: "interdisciplinary" },
  { label: "Mechanical Engineering", value: "mechanical-engineering" },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>('');
  const [selectedYear, setSelectedYear] = useState<string | undefined>('');
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>('');

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
    'submitDate',
  ];

  const downloadCSV = (csvString: any, filename: string) => {
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
    const headerRow = headers.join(',');
    csvRows.push(headerRow);
    for (const row of data) {
      const rowValues = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(rowValues.join(','));
    }
    return csvRows.join('\n');
  };

  // Update the function to include the new URL structure
  const getDatabaseSubmissions = async (major: string, semester: string, year: string) => {
    try {
       const response = await axios.get(`http://localhost:3000/api/survey/${major}/term=${semester}-${year}`);
      //const response = await axios.get(`https://asucapstone.com:3000/api/survey/${major}/term=${semester}-${year}`);
      console.log('Fetched submissions:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleDownloadClick = async () => {
    if (selectedMajor && selectedSemester && selectedYear) {
      const data = await getDatabaseSubmissions(selectedMajor, selectedSemester, selectedYear);
      if (data === '') {
        // Handle empty JSON data
      } else {
        const csvString = jsonToCSV(data, csvHeaders);
        if (csvString === '') {
          // Handle empty CSV data
        } else {
          downloadCSV(csvString, 'database.csv');
        }
      }
    } else {
      console.log('Please select all filters (major, semester, and year).');
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
                  Download Database
                </div>
                <div className="dashboard-button" onClick={() => window.location.replace('https://betasubmission.asucapstone.com/login')}>
                  Go to Sponsor Page
                </div>
              </div>
              <div>
                <label>Pick Semester, Major, and Year to Download Database</label>
              </div>
              <div className="filters">
                <label>
                  Semester:
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((semester) => (
                      <option key={semester.value} value={semester.value}>
                        {semester.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Year:
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Major:
                  <select
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                  >
                    <option value="">Select Major</option>
                    {majors.map((major) => (
                      <option key={major.value} value={major.value}>
                        {major.label}
                      </option>
                    ))}
                  </select>
                </label>
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