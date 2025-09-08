
import { ImageMinus } from "lucide-react";
import { Link } from "react-router-dom";
import "./WinnerComponent.css";

interface FeaturedWinner {
  name: string;
  project: string;
  position?: number;
  department: string;
  year: number;
  semester?: string;
  author?: string;
  description: string;
}

export function WinnerComponent({ winners }: { winners: FeaturedWinner[] }) {
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
      {winners.map((winner: FeaturedWinner, index: number) => (
        <div key={index} className="winner-card">
          {/* Image placeholder */}
          <div className="winner-image">
            <ImageMinus size={80} />
            <img
              src={getSource(winner.position)}
              alt={winner.project}
              className="winner-medal"
              style={{ background: getbackground(winner.position) }}
            />
          </div>

          {/* Text section */}
          <div className="winner-text-section">
            <p className="winner-project">{winner.project}</p>
            <p className="winner-author">by {winner.author || "John Doe"}</p>
            <div className="winner-info-row">
              <span className="winner-semester">
                {winner.semester} {winner.year}
              </span>
              <span className="winner-department">{winner.department}</span>
            </div>
            <p className="winner-description">{winner.description}</p>
            <div className="winner-details-link-container">
              <Link
                to={`/winners/${winner.project}`}
                state={{ winner }}
                className="winner-details-link"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
