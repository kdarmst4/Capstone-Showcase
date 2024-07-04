import React, { useState } from "react";
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

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">Capstone Showcase Information Form</h1>
        <p className="form-description">
          Read all questions and descriptions carefully. If you encounter issues
          with this form that prohibit you from submitting accurate information,
          email showcasewebsite@asu.edu with a detailed description of the
          problem.
        </p>
      </div>
      <div className="form-box">
        <label>ASU Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Project Title:</label>
        <select
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
        >
          <option value="">Select a project</option>
          <option value="Project 1">Project 1</option>
          <option value="Project 2">Project 2</option>
        </select>
      </div>
      <div className="form-box">
        <label>Project Description:</label>
        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Sponsor/Mentor:</label>
        <input
          type="text"
          name="sponsor"
          value={formData.sponsor}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Number of Team Members:</label>
        <input
          type="number"
          name="teamMembers"
          value={formData.teamMembers}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Course Number:</label>
        <select
          name="courseNumber"
          value={formData.courseNumber}
          onChange={handleChange}
        >
          <option value="">Select a course</option>
          <option value="Course 1">Course 1</option>
          <option value="Course 2">Course 2</option>
        </select>
      </div>
      <div className="form-box">
        <label>
          Will your group be bringing a demo in addition to your poster?
        </label>
        <div>
          <input
            type="radio"
            name="demo"
            value="yes"
            checked={formData.demo === "yes"}
            onChange={handleChange}
          />{" "}
          Yes
          <input
            type="radio"
            name="demo"
            value="no"
            checked={formData.demo === "no"}
            onChange={handleChange}
          />{" "}
          No
        </div>
      </div>
      <div className="form-box">
        <label>If so, will your group need power for your demo?</label>
        <div>
          <input
            type="radio"
            name="power"
            value="yes"
            checked={formData.power === "yes"}
            onChange={handleChange}
          />{" "}
          Yes
          <input
            type="radio"
            name="power"
            value="no"
            checked={formData.power === "no"}
            onChange={handleChange}
          />{" "}
          No
        </div>
      </div>
      <div className="form-box">
        <label>Did your group sign an NDA or IP?</label>
        <div>
          <input
            type="radio"
            name="nda"
            value="yes"
            checked={formData.nda === "yes"}
            onChange={handleChange}
          />{" "}
          Yes
          <input
            type="radio"
            name="nda"
            value="no"
            checked={formData.nda === "no"}
            onChange={handleChange}
          />{" "}
          No
        </div>
      </div>
      <div className="form-box">
        <label>YouTube Video Link:</label>
        <input
          type="url"
          name="youtubeLink"
          value={formData.youtubeLink}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Survey;
