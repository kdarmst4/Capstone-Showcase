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
  power?: string;
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
      youtubeLink: "",
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
            <option value="CS/E-001 - ABC Academy of Music - ABC Academy of Music • Custom Business Management Software">
              CS/E-001 - ABC Academy of Music - ABC Academy of Music • Custom
              Business Management Software
            </option>
            <option value="CS/E-002 - ABC Academy of Music - CLIENT SELF-MANAGEMENT • Hinna: Small Business Management Software">
              CS/E-002 - ABC Academy of Music - CLIENT SELF-MANAGEMENT • Hinna:
              Small Business Management Software
            </option>
            <option value="CS/E-003 - Ada Analytics - Website Development">
              CS/E-003 - Ada Analytics - Website Development
            </option>
            <option value="CS/E-004 - Alcove Ridge Consulting LLC - Unique experience to work on a cutting edge Fintech platform">
              CS/E-004 - Alcove Ridge Consulting LLC - Unique experience to work
              on a cutting edge Fintech platform
            </option>
            <option value="CS/E-005 - Allennials at Work Inc. - Apple API Development for Publishing a WordPress Digital Magazine">
              CS/E-005 - Allennials at Work Inc. - Apple API Development for
              Publishing a WordPress Digital Magazine
            </option>
            <option value="CS/E-006 - AOKMarketing.com - Chattable">
              CS/E-006 - AOKMarketing.com - Chattable
            </option>
            <option value="CS/E-007 - Arizona State University - Quantum Computing Tool for Education">
              CS/E-007 - Arizona State University - Quantum Computing Tool for
              Education
            </option>
            <option value="CS/E-008 - ASU - Smart Knowledge Navigation and Discovery Platform">
              CS/E-008 - ASU - Smart Knowledge Navigation and Discovery Platform
            </option>
            <option value="CS/E-009 - ASU Capstone Showcase">
              CS/E-009 - ASU Capstone Showcase
            </option>
            <option value="CS/E-010 - ASU ECEE - Logic Tutor for the Web Phase 2">
              CS/E-010 - ASU ECEE - Logic Tutor for the Web Phase 2
            </option>
            <option value="CS/E-011 - ASU SCAI - Web-Based RISC V Architecture Emulator in VIPLE Environment">
              CS/E-011 - ASU SCAI - Web-Based RISC V Architecture Emulator in
              VIPLE Environment
            </option>
            <option value="CS/E-012 - BetterEDU - BetterEDU">
              CS/E-012 - BetterEDU - BetterEDU
            </option>
            <option value="CS/E-013 - Bit Space Development">
              CS/E-013 - Bit Space Development
            </option>
            <option value="CS/E-014 - BizBridge.io - BizBridge: Building out an AI-Agentic Workflow to Sell Small Businesses!">
              CS/E-014 - BizBridge.io - BizBridge: Building out an AI-Agentic
              Workflow to Sell Small Businesses!
            </option>
            <option value="CS/E-015 - Capstone Project Submission Group - ASU">
              CS/E-015 - Capstone Project Submission Group - ASU
            </option>
            <option value="CS/E-016 - Capstone Project Ticketing System">
              CS/E-016 - Capstone Project Ticketing System
            </option>
            <option value="CS/E-017 - Carnival Guide - Carnival Guide">
              CS/E-017 - Carnival Guide - Carnival Guide
            </option>
            <option value="CS/E-018 - Center for Entrepreneurship and New Business Design - Housing Coordination">
              CS/E-018 - Center for Entrepreneurship and New Business Design -
              Housing Coordination
            </option>
            <option value="CS/E-019 - Coconut CubeSat Software - Student Project">
              CS/E-019 - Coconut CubeSat Software - Student Project
            </option>
            <option value="CS/E-020 - Contak - Kinda Famous: Music Adventure Role Playing Video Game">
              CS/E-020 - Contak - Kinda Famous: Music Adventure Role Playing
              Video Game
            </option>
            <option value="CS/E-021 - DigiClips - DEBUG OPTION EMAIL ALERTS FRONT END SEARCH ENGINE TESTING">
              CS/E-021 - DigiClips - DEBUG OPTION EMAIL ALERTS FRONT END SEARCH
              ENGINE TESTING
            </option>
            <option value="CS/E-022 - DigiClips - DigiClips Media Search Engine">
              CS/E-022 - DigiClips - DigiClips Media Search Engine
            </option>
            <option value="CS/E-023 - DigiClips - Media Search Engine - Team 1">
              CS/E-023 - DigiClips - Media Search Engine - Team 1
            </option>
            <option value="CS/E-024 - DigiClips - Media Search Engine - Team 2">
              CS/E-024 - DigiClips - Media Search Engine - Team 2
            </option>
            <option value="CS/E-025 - Expeditise - Website Development: Streamlining Access to Information and Services">
              CS/E-025 - Expeditise - Website Development: Streamlining Access
              to Information and Services
            </option>
            <option value="CS/E-026 - Favoland - AI-driven beauty ingredient database and rating system">
              CS/E-026 - Favoland - AI-driven beauty ingredient database and
              rating system
            </option>
            <option value="CS/E-027 - Fourcher Technologies - Tracking bees using AI">
              CS/E-027 - Fourcher Technologies - Tracking bees using AI
            </option>
            <option value="CS/E-028 - Fourcher Technologies - Using AR to simulate the visual symptoms of dementia">
              CS/E-028 - Fourcher Technologies - Using AR to simulate the visual
              symptoms of dementia
            </option>
            <option value="CS/E-029 - General Dynamics Mission Systems - Prototyping alternate GIS solutions for real-time scenarios">
              CS/E-029 - General Dynamics Mission Systems - Prototyping
              alternate GIS solutions for real-time scenarios
            </option>
            <option value="CS/E-030 - General Dynamics Mission Systems - Quantum Image Denoising using computational basis states">
              CS/E-030 - General Dynamics Mission Systems - Quantum Image
              Denoising using computational basis states
            </option>
            <option value="CS/E-031 - GLOBAL SENSOR SYSTEMS INC - Trade Show Display">
              CS/E-031 - GLOBAL SENSOR SYSTEMS INC - Trade Show Display
            </option>
            <option value="CS/E-032 - Hawkeye Early Detection System - Hawkeye Early Detection System">
              CS/E-032 - Hawkeye Early Detection System - Hawkeye Early
              Detection System
            </option>
            <option value="CS/E-033 - Honeywell International - Adaptive Announcement System">
              CS/E-033 - Honeywell International - Adaptive Announcement System
            </option>
            <option value="CS/E-034 - Honeywell International - Build a block chain-based solution for UAM Data management.">
              CS/E-034 - Honeywell International - Build a block chain-based
              solution for UAM Data management.
            </option>
            <option value="CS/E-035 - Honeywell International - CICT Code migration from Visual Basic to Python using Gen AI">
              CS/E-035 - Honeywell International - CICT Code migration from
              Visual Basic to Python using Gen AI
            </option>
            <option value="CS/E-036 - InnC LLC - ArtVision Renderer">
              CS/E-036 - InnC LLC - ArtVision Renderer
            </option>
            <option value="CS/E-037 - InnC LLC - ArtVision Visualizer">
              CS/E-037 - InnC LLC - ArtVision Visualizer
            </option>
            <option value="CS/E-038 - IT Partner LLC.-Software Development - Licensing Recommendation Tool for Microsoft 365">
              CS/E-038 - IT Partner LLC.-Software Development - Licensing
              Recommendation Tool for Microsoft 365
            </option>
            <option value="CS/E-039 - Jo Clark, CEO - Circle.ooo AI Initiative">
              CS/E-039 - Jo Clark, CEO - Circle.ooo AI Initiative
            </option>
            <option value="CS/E-040 - Judy.ai - Judy.ai for Healthcare">
              CS/E-040 - Judy.ai - Judy.ai for Healthcare
            </option>
            <option value="CS/E-041 - KnowQuest Inc. - Web or Native App UI/UX Development">
              CS/E-041 - KnowQuest Inc. - Web or Native App UI/UX Development
            </option>
            <option value="CS/E-042 - Local Grow Salads - Agronomist">
              CS/E-042 - Local Grow Salads - Agronomist
            </option>
            <option value="CS/E-043 - Local Grow Salads - Assembly">
              CS/E-043 - Local Grow Salads - Assembly
            </option>
            <option value="CS/E-044 - Local Grow Salads - Director">
              CS/E-044 - Local Grow Salads - Director
            </option>
            <option value="CS/E-045 - Local Grow Salads - Grower">
              CS/E-045 - Local Grow Salads - Grower
            </option>
            <option value="CS/E-046 - Local Grow Salads - Inspector">
              CS/E-046 - Local Grow Salads - Inspector
            </option>
            <option value="CS/E-047 - Local Grown Salads - LGS EcoSystem - Network">
              CS/E-047 - Local Grown Salads - LGS EcoSystem - Network
            </option>
            <option value="CS/E-048 - Local Grown Salads - LGS EcoSystem Customer Layer">
              CS/E-048 - Local Grown Salads - LGS EcoSystem Customer Layer
            </option>
            <option value="CS/E-049 - Lotus - Addiction Therapy Inc - web / mobile development">
              CS/E-049 - Lotus - Addiction Therapy Inc - web / mobile
              development
            </option>
            <option value="CS/E-050 - Lotus Addiction Therapy Inc - Lotus">
              CS/E-050 - Lotus Addiction Therapy Inc - Lotus
            </option>
            <option value="CS/E-051 - Lower 22 Foundation Inc - Foxhole Lounge Mobile App Redesign">
              CS/E-051 - Lower 22 Foundation Inc - Foxhole Lounge Mobile App
              Redesign
            </option>
            <option value="CS/E-052 - Naralytics - iOS / Android App New Features">
              CS/E-052 - Naralytics - iOS / Android App New Features
            </option>
            <option value="CS/E-053 - Naralytics - Mobile App Re-Design (React Native)">
              CS/E-053 - Naralytics - Mobile App Re-Design (React Native)
            </option>
            <option value="CS/E-054 - Naralytics - NLP & Classification Model Optimization">
              CS/E-054 - Naralytics - NLP & Classification Model Optimization
            </option>
            <option value="CS/E-055 - Northrop Grumman - Finance Reporting Tool">
              CS/E-055 - Northrop Grumman - Finance Reporting Tool
            </option>
            <option value="CS/E-056 - Nowhere Collective - A Circular Marketplace for Upcycling Makers and Conscious Consumers">
              CS/E-056 - Nowhere Collective - A Circular Marketplace for
              Upcycling Makers and Conscious Consumers
            </option>
            <option value="CS/E-057 - Ofori - Enhancing Ofori's Website and Expanding Services">
              CS/E-057 - Ofori - Enhancing Ofori's Website and Expanding
              Services
            </option>
            <option value="CS/E-058 - Omega Pediatrics - Mobile Messaging App for Doctors - AWS/ReactNative/DynamoDB">
              CS/E-058 - Omega Pediatrics - Mobile Messaging App for Doctors -
              AWS/ReactNative/DynamoDB
            </option>
            <option value="CS/E-059 - OneDrug Inc. - Smart Mobile and Web Health Application for Integrated Healthcare">
              CS/E-059 - OneDrug Inc. - Smart Mobile and Web Health Application
              for Integrated Healthcare
            </option>
            <option value="CS/E-060 - Pathscape - Pathscape Mobile App Development">
              CS/E-060 - Pathscape - Pathscape Mobile App Development
            </option>
            <option value="CS/E-061 - Personal Project - Works for Northrop Grumman Corp - Digital Video Manipulation">
              CS/E-061 - Personal Project - Works for Northrop Grumman Corp -
              Digital Video Manipulation
            </option>
            <option value="CS/E-062 - Points Africa - Points Africa Mobile App Development">
              CS/E-062 - Points Africa - Points Africa Mobile App Development
            </option>
            <option value="CS/E-063 - Prescott Electric Motors - Electric Motor Monitoring System">
              CS/E-063 - Prescott Electric Motors - Electric Motor Monitoring
              System
            </option>
            <option value="CS/E-064 - QuestStone LLC. - Slack App + Microsoft Teams App Development">
              CS/E-064 - QuestStone LLC. - Slack App + Microsoft Teams App
              Development
            </option>
            <option value="CS/E-065 - Reality Articulated - Empath-Dashboard">
              CS/E-065 - Reality Articulated - Empath-Dashboard
            </option>
            <option value="CS/E-066 - Reality Articulated - Empath-iOS">
              CS/E-066 - Reality Articulated - Empath-iOS
            </option>
            <option value="CS/E-067 - Rock Climbing Routemaking AI - Student Project">
              CS/E-067 - Rock Climbing Routemaking AI - Student Project
            </option>
            <option value="CS/E-068 - SCAI - ASU Capstone Judging Application">
              CS/E-068 - SCAI - ASU Capstone Judging Application
            </option>
            <option value="CS/E-069 - SCAI - ASU Capstone Time Management">
              CS/E-069 - SCAI - ASU Capstone Time Management
            </option>
            <option value="CS/E-070 - School of Computing and Augmented Intelligence - Interactive 3D Data Analytics Learning Environment">
              CS/E-070 - School of Computing and Augmented Intelligence -
              Interactive 3D Data Analytics Learning Environment
            </option>
            <option value="CS/E-071 - School of Computing and Augmented Intelligence - Smart Sound-to-Speech Interpreter for Security and Notification Systems">
              CS/E-071 - School of Computing and Augmented Intelligence - Smart
              Sound-to-Speech Interpreter for Security and Notification Systems
            </option>
            <option value="CS/E-072 - School of Geog Science & Urban Planning, ASU - Automated Detection of Traffic and Street Environments">
              CS/E-072 - School of Geog Science & Urban Planning, ASU -
              Automated Detection of Traffic and Street Environments
            </option>
            <option value="CS/E-073 - Self Justice Inc. - WordPress Website Development">
              CS/E-073 - Self Justice Inc. - WordPress Website Development
            </option>
            <option value="CS/E-074 - Sense Science Lab LTD - Human AI Collaborative Drawing Tool Development">
              CS/E-074 - Sense Science Lab LTD - Human AI Collaborative Drawing
              Tool Development
            </option>
            <option value="CS/E-075 - Shoptaki - CEO">
              CS/E-075 - Shoptaki - CEO
            </option>
            <option value="CS/E-076 - Shoptaki - Smartchain next evolution of distributed network">
              CS/E-076 - Shoptaki - Smartchain next evolution of distributed
              network
            </option>
            <option value="CS/E-077 - Shoptaki - Smartid universal identity">
              CS/E-077 - Shoptaki - Smartid universal identity
            </option>
            <option value="CS/E-078 - StayWell - StayWell Medical Habit Tracker Mobile App">
              CS/E-078 - StayWell - StayWell Medical Habit Tracker Mobile App
            </option>
            <option value="CS/E-079 - Table Ready - AI-enhanced social media post generator and Infra Red seating detection system">
              CS/E-079 - Table Ready - AI-enhanced social media post generator
              and Infra Red seating detection system
            </option>
            <option value="CS/E-080 - Tech Diversified - MARS Mobile Addiction Recovery System">
              CS/E-080 - Tech Diversified - MARS Mobile Addiction Recovery
              System
            </option>
            <option value="CS/E-081 - The Clean Divorce - Use technology to simplify & modernize divorce to support families">
              CS/E-081 - The Clean Divorce - Use technology to simplify &
              modernize divorce to support families
            </option>
            <option value="CS/E-082 - Toyz Electronics - Game Developer for Online Learning Platform">
              CS/E-082 - Toyz Electronics - Game Developer for Online Learning
              Platform
            </option>
            <option value="CS/E-083 - VariableAI - VariableAI - Data Team">
              CS/E-083 - VariableAI - VariableAI - Data Team
            </option>
            <option value="CS/E-084 - VariableAI - VariableAI - Full Stack Team">
              CS/E-084 - VariableAI - VariableAI - Full Stack Team
            </option>
            <option value="CS/E-085 - VariableAI - VariableAI - Group A">
              CS/E-085 - VariableAI - VariableAI - Group A
            </option>
            <option value="CS/E-086 - VariableAI - VariableAI - Model Team">
              CS/E-086 - VariableAI - VariableAI - Model Team
            </option>
            <option value="CS/E-087 - Velocified - Lean Enterprise LMS & Tracking Platform">
              CS/E-087 - Velocified - Lean Enterprise LMS & Tracking Platform
            </option>
            <option value="CS/E-088 - Velocity Tech Inc. - Zinio TalentHub">
              CS/E-088 - Velocity Tech Inc. - Zinio TalentHub
            </option>
            <option value="CS/E-089 - Yanbor LLC - Develop testing system for the site OUReports.com">
              CS/E-089 - Yanbor LLC - Develop testing system for the site
              OUReports.com
            </option>
            <option value="IEE-001 - Goodyear 1: COI">
              IEE-001 - Goodyear 1: COI
            </option>
            <option value="IEE-002 - Goodyear 2: TraCtion">
              IEE-002 - Goodyear 2: TraCtion
            </option>
            <option value="IEE-003 - Goodyear 3: Process Modeling">
              IEE-003 - Goodyear 3: Process Modeling
            </option>
            <option value="IEE-004 - Abbott: Equipment Changeover">
              IEE-004 - Abbott: Equipment Changeover
            </option>
            <option value="IEE-005 - L3Harris: Power Supply">
              IEE-005 - L3Harris: Power Supply
            </option>
            <option value="IEE-006 - ASU Athletics 1: Readiness Score">
              IEE-006 - ASU Athletics 1: Readiness Score
            </option>
            <option value="IEE-007 - ASU Athletics 2: Data Analysis">
              IEE-007 - ASU Athletics 2: Data Analysis
            </option>
            <option value="IEE-008 - ASU Earth and Space: Social Media">
              IEE-008 - ASU Earth and Space: Social Media
            </option>
            <option value="IEE-009 - ASU Earth and Space: Exhibit Planning">
              IEE-009 - ASU Earth and Space: Exhibit Planning
            </option>
            <option value="IEE-010 - Amkor Material Cost Estimator">
              IEE-010 - Amkor Material Cost Estimator
            </option>
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
            </label>
            {errors.nda && <p className="error-message">{errors.nda}</p>}
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
