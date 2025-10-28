import { useState, useEffect } from "react";
import "./CSS/AdminWinners.css";
import { SelectWinnerModal } from "./SelectWinnerModal";
import { ProjectObj, WinnerSelection } from "./SiteInterface";
import { TodaysDate } from "./AdminDate";

export function Winners() {
  const [projects, setProjects] = useState<ProjectObj[] | null>(null);
  const [selectionMade, setSelectionMade] = useState<boolean>(false);
  const [currSelection, setCurrSelection] = useState<ProjectObj | null>(null);
  const [selectedWinners, setSelectedWinners] = useState<
    WinnerSelection[] | null
  >(null);
  const [semester, setSemester] = useState(TodaysDate().semester);
  const [year, setYear] = useState(TodaysDate().year);
  useEffect(() => {
    fetchProjects(semester, year);
  }, []);
  const setSelection = (
    project: ProjectObj,
    position: number,
    imgs: File[]
  ) => {
    console.log("current position:", position);
    console.log("position type", typeof position);

    if (position < 1 || position > 3) {
      console.error("Invalid position selected:", position);
      return;
    }

    setSelectedWinners((prevWinners) => {
      const updatedWinners = prevWinners || [];

      // Remove any existing winner with the same position
      const filteredWinners = updatedWinners.filter(
        (winner) => winner.position !== position
      );

      filteredWinners.push({
        projectId: project.EntryID,
        projectName: project.ProjectTitle,
        position: position,
        pictures: imgs,
      });

      console.log("Updated Winners:", filteredWinners);
      return filteredWinners;
    });
  };
  const handleSelectionClose = () => {
    setSelectionMade(false);
    // setSelectedWinners(null);
  };
  const API_BASE_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";
  const STATIC_BASE_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

  const fetchProjects = async (semester: string, year: number) => {
    console.log(semester, year);
    try {
      const response = await fetch(
        `${API_BASE_URL}/survey/${semester}/${year}`
      );
      const data = await response.json();
      setProjects(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  // const currMonth = new Date().getMonth();
  const currYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currYear - i);
  const semesters = ["fa", "sp", "su"];
  return (
    <div className="admin-set-winners-page">
      {selectionMade && currSelection && (
        <div className="edit-project-submission">
          <SelectWinnerModal
            project={currSelection}
            setSelectionMade={setSelection}
            handleSelectionClose={handleSelectionClose}
          />
        </div>
      )}
      <p className="edit-title">Set Capstone Showcase Winners</p>
      <form>
        <section>
          <label htmlFor="semester">Semester:</label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </section>
        <section>
          <button
            type="button"
            onClick={() => fetchProjects(semester, year)}
            className="fetch-projects-btn"
          >
            Fetch Projects
          </button>
        </section>
      </form>
      <div className="projects-list">
        {projects && projects.length === 0 ? (
          <p className="winner-small-title" style={{ fontSize: "" }}>
            No projects available for the selected semester and year.
          </p>
        ) : (
          <>
            <div className="selected-winners-adminwinners">
              {selectedWinners &&
                selectedWinners.length > 0 &&
                selectedWinners.map((winner) => (
                  <span key={winner.position} className="adminwinner-selection">
                    <img
                      src={
                        winner.pictures[0] &&
                        URL.createObjectURL(winner.pictures[0])
                      }
                    />
                    <span className="position">
                      {winner.position == 1 && "1st Place"}
                      {winner.position == 2 && "2nd Place"}
                      {winner.position == 3 && "3rd Place"}
                    </span>
                    <span className="project-title-winner">
                      {winner.projectName}
                    </span>

                  </span>
                ))}
              <div className="winners-action-in-admin-winner">
                {selectedWinners && selectedWinners.length > 2 && (
                  <button className="fetch-projects-btn">Set Winners</button>
                )}
                {selectedWinners && selectedWinners.length > 0 && (
                  <button className="fetch-projects-btn">Clear</button>
                )}
              </div>
            </div>
            <div className="edit-submission-table">
              {/* Table of submissions will go here */}
              <table>
                <tr>
                  <th>EntryId</th>
                  <th>Project Title</th>
                  <th>Project Desc</th>
                  <th>Member Count</th>
                  <th>Project Sponsor</th>
                </tr>
                {projects &&
                  projects.map((project: any) => (
                    <tr
                      key={project.EntryID}
                      onClick={() => {
                        setSelectionMade(true);
                        setCurrSelection(project);
                      }}
                    >
                      <td>
                        <div>{project.EntryID}</div>
                      </td>
                      <td>
                        <div>{project.ProjectTitle}</div>
                      </td>
                      <td>
                        <div>{project.ProjectDescription}</div>
                      </td>
                      <td>
                        <div>{project.NumberOfMembers}</div>
                      </td>
                      <td>
                        <div>{project.Sponsor}</div>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
