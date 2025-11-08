import React, { useEffect,useState, useRef } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
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
  power ? : string;
  nda: string;
  posterApproved ?: string;
  attendance: string;
  zoomLink ?: string;
  youtubeLink ?: string;
  teamPicturePath ?:string;
  posterPicturePath ?: string;
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
  posterApproved: string;
  attendance: string;
  zoomLink ?: string;
  youtubeLink: string;
  teamPicturePath ?: string;
  posterPicturePath ?: string;
  captcha: string;
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
        posterApproved: "",
        attendance: "",
        zoomLink: "",
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
        posterApproved: "",
        attendance: "",
        zoomLink: "",
        youtubeLink: "",
        teamPicturePath: "",
        posterPicturePath: "",
        captcha: "",
    };
    const [formData, setFormData] = useState < FormData > (initialFormData);
    const [errors, setErrors] = useState < FormErrors > (initialFormErrors);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState < File | undefined > ();
    const [projects, setProjects] = useState < Project[] > ([]);
    const [, setSelectedProject] = useState < string > ('');
    const [contentTeamFiles, setContentTeamFiles] = useState<File[]>([]);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    
    const RECAPTCHA_SITE_KEY = "6Lc6ZvErAAAAAI0phQR-AzbJIcalP2Uc9daTksKn";
    

    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch the list of projects from the backend API
        fetch('https://asucapstone.com:3000/api/projects')
        // fetch('http://localhost:3000/api/projects')
        .then((response) => 
            response.json()).then((data) =>
            setProjects(data)).catch((error) => 
            console.error('Error fetching projects:', error));
    }, []);


    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
    
      if (type === "file") {
        const fileInput = e.target as HTMLInputElement & { files: FileList };
    
        // Handling different file inputs based on 'name'
        if (name === "poster" && fileInput.files.length > 0) {
          // Handling single file input for poster
          setSelectedFile(fileInput.files[0]);
          console.log(`Poster file selected: ${fileInput.files[0].name}`);
        } else if (name === "contentTeam" && fileInput.files.length > 0) {
          // Handling multiple file input for team photos
          const selectedFiles = Array.from(fileInput.files);
          setContentTeamFiles((prevFiles) => {
            const existingNames = new Set(prevFiles.map(f => f.name));
            const newFiles = selectedFiles.filter(f => !existingNames.has(f.name));
            return [...prevFiles, ...newFiles];
          });
          console.log("Team headshots selected:", selectedFiles.map(file => file.name));
        }
      } else {
        // Handling non-file inputs
        setFormData({ ...formData, [name]: value });
    
        if (name === "demo" && value === "no") {
          setFormData((prevFormData) => ({ ...prevFormData, power: "" }));
        }
    
        const selectedProjectId = e.target.value;
        const project = projects.find((project) => project.project_id === selectedProjectId);
        
        if (project) {
          const fullProjectName = `${project.project_id} - ${project.project_title}`;
          setSelectedProject(fullProjectName);
        }
      }
    
      // Clear error for this field
      setErrors({ ...errors, [name]: "" });
      console.log(`Field: ${name}, Value: ${value}`);
    };
      
    const handleCaptchaChange = (token: string | null) => {
      setCaptchaToken(token);
      setErrors({ ...errors, captcha: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted");
    
      const formErrors = validateFormData(formData);
      setErrors(formErrors);
    
      if (hasErrors(formErrors)) {
        scrollToFirstError();
        return;
      }

      if (!captchaToken) {
        setErrors({ ...formErrors, captcha: "Please complete the reCAPTCHA verification." });
        scrollToFirstError();
        return;
      }
      console.log("Calling API");
      try {
        console.log("here1")
        let posterPath = "";
        let teamImagePaths: string[] = [];
    
       
        if (selectedFile) {
          const posterData = new FormData();
          posterData.append("poster", selectedFile);

          // const posterRes = await axios.post("http://localhost:3000/api/survey/uploadsPoster", posterData, {
           const posterRes = await axios.post("https://asucapstone.com:3000/api/survey/uploadsPoster", posterData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          posterPath = posterRes.data.path;
        }
    
        
        if (contentTeamFiles.length > 0) {
          const teamData = new FormData();
          contentTeamFiles.forEach(file => {
            teamData.append("contentTeamFiles", file); 
          });
          
          // const teamRes = await axios.post("http://localhost:3000/api/survey/uploadsTeam", teamData, {
           const teamRes = await axios.post("https://asucapstone.com:3000/api/survey/uploadsTeam", teamData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          teamImagePaths = teamRes.data.paths;
        }
    
        
        const updatedFormData = {
          ...formData,
          posterPicturePath: posterPath,
          teamPicturePath: teamImagePaths.join(", "), 
        };
    
        const submissionData = prepareSubmissionData(updatedFormData, captchaToken);
    
        // Final survey data submission
        // await axios.post("http://localhost:3000/api/survey", submissionData);
         await axios.post("https://asucapstone.com:3000/api/survey", submissionData);
    
        handleSuccessfulSubmission();
      } catch (error) {
        console.error("Error during form submission:", error);
        setCaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        alert("An error occurred while submitting. Please try again.");
      }
    };
    const prepareSubmissionData = (formData: FormData, captchaToken: string | null) => {
        const submissionData: any = {
            ...formData,
            captchaToken: captchaToken
        };
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
        attendance,
        posterApproved,
        youtubeLink,
      } = formData;
    
      const errors: FormErrors = {
        email: !email ? "Please enter your ASU email." : "",
        name: !name ? "Please enter your name." : "",
        projectTitle: !projectTitle ? "Please select a project title." : "",
        projectDescription: !projectDescription ? "Please enter a project description." : "",
        sponsor: !sponsor ? "Please enter the name of your sponsor/mentor." : "",
        numberOfTeamMembers: !numberOfTeamMembers ? "Please enter the number of team members." : "",
        teamMemberNames: !teamMemberNames ? "Please enter the full names of all team members, including yourself, separated by commas." : "",
        major: !major ? "Please select a course number." : "",
        demo: !demo ? "Please specify if your group will be bringing a demo." : "",
        power: "",
        nda: !nda ? "Please specify if your group signed an NDA or IP." : "",
        attendance: !attendance ? "Please specify your attendance type." : "",
        posterApproved: nda === "yes" && !posterApproved ? "Please specify if your sponsor approved your poster or not." : "",
        youtubeLink: !youtubeLink ? "Please include the YouTube link of your presentation video." : "",
        captcha: "",
      };
    
      if (!email.endsWith("@asu.edu")) {
        errors.email = "Please enter your ASU email.";
      }
      if (parseInt(numberOfTeamMembers, 10) <= 0) {
        errors.numberOfTeamMembers = "The number of team members must be at least 1.";
      }
      if (demo === "yes" && !formData.power) {
        errors.power = "Please specify if your group will need power for your demo.";
      }

      if (attendance === "Online" && !formData.zoomLink) {
        errors.zoomLink = "Zoom link is required for online attendance.";
      }
      
    
      const file = selectedFile;
      if (!file) {
        errors.posterPicturePath = "Please upload your poster image.";
      } else if (!["image/png", "image/jpeg"].includes(file.type)) {
        errors.posterPicturePath = "Only PNG or JPEG images are allowed.";
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
        setCaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setIsSubmitted(true);
          setTimeout(() => {
           setIsSubmitted(false);
            navigate("/");
          }, 3000);
    };
    const handleCloseSuccessMessage = () => {
        setIsSubmitted(false);
        navigate("/");
    };
    return (<div className="form-container">
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
            <a href="mailto:sdosburn@asu.edu">
              {" "}
              sdosburn@asu.edu{" "}
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
        <select
          name="projectTitle"
          id="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
        >
          <option value="">Select a project</option>
          {projects.map((project) => {
            const fullName = `${project.project_id} - ${project.project_title}`;
            return (
              <option key={project.project_id} value={fullName}>
                {fullName}
              </option>
            );
          })}
        </select>
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
    <label>Are you online or in-person?</label>
    <select
      name="attendance"
      id="attendance"
      value={formData.attendance}
      onChange={handleChange}
    >
      <option value="">Select an option</option>
      <option value="online">Online</option>
      <option value="inPerson">In-Person</option>
    </select>
    {errors.attendance && (<p className="error-message">{errors.attendance}</p>)}
  </div>
        <div>
        {formData.attendance === "online" && (
        <div className="form-box">
          <label htmlFor="zoomLink">Zoom link:</label>
          <input
            type="url"
            name="zoomLink"
            id="zoomLink"
            value={formData.zoomLink}
            onChange={handleChange}
            placeholder="https://zoom.us/..."
          />
          {errors.zoomLink && (
            <p className="error-message">{errors.zoomLink}</p>
          )}
        </div>
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
    </div>
    {errors.nda && <p className="error-message">{errors.nda}</p>}
  </div>

  {formData.nda === "yes" && (
    <div className="form-box">
      <label>Was your poster and video approved by the sponsor?</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="posterApproved"
            value="yes"
            checked={formData.posterApproved === "yes"}
            onChange={handleChange}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="posterApproved"
            value="no"
            checked={formData.posterApproved === "no"}
            onChange={handleChange}
          />{" "}
          No
        </label>
      </div>
      {formData.posterApproved === "no" && (
        <label>Please verify with your sponsor before submitting.</label>
      )}
    </div>
  )}

  <div className="form-box">
    <label htmlFor="youtubeLink">YouTube Video Link:</label>
      <input
        type="url"
        name="youtubeLink"
        id="youtubeLink"
        value={formData.youtubeLink}
        onChange={handleChange}
        className="youtube-input"
      />
    {errors.youtubeLink && (
      <p className="error-message">{errors.youtubeLink}</p>
    )}
  </div>

<div className="contentPoster">
  <span className="title">Upload Your Poster Image</span>
  <p className="message">Select a file to upload from your computer or device.</p>

  <div className="image-upload">
    <label htmlFor="posterFile" className="button upload-btn">
      Choose File
      <input
        type="file"
        id="posterFile"
        name="poster"
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

  {errors.posterPicturePath && (
    <p className="error-message">{errors.posterPicturePath}</p>
  )}
</div>

<div className="contentTeam">
  <span className="title">Upload Your Team's Images</span>
  <p className="message">Select files to upload from your computer or device.</p>

  <div className="image-upload">
    <label htmlFor="teamFiles" className="button upload-btn">
      Choose Files
      <input
        type="file"
        id="teamFiles"
        name="contentTeam"
        multiple
        hidden
        onChange={handleChange}
      />
    </label>
  </div>

  <div className="result">
    {contentTeamFiles.length > 0 ? (
      <div className="file-uploaded">
        {contentTeamFiles.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
    ) : (
      <div className="file-uploaded"><p>No files selected</p></div>
    )}
  </div>

        {errors.teamPicturePath && (
          <p className="error-message">{errors.teamPicturePath}</p>
        )}
      </div>

      <div className="form-box">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
          theme="light"
          size="normal"
        />
        {errors.captcha && <p className="error-message">{errors.captcha}</p>}
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