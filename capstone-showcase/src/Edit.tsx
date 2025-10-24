import { useState, useEffect } from "react";
import "./CSS/edit.css";
import EditProject from "./EditProject";
import { TodaysDate } from "./AdminDate";
import {ProjectObj} from "./SiteInterface";

export function Edit() {
  const [presentationEdit, setPresentationEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    semester:
      new Date().getMonth() < 5
        ? "spring"
        : new Date().getMonth() < 8
        ? "summer"
        : "fall",
    year: new Date().getFullYear().toString(),
    department: "All",
  });
  const [editpresentationData, setEditPresentationData] = useState({
    presentationDate: new Date().toISOString().split("T")[0],
    presentationLocation: "Memorial Union - Second floor",
    checkingTime: "",
    presentationTime: "",
    presentationFile: null as File | null,
  });
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );
  const [projects, setProjects] = useState<ProjectObj[]>([]);
  const [submissionSelected, setSubmissionSelected] = useState(null);
  const API_BASE_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";
  // const STATIC_BASE_URL =
  //  process.env.NODE_ENV === 'production' ? "" : 'http://localhost:3000'

  const fetchProjects = async (semester: string, year: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/${semester}/${year}`
      );
      const data = await response.json();
      setProjects(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSelectionClose = (selection: Map<String, String> | null | undefined) => {
      setSubmissionSelected(null);
      console.log("Selection closed with:", selection);
      if (selection) {
        setProjects((prevProjects) =>
          prevProjects.map((proj: ProjectObj) => {
            const entryId = selection.get("EntryID");
            if (entryId !== undefined && proj.EntryID === +entryId) {
              return { ...proj, ...Object.fromEntries(selection) };
            }
            return proj;
          })
        );
      }
    };

  useEffect(() => {
    const { year: curr_year, semester } = TodaysDate();

    fetchProjects(semester, curr_year);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const handlePresentationInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    
    if (name === 'location-file' && files && files[0]) {
      setEditPresentationData((prevData) => ({
        ...prevData,
        presentationFile: files[0]
      }));
    } else {
      setEditPresentationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    
    console.log(editpresentationData);
  };
  const handlePresentationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("Form submitted with data:", editpresentationData);
    
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('presentationDate', editpresentationData.presentationDate);
      formData.append('presentationLocation', editpresentationData.presentationLocation);
      formData.append('checkingTime', editpresentationData.checkingTime);
      formData.append('presentationTime', editpresentationData.presentationTime);
      
      // Only append file if one was selected
      if (editpresentationData.presentationFile) {
        formData.append('presentationFile', editpresentationData.presentationFile);
      }
      
      const res = await fetch(`${API_BASE_URL}/presentation/update`, {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      console.log(data);
      
      if (res.status === 200) {
        alert('Presentation updated successfully!');
      }
      else 
      {
        console.log(data);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      alert('Error updating presentation');
    }
  };
  const fetchSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    const { semester, year } = formData;

    let semesterCode = semester;
    if (semester === "spring") semesterCode = "sp";
    else if (semester === "summer") semesterCode = "su";
    else if (semester === "fall") semesterCode = "fa";

    // Use current values or defaults
    const finalSemester = semester === "all" || !semester ? "fa" : semesterCode;
    const finalYear =
      year === "all" || !year ? new Date().getFullYear() : parseInt(year);

    console.log("Fetching projects for:", finalSemester, finalYear);

    try {
      await fetchProjects(finalSemester, finalYear);
      console.log("Projects fetched successfully");
    } catch (error) {
      console.error("Error in form submission:", error);
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
            <form
              className="update_presentation-details"
              onSubmit={handlePresentationSubmit}
            >
              <span>
                <label htmlFor="presentation-date">Presentation Date:</label>
                <input
                  type="date"
                  id="presentation-date"
                  name="presentationDate"
                  value={editpresentationData.presentationDate}
                  onChange={handlePresentationInputChange}
                />
              </span>
              <span>
                <label htmlFor="presentation-location">
                  Presentation Location:
                </label>
                <input
                  type="text"
                  id="presentation-location"
                  name="presentationLocation"
                  value={editpresentationData.presentationLocation}
                  onChange={handlePresentationInputChange}
                />
              </span>
              <span>
                <label htmlFor="checking-time">Checking Time:</label>
                <input
                  type="time"
                  id="checking-time"
                  name="checkingTime"
                  value={editpresentationData.checkingTime}
                  onChange={handlePresentationInputChange}
                />
              </span>
              <span>
                <label htmlFor="presentation-time">Presentation Time:</label>
                <input
                  type="time"
                  id="presentation-time"
                  name="presentationTime"
                  value={editpresentationData.presentationTime}
                  onChange={handlePresentationInputChange}
                />
              </span>
              <span>
                <label htmlFor="location-file">Location:</label>
                <input
                  type="file"
                  id="location-file"
                  name="location-file"
                  placeholder="Enter location"
                  onChange={handlePresentationInputChange}
                />
              </span>
              <button type="submit" className="form-button">
                Update Presentation
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          className={`edit-instructions ${
            submissionSelected ? "no-scroll" : ""
          }`}
        >
          {submissionSelected && (
            <div className="edit-project-submission">
              <EditProject
                project={submissionSelected}
                closeFunc={(changeMap?: Map<string, string> | null | undefined) => handleSelectionClose(changeMap)}
              />
            </div>
          )}
          <form className="edit-form" onSubmit={fetchSubmission}>
            <span>
              <label htmlFor="semester">Semester:</label>
              <select
                name="semester"
                id="semester"
                value={formData.semester}
                onChange={handleInputChange}
              >
                <option value="all">All</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
              </select>
            </span>
            <span>
              <label htmlFor="year">Year:</label>
              <select
                name="year"
                id="year"
                value={formData.year}
                onChange={handleInputChange}
              >
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
              <select
                name="department"
                id="department"
                onChange={handleInputChange}
                value={formData.department}
              >
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
              <button
                type="button"
                className="form-button"
                onClick={() => {
                  setFormData({ semester: "", year: "", department: "" });
                  const { year, semester } = TodaysDate();
                  fetchProjects(semester, year);
                }}
              >
                Clear Filters
              </button>
            </div>
          </form>

          <div className="edit-submission-table">
            {/* Table of submissions will go here */}
            <table>
              <thead>
                <tr>
                  <th>EntryId</th>
                  <th>Project Title</th>
                  <th>Project Desc</th>
                  <th>Member Count</th>
                  <th>Project Sponsor</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project: any) => (
                  <tr
                    key={project.EntryID}
                    onClick={() => setSubmissionSelected(project)}
                  >
                    <td>
                      <div>{project.EntryID}</div>
                    </td>
                    <td>
                      <div>{project.ProjectTitle}</div>
                    </td>
                    <td>
                      <div>{project.ProjectDescription}</div>
                    </td>
                    <td>
                      <div>{project.NumberOfMembers}</div>
                    </td>
                    <td>
                      <div>{project.Sponsor}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
