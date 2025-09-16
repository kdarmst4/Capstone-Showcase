import React from "react";
import { useState } from "react";
import "./CSS/edit.css";
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
      const response = await fetch("http://localhost:5000/api/projects"); // Replace with your API endpoint
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
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
        <div className="edit-instructions">
          {submissionSelected && (
            <div className="admin-logout-shade edit-project-submission">
              <p>{submissionSelected.projectTitle}</p>
              <p
                className="edit-close-btn"
                onClick={() => setSubmissionSelected(null)}
              >
                X
              </p>
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
                <th>Project Desc</th>
                <th>Project Sponsor</th>
              </tr>
              <tr
                onClick={() => setSubmissionSelected({ projectTitle: "Linus" })}
              >
                <td>Emil</td>
                <td>Tobias</td>
                <td>Linus</td>
                <td>Linus</td>
                <td>Linus</td>
              </tr>
              <tr>
                <td>16</td>
                <td>14</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
