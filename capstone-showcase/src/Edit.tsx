import { useState, useEffect } from "react";
import "./CSS/edit.css";
import EditProject from "./EditProject";
export function Edit() {
  const [presentationEdit, setPresentationEdit] = useState<boolean>(false);
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );
  const [projects, setProjects] = useState([]);
  const [submissionSelected, setSubmissionSelected] = useState(null);
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/projects/fa/2024') // Replace with your API endpoint
      const data = await response.json();
      setProjects(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSelectionClose = () =>
  {
    setSubmissionSelected(null);
  }

  useEffect(() =>
  {
    fetchProjects();
  }, [])
  return (
    <div className="edit-page">
      <p className="edit-title">Choose what you want to edit</p>
      <div className="edit-choice">
        <button
          className={`edit-choice-button ${
            presentationEdit ? "active-edit" : ""
          }`}
          onClick={() => setPresentationEdit(true)}
        >
          Edit Presentations
        </button>
        <button
          className={`edit-choice-button ${
            !presentationEdit ? "active-edit" : ""
          }`}
          onClick={() => setPresentationEdit(false)}
        >
          Edit Submissions
        </button>
      </div>

      {presentationEdit ? (
        <div className="edit-instructions">
          <p className="edit-instructions-text">Capstone Presentation</p>
          <div>
            <p>Update Presentation Details</p>
            <form className="update_presentation-details">
              <span>
                <label htmlFor="presentation-date">Presentation Date:</label>
                <input
                  type="date"
                  id="presentation-date"
                  name="presentation-date"
                />
              </span>
              <span>
                <label htmlFor="presentation-time">Presentation Time:</label>
                <input
                  type="time"
                  id="presentation-time"
                  name="presentation-time"
                />
              </span>
              <span>
                <label htmlFor="location">Location:</label>
                <input
                  type="file"
                  id="presentation-location"
                  name="presentation-location"
                  placeholder="Enter location"
                />
              </span>
              <button type="submit" className="form-button">
                Update Presentation
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={`edit-instructions ${submissionSelected ? "no-scroll" : ""}`}>
          {submissionSelected && (
            <div className="edit-project-submission">
              <p
                className="edit-close-btn"
                onClick={() => setSubmissionSelected(null)}
              >
                X
              </p>
              <EditProject project={submissionSelected} closeFunc={handleSelectionClose} />
            </div>
          )}
          <form className="edit-form">
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
            <div className="button-container">
              <button type="submit" className="form-button">
                Get submissions
              </button>
              <button className="form-button">Clear Filters</button>
            </div>
          </form>

          <div className="edit-submission-table">
            {/* Table of submissions will go here */}
            <table>
              <tr>
                <th>EntryId</th>
                <th>Project Title</th>
                <th>Project Desc</th>
                <th>Member Count</th>
                <th>Project Sponsor</th>
              </tr>
              {
                projects.map((project: any) => (
                  <tr
                    key={project.EntryID}
                    onClick={() => setSubmissionSelected(project)}
                  >
                    <td><div>{project.EntryID}</div></td>
                    <td><div>{project.ProjectTitle}</div></td>
                    <td><div>{project.ProjectDescription}</div></td>
                    <td><div>{project.NumberOfMembers}</div></td>
                    <td><div>{project.Sponsor}</div></td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
