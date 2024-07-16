import React, { useState } from "react";
import axios from 'axios';
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Log form data before submission
    axios.post('http://localhost:3000/api/survey', formData)
      .then(response => {
        console.log('Survey data submitted successfully:', response.data);
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
      .catch(error => {
        console.error('Error submitting survey data:', error);
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
        </div>
        <div className="form-box">
          <label htmlFor="projectDescription">Project Description:</label>
          <textarea
            name="projectDescription"
            id="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
          />
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
            * Note: Select diverse majors if your team members are in different majors
          </small>
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
        </div>
        <div className="form-box">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
