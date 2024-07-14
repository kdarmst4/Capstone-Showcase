import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/ComputerSystemsEngineering.css";

const ComputerSystemsEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`computer-systems-engineering ${isSideMenu ? 'compressed' : ''}`}>
      <header>
        <h1>Computer Systems Engineering</h1>
      </header>
      <main>
        {/* Your content here */}
      </main>
    </div>
  );
};

export default ComputerSystemsEngineering;
