import { useParams, useLocation } from "react-router-dom";
import { featuredWinners } from "../WinnerComponent";

export default function ProjectDetails() {
  const location = useLocation();
  const { projectId } = useParams();
  let winner = location.state?.winner;

  // Fallback: find winner by projectId if not passed in state
  if (!winner && projectId) {
    winner = featuredWinners.find(w => w.project === projectId);
  }

  if (!winner) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <p><strong>Project:</strong> {winner.project}</p>
      <p><strong>Author:</strong> {winner.author || winner.name}</p>
      <p><strong>Department:</strong> {winner.department}</p>
      <p><strong>Semester:</strong> {winner.semester} {winner.year}</p>
      <p><strong>Description:</strong> {winner.description}</p>
    </div>
  );
}
