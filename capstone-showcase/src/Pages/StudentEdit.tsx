import React, { useState, useEffect } from "react";
import { ProjectObj } from "../SiteInterface";
import { useParams } from "react-router-dom";
import asuLogoPlain from "../assets/asuLogoPlain.png";
import "../CSS/StudentEdit.css";

export function StudentEdit() {
  const { token } = useParams<{ token: string }>();
  const [members, setMembers] = useState([] as string[]);
  const [changeMap, setChangeMap] = useState<Map<string, string>>(new Map());
  const [project, setProject] = useState<ProjectObj>({} as ProjectObj);
  const [changes, setChanges] = useState<ProjectObj>({} as ProjectObj);
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = import.meta.env.PROD
    ? "/api"
    : "http://localhost:3000/api";
  const STATIC_BASE_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
  //   fetch the desired survey project
  useEffect(() => {
    setLoading(true);
    const fetchProject = async () => {
      const res = await fetch(`${API_BASE_URL}/student/survey-edit/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status !== 200) {
        alert(data.error || "Failed to fetch project.");
        return;
      }
      console.log("Fetched Project Data:", data[0]);
      setProject(data[0]);
      setMembers(
        data[0].teamMemberNames
          .split(", ")
          .filter((name: string) => name.trim() !== "")
      );
    };
    fetchProject();
    setLoading(false);
  }, [token]);
  const updateChangeMap = (key: string, value: string) => {
    setChangeMap((prev) => {
      const newMap = new Map(prev);
      const originalValue = project[key as keyof ProjectObj];

      if (value !== originalValue) {
        newMap.set(key, value);
      } else {
        newMap.delete(key);
      }
      console.log("ChangeMap Updated:", Array.from(newMap.entries()));

      return newMap;
    });
  };
  const undoChanges = () => {
    setChanges(project);
  };
  const addMember = () => {
    setMembers([...members, ""]);
  };
  const updateMember = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
    updateChangeMap("teamMemberNames", newMembers.join(", "));
  };

  const removeMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
    updateChangeMap("teamMemberNames", newMembers.join(", "));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (changeMap.size === 0) {
      return;
    }
    const API_BASE_URL = import.meta.env.PROD
      ? "/api"
      : "http://localhost:3000/api";

    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`${API_BASE_URL}/${project.id}/update`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify({ ...Object.fromEntries(changeMap) }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.error || "Failed to update project.");
      return;
    }
    alert("Project updated successfully!");
  };
  if (loading) {
    return  <div className="loading-shade">
          <div className="loading-spinner"></div>
        </div>
  }
  return (
    <>
      {!project || !project.id ? (
       <div className="no_project_found">
        <img src={asuLogoPlain} alt="ASU Logo" className="asu-logo-nav"></img>
        <h1>Survey could not be found. Please verify the Link and try again.</h1>
        <div>
        <button>Home Page</button>
        <button>Refresh</button>

        </div>
    </div>
      ) : (
        <form className="student-edit-project-form" onSubmit={(e) => handleSubmit(e)}>
          <section>
            <label htmlFor="project-title">Project Title:</label>
            <input
              type="text"
              id="project-title"
              name="project-title"
              defaultValue={project.projectTitle}
              onChange={(e) => updateChangeMap("projectTitle", e.target.value)}
            />
          </section>

          <section>
            <label htmlFor="project-description">Project Description:</label>
            <textarea
              id="project-description"
              name="project-description"
              defaultValue={project.projectDescription}
              onChange={(e) =>
                updateChangeMap("projectDescription", e.target.value)
              }
            />
          </section>

          <section>
            <label htmlFor="sponsor">Sponsor:</label>
            <input
              type="text"
              id="sponsor"
              name="sponsor"
              defaultValue={project.sponsor}
              onChange={(e) => updateChangeMap("sponsor", e.target.value)}
            />
          </section>

          <section>
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={project.email}
              onChange={(e) => updateChangeMap("email", e.target.value)}
            />
          </section>

          <section>
            <label>Major:</label>
            <input
              type="text"
              id="course-number"
              name="course-number"
              defaultValue={project.major}
              onChange={(e) => updateChangeMap("major", e.target.value)}
            />
          </section>

          <section>
            <label>Members:</label>
            <div className="members-list">
              {members.map((member, index) => (
                <div key={index} className="member-input-group">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder="Enter member name"
                  />
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="remove-member-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMember}
                className="add-member-btn"
              >
                + Add Member
              </button>
            </div>
          </section>

          <section>
            <label>Video Link:</label>
            <input
              type="url"
              id="video-link"
              name="video-link"
              defaultValue={project.youtubeLink}
              onChange={(e) => updateChangeMap("youtubeLink", e.target.value)}
            />
          </section>

          <section className="form-buttons">
            <button type="submit" className="save-btn">
              <span
                style={{ color: "gold", fontWeight: "bold", padding: "0.5rem" }}
              >
                {changeMap.size}
              </span>
              Save Changes
            </button>
            <span>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => undoChanges()}
              >
                Undo Changes
              </button>
            </span>
          </section>
        </form>
      )}
    </>
  );
}
