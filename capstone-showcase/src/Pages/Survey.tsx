import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Survey.css";

interface FormData {
  email: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  sponsor: string;
  numberOfTeamMembers: string;
  teamMemberNames: string;
  major: string;
  demo: string;
  power?: string;
  nda: string;
  youtubeLink: string;
  teamPicturePath?: string;
  posterPicturePath: string;

}

interface FormErrors {
  email: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  sponsor: string;
  numberOfTeamMembers: string;
  teamMemberNames: string;
  major: string;
  demo: string;
  power: string;
  nda: string;
  youtubeLink: string;
  teamPicturePath?: string;
  posterPicturePath?: string;
}

interface Project {
  project_id: string;
  project_title: string;
}

const Survey: React.FC = () => {
  const initialFormData: FormData = {
    email: "",
    name: "",
    projectTitle: "",
    projectDescription: "",
    sponsor: "",
    numberOfTeamMembers: "",
    teamMemberNames: "",
    major: "",
    demo: "",
    power: "",
    nda: "",
    youtubeLink: "",
    teamPicturePath: "",
    posterPicturePath: "",
  };

  const initialFormErrors: FormErrors = {
    email: "",
    name: "",
    projectTitle: "",
    projectDescription: "",
    sponsor: "",
    numberOfTeamMembers: "",
    teamMemberNames: "",
    major: "",
    demo: "",
    power: "",
    nda: "",
    youtubeLink: "",
    teamPicturePath: "",
    posterPicturePath: "",
  };

  

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  
  const navigate = useNavigate();



  useEffect(() => {
    // Fetch the list of projects from the backend API
    //fetch('https://asucapstone.com:3000/api/projects')
    fetch('http://localhost:3000/api/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);







  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement & {
        files: FileList;
      };
      setSelectedFile(fileInput.files[0]);
      console.log(`File selected: ${fileInput.files[0].name}`);
    } else {
      setFormData({ ...formData, [name]: value });
  
      if (name === "demo" && value === "no") {
        setFormData((prevFormData) => ({ ...prevFormData, power: "" }));
      }
  
      const selectedProjectId = e.target.value;

  // Finds the project based on selected project ID
  const project = projects.find(project => project.project_id === selectedProjectId);

  if (project) {
    const fullProjectName = `${project.project_id} - ${project.project_title}`;
    setSelectedProject(fullProjectName); // Set the full project name
  }
    }
  
    setErrors({ ...errors, [name]: "" });
    console.log(`Field: ${name}, Value: ${value}`);
  };

  
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateFormData(formData);
    setErrors(formErrors);
  
    if (hasErrors(formErrors)) {
      scrollToFirstError();
      return;
    }
  
    if (selectedFile) {
      const fileData = new FormData();
      // Ensure that selectedFile is defined and then append it to the FormData
      fileData.append("poster", selectedFile);
  
      axios
        .post("http://localhost:3000/api/survey/uploads", fileData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const uploadedPath = res.data.path;
  
          // Prevent async
          const updatedFormData = { ...formData, posterPicturePath: uploadedPath };
  

          const submissionData = prepareSubmissionData(updatedFormData);
  
          // Submit info with the uploaded file path
          axios
            .post("http://localhost:3000/api/survey", submissionData)
            .then(() => {
              handleSuccessfulSubmission();
            })
            .catch((error) => {
              console.error("Error submitting survey data:", error);
            });
        })
        .catch((error) => {
          console.error("Error submitting poster image:", error);
        });
    } else {
      console.error("No file selected!");
    }
  };

    const prepareSubmissionData = (formData: FormData) => {
      const submissionData = { ...formData };
      if (formData.demo === "no") {
        delete submissionData.power;
      }
      return submissionData;
    };
    

    
  

  const validateFormData = (formData: FormData) => {
    const {
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      numberOfTeamMembers,
      teamMemberNames,
      major,
      demo,
      nda,
      youtubeLink,
      posterPicturePath,
    } = formData;

    const errors: FormErrors = {
      email: !email ? "Please enter your ASU email." : "",
      name: !name ? "Please enter your name." : "",
      projectTitle: !projectTitle ? "Please select a project title." : "",
      projectDescription: !projectDescription
        ? "Please enter a project description."
        : "",
      sponsor: !sponsor ? "Please enter the name of your sponsor/mentor." : "",
      numberOfTeamMembers: !numberOfTeamMembers
        ? "Please enter the number of team members."
        : "",
      teamMemberNames: !teamMemberNames
        ? "Please enter the full names of all team members, including yourself, separated by commas."
        : "",
      major: !major ? "Please select a course number." : "",
      demo: !demo ? "Please specify if your group will be bringing a demo." : "",
      power: "",
      nda: !nda ? "Please specify if your group signed an NDA or IP." : "",
      youtubeLink: "",
    };

    if (!email.endsWith("@asu.edu")) {
      errors.email = "Please enter your ASU email.";
    }

    if (parseInt(numberOfTeamMembers, 10) <= 0) {
      errors.numberOfTeamMembers = "The number of team members must be at least 1.";
    }

    if (demo === "yes" && !formData.power) {
      errors.power =
        "Please specify if your group will need power for your demo.";
    }

    return errors;
  };

  const hasErrors = (errors: FormErrors) => {
    return Object.values(errors).some((error) => error !== "");
  };

  const scrollToFirstError = () => {
    const firstErrorElement = document.querySelector(".error-message");
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuccessfulSubmission = () => {
    setFormData(initialFormData);
    setSelectedFile(undefined);
    setIsSubmitted(true);

    //  setTimeout(() => {
    //    setIsSubmitted(false);
    //    navigate("/");
    //  }, 3000);
  };

  const handleCloseSuccessMessage = () => {
    setIsSubmitted(false);
    navigate("/");
  };

 
  return (
    <div className="form-container">
      {isSubmitted && (
        <div className="success-message">
          <p>Thank you for submitting your survey! Your responses have been recorded successfully.</p>
          <button onClick={handleCloseSuccessMessage} className="ok-button">OK</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1 className="form-title">Capstone Showcase Information Form</h1>
          <p className="form-description">
            Read all questions and descriptions carefully. If you encounter
            issues with this form that prohibit you from submitting accurate
            information, email{" "}
            <a href="mailto:showcasewebsite@asu.edu">
              {" "}
              showcasewebsite@asu.edu{" "}
            </a>
            with a detailed description of the problem.
          </p>
        </div>
        <div className="form-box">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-box">
          <label htmlFor="email">ASU Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-box">
          <label htmlFor="projectTitle">Project Title:</label>
          <select
            name="projectTitle"
            id="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
          >
            <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.project_id} value={project.project_id}>
              {project.project_id} {project.project_title} 
          </option>
            ))}
          </select>
          {errors.projectTitle && (
            <p className="error-message">{errors.projectTitle}</p>
          )}
        </div>
        <div className="form-box">
          <label htmlFor="projectDescription">
            Project Description (3 sentences max):
          </label>
          <textarea
            name="projectDescription"
            id="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
          />
          {errors.projectDescription && (
            <p className="error-message">{errors.projectDescription}</p>
          )}
        </div>
        <div className="form-box">
          <label htmlFor="sponsor">Sponsor/Mentor:</label>
          <input
            type="text"
            name="sponsor"
            id="sponsor"
            value={formData.sponsor}
            onChange={handleChange}
          />
          {errors.sponsor && <p className="error-message">{errors.sponsor}</p>}
        </div>
        <div className="form-box">
          <label htmlFor="numberOfTeamMembers">Number of Team Members:</label>
          <input
            type="number"
            name="numberOfTeamMembers"
            id="numberOfTeamMembers"
            value={formData.numberOfTeamMembers}
            onChange={handleChange}
          />
          {errors.numberOfTeamMembers && (
            <p className="error-message">{errors.numberOfTeamMembers}</p>
          )}
        </div>
        <div className="form-box">
          <label htmlFor="teamMemberNames">Team Members' Full Names:</label>
          <textarea
            name="teamMemberNames"
            id="teamMemberNames"
            value={formData.teamMemberNames}
            onChange={handleChange}
          />
          {errors.teamMemberNames && (
            <p className="error-message">{errors.teamMemberNames}</p>
          )}
        </div>
        <div className="form-box">
          <label htmlFor="major">Major:</label>
          <select
            name="major"
            id="major"
            value={formData.major}
            onChange={handleChange}
          >
            <option value="">Select a major</option>
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
          <small>
            * Note: Select Interdisciplinary if your team members are in
            different majors
          </small>
          {errors.major && (
            <p className="error-message">{errors.major}</p>
          )}
        </div>
        <div className="form-box">
          <label>
            Will your group be bringing a demo in addition to your poster?
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="demo"
                value="yes"
                checked={formData.demo === "yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="demo"
                value="no"
                checked={formData.demo === "no"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
          {errors.demo && <p className="error-message">{errors.demo}</p>}
        </div>
        {formData.demo === "yes" && (
          <div className="form-box">
            <label>If so, will your group need power for your demo?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="power"
                  value="yes"
                  checked={formData.power === "yes"}
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="power"
                  value="no"
                  checked={formData.power === "no"}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>
        )}
        <div className="form-box">
          <label>Did your group sign an NDA or IP?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="nda"
                value="yes"
                checked={formData.nda === "yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="nda"
                value="no"
                checked={formData.nda === "no"}
                onChange={handleChange}
              />{" "}
              No
               <div>
                {formData.nda === "no" && (
                  <div className="form-box-youtube">
                  <label htmlFor="youtubeLink">YouTube Video Link:</label>
                  <input
                    type="url"
                    name="youtubeLink"
                    id="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                  />
                  {errors.youtubeLink && (
                    <p className="error-message">{errors.youtubeLink}</p>
                  )}
                  </div>
              )}
              </div> 
              
                    <div className="content">
              <span className="title">Upload Your Poster Image</span>
              <p className="message">Select a file to upload from your computer or device.</p>

              <div className="image-upload">
                <label htmlFor="file" className="button upload-btn">
                  Choose File
                  <input 
                    type="file" 
                    id = "file"
                    hidden 
                    onChange={handleChange} 
                  />
                </label>
              </div>

              <div className="result">
                {selectedFile ? (
                  <div className="file-uploaded"><p>{selectedFile.name}</p></div>
                ) : (
                  <div className="file-uploaded"><p>No file selected</p></div>
                )}
              </div>
            </div>
            
            </label>
            {errors.nda && <p className="error-message">{errors.nda}</p>}
          </div>
        </div>
        <div className="form-box">
      
    </div>
        <div className="form-box">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default Survey;