import "./CSS/EditProject.css";
import { useState } from "react";
import { ProjectObj } from "./SiteInterface";

export default function EditProject({
  project,
  closeFunc,
}: {
  project: ProjectObj;
  closeFunc: (changeMap?: Map<string, string> | null) => void;
}) {
  const initialMembers = project.MemberNames
    ? project.MemberNames.split(", ")
    : [];
  const [members, setMembers] = useState(initialMembers);
  const [changeMap, setChangeMap] = useState<Map<string, string>>(new Map());

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

  const addMember = () => {
    setMembers([...members, ""]);
  };

  const updateMember = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
    updateChangeMap("MemberNames", newMembers.join(", "));
  };

  const removeMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
    updateChangeMap("MemberNames", newMembers.join(", "));
  };


  const handleCloseEvent = (changes?: Map<string, string>) => {
    if (changeMap.size > 0) {
      //create a custom confirm dialog later
      if (
        !window.confirm(
          "You have unsaved changes. Are you sure you want to close?"
        )
      )
        return;
    }
    closeFunc(changes || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (changeMap.size === 0) {
      closeFunc();
      return;
    }
    const API_BASE_URL =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";

    fetch(`${API_BASE_URL}/${project.EntryID}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...Object.fromEntries(changeMap) }),
    })
      .then((res) => res.json())
      .then(() => {
        // console.log('Data:', data);

        // Create updated changeMap with EntryID for identification
        const updatedChangeMap = new Map(changeMap);
        updatedChangeMap.set("EntryID", project.EntryID.toString());
        // console.log("Updated ChangeMap:", Array.from(updatedChangeMap.entries()));  
        // Pass the changes back to the parent
        closeFunc(updatedChangeMap);
      })
      .catch((error) => {
        console.log(error);
        closeFunc();
      });
  };

  return (
    <div className="edit-project-container">
      <button onClick={() => handleCloseEvent(changeMap)} className="edit-close-btn">
        &times;
      </button>
      <h2>Edit Project</h2>
      <form className="edit-project-form" onSubmit={(e) => handleSubmit(e)}>
        <section>
          <label htmlFor="project-title">Project Title:</label>
          <input
            type="text"
            id="project-title"
            name="project-title"
            defaultValue={project.ProjectTitle}
            onChange={(e) => updateChangeMap("ProjectTitle", e.target.value)}
          />
        </section>

        <section>
          <label htmlFor="project-description">Project Description:</label>
          <textarea
            id="project-description"
            name="project-description"
            defaultValue={project.ProjectDescription}
            onChange={(e) =>
              updateChangeMap("ProjectDescription", e.target.value)
            }
          />
        </section>

        <section>
          <label htmlFor="sponsor">Sponsor:</label>
          <input
            type="text"
            id="sponsor"
            name="sponsor"
            defaultValue={project.Sponsor}
            onChange={(e) => updateChangeMap("Sponsor", e.target.value)}
          />
        </section>

        <section>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={project.Email}
            onChange={(e) => updateChangeMap("Email", e.target.value)}
          />
        </section>

        <section>
          <label>Course Number:</label>
          <input
            type="text"
            id="course-number"
            name="course-number"
            defaultValue={project.CourseNumber}
            onChange={(e) => updateChangeMap("CourseNumber", e.target.value)}
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

        <section className="checkbox-group">
          <div>
            <input
              type="checkbox"
              id="demo"
              name="demo"
              defaultChecked={project.Demo === "Yes"}
              onChange={(e) =>
                updateChangeMap("Demo", e.target.checked ? "Yes" : "No")
              }
            />
            <label htmlFor="demo">Demo Required</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="power"
              name="power"
              defaultChecked={project.Power === "Yes"}
              onChange={(e) =>
                updateChangeMap("Power", e.target.checked ? "Yes" : "No")
              }
            />
            <label htmlFor="power">Power Required</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="nda"
              name="nda"
              defaultChecked={project.NDA === "Yes"}
              onChange={(e) =>
                updateChangeMap("NDA", e.target.checked ? "Yes" : "No")
              }
            />
            <label htmlFor="nda">NDA Required</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="should-display"
              name="should-display"
              defaultChecked={project.ShouldDisplay === "Yes"}
              onChange={(e) =>
                updateChangeMap(
                  "ShouldDisplay",
                  e.target.checked ? "Yes" : "No"
                )
              }
            />
            <label htmlFor="should-display">Should Display</label>
          </div>
        </section>

        <section>
          <label>Video Link:</label>
          <input
            type="url"
            id="video-link"
            name="video-link"
            defaultValue={project.VideoLinkRaw}
            onChange={(e) => updateChangeMap("VideoLinkRaw", e.target.value)}
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
              onClick={() => handleCloseEvent(changeMap)}
            >
              Cancel
            </button>
          </span>
        </section>
      </form>
    </div>
  );
}
