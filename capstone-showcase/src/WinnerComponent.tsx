import { ImageMinus } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";


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




export function Winners( { winners }: { winners: ShowcaseEntry[] } ) {

  const queryParams = new URLSearchParams(useLocation().search);
  const semester = queryParams.get("semester");
  const year = queryParams.get("year");

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        paddingTop: "1rem",
      }}
    >
      {winners.map((winner: ShowcaseEntry, index:number) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column", 
            alignItems: "center",
            width: "300px", 
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            padding: "1rem",
            background: "#fff",
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              width: "100%",
              height: "200px", 
              background: "#eaeaea",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <ImageMinus size={80} />
            <img
              src={getSource(winner.position)}
              alt={winner.winning_pic?.split(',')[0] || "Winner"} //getting the first image of the array
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "50%",
                background: getbackground(winner.position),
                strokeWidth: 12,
              }}
            />
          </div>

          {/* Text section */}
          <div style={{ color: "black", textAlign: "left", margin: 0 }}>
            <p title={winner.ProjectTitle} style={{ margin: 0, fontWeight: "600",display: "-webkit-box",
                WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden",
                textOverflow: "ellipsis" }}>{winner.ProjectTitle}</p>
            <p style={{ margin: 0, fontSize: "0.90rem" }}>
              by {winner.Sponsor || "John Doe"}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "0.90rem",
                  background: "#D1E7FF",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "5px",
                }}
              >
                {winner.semester} {winner.year}
              </span>
              <span
                style={{
                  background: "#FFC627",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "5px",
                  marginLeft: "0.25rem",
                  fontSize: "0.90rem",
                }}
              >
                {/* //default to computer science if no department is provided */}
                {winner.department || "Computer Science"} 
              </span>
            </div>
            <p
              style={{
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "0.90rem",
              }}
            >
              {winner.description}
            </p>
            <div style={{marginTop:'1rem'}}>
              <button
                onClick={() => {
                 const encodedWinner = encodeURIComponent(JSON.stringify(winner));
                 console.log('encodedWinner', encodedWinner);
                 window.location.href = `/winners/entry/${winner.EntryID || 1}?data=${encodedWinner}&semester=${semester || ''}&year=${year || ''}`;
                }}
                style={{
                  marginTop: "0.75rem",
                  background: "#8C1D40",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "7px 18px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
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
