import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/ComputerScience.css";

const ComputerSciencePage: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`computer-science ${isSideMenu ? 'compressed' : ''}`}>
      <header>
        <h1>Computer Science</h1>
      </header>
      <main>
        {/* Your content here */}
      </main>
    </div>
  );
};

export default ComputerSciencePage;
