import React, { useState, useEffect } from "react";
import { ProjectObj } from "../SiteInterface";
import { useParams } from "react-router-dom";
import asuLogoPlain from "../assets/asuLogoPlain.png";
import "../CSS/StudentEdit.css";
import { MultipleImageUploader, UploadableImage } from "../MultipleImageUploader";

export function StudentEdit() {
  const { token } = useParams<{ token: string }>();
  const [members, setMembers] = useState([] as string[]);
  const [changeMap, setChangeMap] = useState<Map<string, string>>(new Map());
  const [project, setProject] = useState<ProjectObj>({} as ProjectObj);
  const [changes, setChanges] = useState<ProjectObj>({} as ProjectObj);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [posterImages, setPosterImages] = useState<UploadableImage[]>([]);
  const [teamImages, setTeamImages] = useState<UploadableImage[]>([]);
  const [posterImagesDirty, setPosterImagesDirty] = useState<boolean>(false);
  const [teamImagesDirty, setTeamImagesDirty] = useState<boolean>(false);
  const [initialPosterImages, setInitialPosterImages] = useState<string[]>([]);
  const [initialTeamImages, setInitialTeamImages] = useState<string[]>([]);

  const API_BASE_URL = import.meta.env.PROD
    ? "/api"
    : "http://localhost:3000/api";
  const STATIC_BASE_URL = import.meta.env.PROD ? "" : "http://localhost:3000";
  //   fetch the desired survey project
  useEffect(() => {
    let isMounted = true;
    const fetchProject = async () => {
      setLoading(true);
      try {
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
        if (!isMounted) {
          return;
        }
        const fetchedProject = data[0];
        console.log("Fetched Project Data:", fetchedProject);
        setProject(fetchedProject);
        setMembers(
          fetchedProject.teamMemberNames
            .split(", ")
            .filter((name: string) => name.trim() !== "")
        );
        const posterPaths = fetchedProject.posterPicturePath
          ? fetchedProject.posterPicturePath
              .split(",")
              .map((path: string) => path.trim())
              .filter((path: string) => path !== "")
          : [];
        const teamPaths = fetchedProject.teamPicturePath
          ? fetchedProject.teamPicturePath
              .split(",")
              .map((path: string) => path.trim())
              .filter((path: string) => path !== "")
          : [];
        setPosterImages(posterPaths);
        setTeamImages(teamPaths);
        setInitialPosterImages(posterPaths);
        setInitialTeamImages(teamPaths);
        setPosterImagesDirty(false);
        setTeamImagesDirty(false);
      } catch (error) {
        console.error("Failed to fetch project.", error);
        alert("Failed to fetch project.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchProject();
    return () => {
      isMounted = false;
    };
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
  const handlePosterImagesChange = (imgs: UploadableImage[]) => {
    setPosterImages(imgs);
    setPosterImagesDirty(true);
  };

  const handleTeamImagesChange = (imgs: UploadableImage[]) => {
    setTeamImages(imgs);
    setTeamImagesDirty(true);
  };

  const uploadPosterFile = async (file: File) => {
    const formData = new FormData();
    formData.append("poster", file);
    const response = await fetch(`${API_BASE_URL}/survey/uploadsPoster`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error || "Failed to upload poster image.");
    }
    return data.path as string;
  };

  const uploadTeamFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("contentTeamFiles", file));
    const response = await fetch(`${API_BASE_URL}/survey/uploadsTeam`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error || "Failed to upload team images.");
    }
    return data.paths as string[];
  };

  const resolvePosterPaths = async () => {
    if (!posterImages.length) {
      return [] as string[];
    }
    const resolvedPaths: string[] = [];
    for (const image of posterImages) {
      if (typeof image === "string") {
        resolvedPaths.push(image);
      } else {
        const uploadedPath = await uploadPosterFile(image);
        resolvedPaths.push(uploadedPath);
      }
    }
    return resolvedPaths;
  };

  const resolveTeamPaths = async () => {
    if (!teamImages.length) {
      return [] as string[];
    }
    const resolvedPaths: (string | undefined)[] = new Array(teamImages.length).fill(undefined);
    const filesToUpload: File[] = [];
    const filePositions: number[] = [];
    teamImages.forEach((image, index) => {
      if (typeof image === "string") {
        resolvedPaths[index] = image;
      } else {
        filesToUpload.push(image);
        filePositions.push(index);
      }
    });
    if (filesToUpload.length) {
      const uploadedPaths = await uploadTeamFiles(filesToUpload);
      filePositions.forEach((position, idx) => {
        resolvedPaths[position] = uploadedPaths[idx];
      });
    }
    return resolvedPaths
      .filter((path): path is string => typeof path === "string")
      .map((path) => path.trim())
      .filter((path) => path !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (changeMap.size === 0 && !posterImagesDirty && !teamImagesDirty) {
      return;
    }

    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const payload: Record<string, string> = { ...Object.fromEntries(changeMap) };

    try {
      setSaving(true);
      let updatedPosterPaths: string[] | undefined;
      let updatedTeamPaths: string[] | undefined;

      if (posterImagesDirty) {
        updatedPosterPaths = await resolvePosterPaths();
        payload.posterPicturePath = updatedPosterPaths.join(", ");
      }
      if (teamImagesDirty) {
        updatedTeamPaths = await resolveTeamPaths();
        payload.teamPicturePath = updatedTeamPaths.join(", ");
      }

      const res = await fetch(`${API_BASE_URL}/${project.id}/update`, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status !== 200) {
        alert(data.error || "Failed to update project.");
        return;
      }
      alert("Project updated successfully!");
      setProject((prev) => ({ ...prev, ...payload }));
      setChangeMap(new Map());
      if (posterImagesDirty && updatedPosterPaths) {
        setPosterImages(updatedPosterPaths);
        setInitialPosterImages(updatedPosterPaths);
        setPosterImagesDirty(false);
      }
      if (teamImagesDirty && updatedTeamPaths) {
        setTeamImages(updatedTeamPaths);
        setInitialTeamImages(updatedTeamPaths);
        setTeamImagesDirty(false);
      }
    } catch (error) {
      console.error("Failed to save project updates.", error);
      alert("Failed to save project updates.");
    } finally {
      setSaving(false);
    }
  };

  const pendingChangesCount =
    changeMap.size + (posterImagesDirty ? 1 : 0) + (teamImagesDirty ? 1 : 0);
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
            <label>Poster Images:</label>
                <MultipleImageUploader
                  images={posterImages}
                  onChange={handlePosterImagesChange}
                  inputId="posterImagesUploader"
                  multiple={false}
                  existingBaseUrl={STATIC_BASE_URL}
                />
          </section>
          <section>
            <label>Team Images:</label>
                <MultipleImageUploader
                  images={teamImages}
                  onChange={handleTeamImagesChange}
                  inputId="teamImagesUploader"
                  multiple
                  existingBaseUrl={STATIC_BASE_URL}
                />

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
                {pendingChangesCount}
              </span>
              {saving ? "Saving..." : "Save Changes"}
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
