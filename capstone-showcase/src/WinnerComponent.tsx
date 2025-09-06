import { ImageMinus } from "lucide-react";
import { Link } from "react-router-dom";

export interface FeaturedWinner {
  name: string;
  project: string;
  position?: number;
  department: string;
  year: number;
  semester?: string;
  author?: string;
  description: string;
}

export const featuredWinners: FeaturedWinner[] = [
  {
    name: "Jane Doe",
    project: "Smart Campus Navigation",
    department: "Computer Science",
    semester: "Fall",
    position: 1,
    year: 2025,
    description:
      "A mobile app that helps students navigate campus buildings using real-time data.",
  },
  {
    name: "John Smith",
    project: "Eco-Friendly Water Purifier",
    department: "Mechanical Engineering",
    semester: "Spring",
    position: 2,
    year: 2024,
    description:
      "A sustainable water purification system designed for remote communities.",
  },
  {
    name: "Alice Johnson",
    project: "AI Health Assistant",
    department: "Biomedical Engineering",
    semester: "Summer",
    year: 2025,
    position: 3,
    description:
      "An AI-powered assistant that helps monitor patient health and provide personalized care.",
  },
];

export function FeaturedWinners() {
  const handleMoreDetails = (projectid: string) => {
    alert(`More details about project ID: ${projectid}`);
  };
  return (
    <div>
      <h1>Featured Winners</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {featuredWinners.map((winner, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "1rem",
              //   background: '#fafafa',
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              padding: "1rem",
            }}
          >
            <div
              style={{
                flex: "30%",
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center'
              }}
            >
              <ImageMinus size={50} />
            </div>
            <div
              style={{
                // flex: 1,
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                flex: "70%",
                textAlign: "left",
              }}
            >
              <h2 style={{ margin: 0 }}>
                {winner.project} ({winner.year})
              </h2>
              <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>
                {winner.department}
              </p>
              <p style={{ margin: 0 }}>{winner.description}</p>
              <button
                style={{
                  marginTop: "0.75rem",
                  alignSelf: "flex-end",
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
                onClick={() => handleMoreDetails(winner.project)}
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Winners() {
  const handleMoreDetails = (projectid: string) => {
    alert(`More details about project ID: ${projectid}`);
  };
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

  const moreDetails = (project: FeaturedWinner) => {};

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
      {featuredWinners.map((winner, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column", // stack img and text
            alignItems: "center",
            width: "300px", // make all cards equal width
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
              height: "200px", // fixed height for all images
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
                // onClick={() => handleMoreDetails(winner.project)}
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
