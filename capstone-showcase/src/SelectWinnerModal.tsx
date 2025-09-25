import './CSS/SelectModalWinner.css'
export function SelectWinnerModal({
  project,
  setSelectionMade,
  handleSelectionClose,
}: {
  project: any;
  setSelectionMade: (position: number) => void;
  handleSelectionClose: () => void;
}) {
  console.log("Project in Modal:", project);
  return (
    <div className="edit-project-container">
      <button onClick={handleSelectionClose} className="edit-close-btn">
        &times;
      </button>
      <h2>Set Project Winner</h2>
      <form className='modal-winner-form'>
        <section>
          <h3>Project Title: </h3>
          <p>{project.ProjectTitle}</p>
          <h3>Project Description</h3>
          <p>{project.ProjectDescription}</p>
          <h3>Project sponsor: </h3>
          <p>{project.Sponsor}</p>
          <h3>Project Members</h3>
          <p>{project.MemberNames}</p>
          <section>
            <label htmlFor="position">Select Position:</label>
            <select
              name="position"
              id="position"
              onChange={(e) => setSelectionMade(parseInt(e.target.value))}
            >
              <option value="1">1st Place</option>
              <option value="2">2nd Place</option>
              <option value="3">3rd Place</option>
            </select>
          </section>
        </section>
        <button type="submit" className='save-btn'>Save</button>
      </form>
    </div>
  );
}
