import React, { useState } from "react";
import axios from "axios";
import "../CSS/Survey.css";

const Survey: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    projectTitle: "",
    projectDescription: "",
    sponsor: "",
    teamMembers: "",
    courseNumber: "",
    demo: "",
    power: "",
    nda: "",
    youtubeLink: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    projectTitle: "",
    projectDescription: "",
    sponsor: "",
    teamMembers: "",
    courseNumber: "",
    demo: "",
    power: "",
    nda: "",
    youtubeLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      teamMembers,
      courseNumber,
      demo,
      power,
      nda,
      youtubeLink,
    } = formData;

    const formErrors = {
      email: "",
      name: "",
      projectTitle: "",
      projectDescription: "",
      sponsor: "",
      teamMembers: "",
      courseNumber: "",
      demo: "",
      power: "",
      nda: "",
      youtubeLink: "",
    };

    if (!email) formErrors.email = "Please enter your ASU email.";
    if (!name) formErrors.name = "Please enter your name.";
    if (!projectTitle)
      formErrors.projectTitle = "Please select a project title.";
    if (!projectDescription)
      formErrors.projectDescription = "Please enter a project description.";
    if (!sponsor)
      formErrors.sponsor = "Please enter the name of your sponsor/mentor.";
    if (!teamMembers)
      formErrors.teamMembers = "Please enter the number of team members.";
    if (parseInt(teamMembers, 10) <= 0)
      formErrors.teamMembers = "The number of team members must be at least 1.";
    if (!courseNumber)
      formErrors.courseNumber = "Please select a course number.";
    if (!demo)
      formErrors.demo = "Please specify if your group will be bringing a demo.";
    if (!power)
      formErrors.power =
        "Please specify if your group will need power for your demo.";
    if (!nda)
      formErrors.nda = "Please specify if your group signed an NDA or IP.";
    if (!youtubeLink) formErrors.youtubeLink = "Please enter a YouTube link.";

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    if (hasErrors) {
      const firstErrorElement = document.querySelector(".error-message");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    axios
      .post("http://localhost:3000/api/survey", formData)
      .then(() => {
        setFormData({
          email: "",
          name: "",
          projectTitle: "",
          projectDescription: "",
          sponsor: "",
          teamMembers: "",
          courseNumber: "",
          demo: "",
          power: "",
          nda: "",
          youtubeLink: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting survey data:", error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1 className="form-title">Capstone Showcase Information Form</h1>
          <p className="form-description">
            Read all questions and descriptions carefully. If you encounter
            issues with this form that prohibit you from submitting accurate
            information, email showcasewebsite@asu.edu with a detailed
            description of the problem.
          </p>
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
          <label htmlFor="projectDescription">Project Description:</label>
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
          <label htmlFor="courseNumber">Course Number:</label>
          <select
            name="courseNumber"
            id="courseNumber"
            value={formData.courseNumber}
            onChange={handleChange}
          >
            <option value="">Select a course</option>
            <option value="CSE 486">CSE 486</option>
            <option value="CSE 424">CSE 424</option>
            <option value="IEE 486">IEE 486</option>
            <option value="Diverse majors">Diverse majors</option>
          </select>
          <small>
            * Note: Select diverse majors if your team members are in different
            majors
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
          {errors.power && <p className="error-message">{errors.power}</p>}
        </div>
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
          <label htmlFor="youtubeLink">YouTube Link:</label>
          <input
            type="text"
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
