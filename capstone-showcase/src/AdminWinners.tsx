import { useState, useEffect } from "react";
import "./CSS/AdminWinners.css";
import { SelectWinnerModal } from "./SelectWinnerModal";
import { ProjectObj, WinnerSelection } from "./SiteInterface";

export function Winners() {
  const [projects, setProjects] = useState<ProjectObj[] | null>(null);
  const [selectionMade, setSelectionMade] = useState<boolean>(false);
  const [currSelection, setCurrSelection] = useState<ProjectObj | null>(null);
  const [selectedWinners, setSelectedWinners] = useState<
    WinnerSelection[] | null
  >(null);
  const [semester, setSemester] = useState(
    new Date().getMonth() >= 0 && new Date().getMonth() <= 5 ? "sp" : "fa"
  );
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    fetchProjects();
  }, []);
  const setSelection = (project: ProjectObj, position: number) => {
    switch (position) {
      case 1:
        project.position = "1";
        break;
      case 2:
        project.position = "2";
        break;
      case 3:
        project.position = "3";
        break;
      default:
        project.position = "Participant";
        break;
    }
    setSelectedWinners((prevWinners) => {
      if (prevWinners) {
        // Remove any existing winner with the same position
        const updatedWinners = prevWinners.filter(
          (winner) => winner.position !== project.position
        );
        // Add the new winner
        updatedWinners.push({
          projectId: project.EntryID,
          projectName: project.ProjectTitle,
          position: project.position,
          pictures: [],
        });
        return updatedWinners;
      } else {
        return [
          {
            projectId: project.EntryID,
            projectName: project.ProjectTitle,
            position: project.position,
            pictures: [],
          },
        ];
      }
    });
  };
  const handleSelectionClose = () => {
    setSelectionMade(false);
    setSelectedWinners(null);
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/survey/${semester}/${year}`
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
  const semesters = ["fa", "sp"];
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
            onClick={fetchProjects}
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
            <div className="edit-submission-table">
              <div>
                {selectedWinners &&
                  selectedWinners.length > 0 &&
                  selectedWinners.map((winner) => (
                    <span key={winner.position}>
                      {winner.position == "1" && (
                        <img
                          src="/1stplace.svg"
                          alt="1st Place"
                          className="admin-podium-highlight"
                        />
                      )}
                      {winner.position == "2" && (
                        <img
                          src="/2ndplace.svg"
                          alt="2nd Place"
                          className="admin-podium-highlight"
                        />
                      )}
                      {winner.position == "3" && (
                        <img
                          src="/3rdplace.svg"
                          alt="3rd Place"
                          className="admin-podium-highlight"
                        />
                      )}
                      <p>{winner.projectName}</p>
                    </span>
                  ))}
              </div>
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
