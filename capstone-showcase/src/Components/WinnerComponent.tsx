
import { Divide, ImageMinus } from "lucide-react";

import "../CSS/WinnerComponent.css";
import type { ShowcaseEntry } from "../Hooks/useWinners";

interface WinnerComponentProps<T extends Record<string, any>> {
  winners: T[];
}

export function WinnerComponent<T extends Record<string, any>>({ winners }: WinnerComponentProps<T>) {
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
    <div className="winner-component__parent-container">
      <div className="winner-container">
          {/* <div className="grid-line line1"/>
          <div className="grid-line line2"/>
          <div className="grid-line line3"/>
          <div className="grid-line line4"/>
          <div className="grid-line line5"/>
          <div className="grid-line line6"/>
          <div className="grid-line line7"/> */}
          {winners.map((winner, index) => {return(
            <>
              <div className={`text-container ${'text-' + (index + 1)}`}>
                <p className="place-header">
                {winner.title}
                </p>
                <div className="text-subgroup">
                  <p className='winner-title-text'>
                    {winner.project}
                  </p>
                  <p className='winner-desc-text'>
                    {winner.members}
                  </p>
                </div>
              </div>
              <div className={`image-container ${'pic-' + (index + 1)}`}>
                <img src={winner.teamImage} alt="Team" className="winner-image" />
                <img src={winner.posterImage} alt="Poster" className="winner-image" />
                {/* <img src={firstPlaceGroup} alt="First Place Group" className="group-image" /> */}
                {/*Add a link to redirect to the project here?*/}
              </div>
            </>
          )})}
      </div>
    </div>
    // </div>
    // <div className="winner-component__parent-container">
    //   {winners.length === 0
    //     ? <p className="winner-component__no-results">No results found.</p> 
    //     : <div className="winner-component__winner-container">
    //       {winners.map((winner: ShowcaseEntry, index: number) => (
    //               <div key={index} className="winner-component__winner-card">
    //                 {/* Image placeholder */}
    //                 <div className="winner-component__winner-image">
    //                   <ImageMinus size={80} />
    //                   <img
    //                     src={getSource(winner.position)}
    //                     alt={winner.ProjectTitle}
    //                     className="winner-component__winner-medal"
    //                     style={{ background: getbackground(winner.position) }}
    //                   />
    //                 </div>

    //                 {/* Text section */}
    //                 <div className="winner-component__winner-text-section">
    //                   <p className="winner-component__winner-project" title={winner.ProjectTitle}>{winner.ProjectTitle}</p>
    //                   <p className="winner-component__winner-author" title={winner.Sponsor || "John Doe"}>by {winner.Sponsor || "John Doe"}</p>
    //                   <div className="winner-component__winner-info-row">
    //                     <span className="winner-component__winner-semester">
    //                       {winner.semester} {winner.year}
    //                     </span>
    //                     <span className="winner-component__winner-department">{winner.department || "Computer Science"}</span>
    //                   </div>
    //                   <p className="winner-component__winner-description">{winner.description}</p>
    //                   <div className="winner-component__winner-details-link-container">
    //                     <button
    //                       onClick={() => {
    //                       const encodedWinner = encodeURIComponent(JSON.stringify(winner));
    //                       console.log('encodedWinner', encodedWinner);
    //                       window.location.href = `/winners/entry/${winner.EntryID || 1}?data=${encodedWinner}`;
    //                       }}
    //                       className="winner-component__winner-details-link"
    //                     >
    //                       More Details
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //       </div>      
    //   }
  );
}
