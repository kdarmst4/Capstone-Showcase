import { ImageMinus } from "lucide-react";
import { Link } from "react-router-dom";

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




export function Winners( { winners }: { winners: FeaturedWinner[] } ) {

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
        gap: "1rem",
        paddingTop: "1rem",
      }}
    >
      {winners.map((winner: FeaturedWinner, index:number) => (
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
              alt={winner.project}
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
            <p style={{ margin: 0, fontWeight: "600" }}>{winner.project}</p>
            <p style={{ margin: 0, fontSize: "0.90rem" }}>
              by {winner.author || "John Doe"}
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
                {winner.department}
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
              <Link
                to={`/winners/${winner.project}`}
                state={{ winner }}
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
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
