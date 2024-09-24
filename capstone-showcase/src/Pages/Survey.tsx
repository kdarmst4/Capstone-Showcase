import React, { useState } from "react";
import axios from "axios";
import "../CSS/Survey.css";

interface FormData {
  email: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  sponsor: string;
  teamMembers: string;
  teamMemberNames: string;
  courseNumber: string;
  demo: string;
  power: string;
  nda: string;
  youtubeLink: string;
}

interface FormErrors {
  email: string;
  name: string;
  projectTitle: string;
  projectDescription: string;
  sponsor: string;
  teamMembers: string;
  teamMemberNames: string;
  courseNumber: string;
  demo: string;
  power: string;
  nda: string;
  youtubeLink: string;
}

const Survey: React.FC = () => {
  const initialFormData: FormData = {
    email: "",
    name: "",
    projectTitle: "",
    projectDescription: "",
    sponsor: "",
    teamMembers: "",
    teamMemberNames: "",
    courseNumber: "",
    demo: "",
    power: "",
    nda: "",
    youtubeLink: "",
  };

  const initialFormErrors: FormErrors = {
    email: "",
    name: "",
    projectTitle: "",
    projectDescription: "",
    sponsor: "",
    teamMembers: "",
    teamMemberNames: "",
    courseNumber: "",
    demo: "",
    power: "",
    nda: "",
    youtubeLink: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "demo" && value === "no") {
      setFormData((prevFormData) => ({ ...prevFormData, power: "" }));
    }

    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateFormData(formData);
    setErrors(formErrors);

    if (hasErrors(formErrors)) {
      scrollToFirstError();
      return;
    }

    const submissionData = prepareSubmissionData(formData);

    axios
      .post("http://localhost:3000/api/survey", submissionData)
      .then(() => {
        handleSuccessfulSubmission();
      })
      .catch((error) => {
        console.error("Error submitting survey data:", error);
      });
  };

  const validateFormData = (formData: FormData) => {
    const {
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      teamMembers,
      teamMemberNames,
      courseNumber,
      demo,
      nda,
      youtubeLink,
    } = formData;

    const errors: FormErrors = {
      email: !email ? "Please enter your ASU email." : "",
      name: !name ? "Please enter your name." : "",
      projectTitle: !projectTitle ? "Please select a project title." : "",
      projectDescription: !projectDescription
        ? "Please enter a project description."
        : "",
      sponsor: !sponsor ? "Please enter the name of your sponsor/mentor." : "",
      teamMembers: !teamMembers
        ? "Please enter the number of team members."
        : "",
      teamMemberNames: !teamMemberNames
        ? "Please enter the full names of all team members, including yourself, separated by commas."
        : "",
      courseNumber: !courseNumber ? "Please select a course number." : "",
      demo: !demo
        ? "Please specify if your group will be bringing a demo."
        : "",
      power: "",
      nda: !nda ? "Please specify if your group signed an NDA or IP." : "",
      youtubeLink: !youtubeLink ? "Please enter a YouTube link." : "",
    };

    if (parseInt(teamMembers, 10) <= 0) {
      errors.teamMembers = "The number of team members must be at least 1.";
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

  const prepareSubmissionData = (formData: FormData) => {
    const submissionData = { ...formData };
    if (formData.demo === "no") {
      delete submissionData.power;
    }
    return submissionData;
  };

  const handleSuccessfulSubmission = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="form-container">
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
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
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
          <label htmlFor="teamMembers">Number of Team Members:</label>
          <input
            type="number"
            name="teamMembers"
            id="teamMembers"
            value={formData.teamMembers}
            onChange={handleChange}
          />
          {errors.teamMembers && (
            <p className="error-message">{errors.teamMembers}</p>
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
          <label htmlFor="courseNumber">Major:</label>
          <select
            name="courseNumber"
            id="courseNumber"
            value={formData.courseNumber}
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
          {errors.courseNumber && (
            <p className="error-message">{errors.courseNumber}</p>
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
            </div>{" "}
            {errors.power && <p className="error-message">{errors.power}</p>}
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
            </label>
          </div>
          {errors.nda && <p className="error-message">{errors.nda}</p>}
        </div>
        <div className="form-box">
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
