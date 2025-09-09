
import { ImageMinus } from "lucide-react";

import "./WinnerComponent.css";


type ShowcaseEntry = {
  course: string;
  EntryID: number;
  video: string;
  shouldDisplay: "YES" | "NO"; 
  position: number;
  members: string;
  Sponsor: string;
  description: string;
  ProjectTitle: string;
  winning_pic: string | null;
  department?: string;
  NDA: "Yes" | "No"; 
  year: number;
  semester: "Spring" | "Summer" | "Fall" | "Winter"; 
};


export function WinnerComponent({ winners }: { winners: ShowcaseEntry[] }) {
  const getSource = (position?: number) => {
    switch (position) {
      case 1:
        return "/1stplace.svg";
      case 2:
        return "/2ndplace.svg";
      case 3:
        return "/3rdplace.svg";
      default:
        return "";
    }
  };

  const getbackground = (position?: number) => {
    switch (position) {
      case 1:
        return "#FFD700";
      case 2:
        return "#C0C0C0";
      case 3:
        return "#CD7F32";
      default:
        return "";
    }
  };

  return (
    <div className="winner-container">
      {winners.map((winner: ShowcaseEntry, index: number) => (
        <div key={index} className="winner-card">
          {/* Image placeholder */}
          <div className="winner-image">
            <ImageMinus size={80} />
            <img
              src={getSource(winner.position)}
              alt={winner.ProjectTitle}
              className="winner-medal"
              style={{ background: getbackground(winner.position) }}
            />
          </div>

          {/* Text section */}
          <div className="winner-text-section">
            <p className="winner-project" title={winner.ProjectTitle}>{winner.ProjectTitle}</p>
            <p className="winner-author" title={winner.Sponsor || "John Doe"}>by {winner.Sponsor || "John Doe"}</p>
            <div className="winner-info-row">
              <span className="winner-semester">
                {winner.semester} {winner.year}
              </span>
              <span className="winner-department">{winner.department || "Computer Science"}</span>
            </div>
            <p className="winner-description">{winner.description}</p>
            <div className="winner-details-link-container">
              <button
                onClick={() => {
                 const encodedWinner = encodeURIComponent(JSON.stringify(winner));
                 console.log('encodedWinner', encodedWinner);
                 window.location.href = `/winners/entry/${winner.EntryID || 1}?data=${encodedWinner}`;
                }}
                className="winner-details-link"
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
