import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/IndustrialEngineering.css";

const IndustrialEngineering: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`industrial-engineering ${isSideMenu ? 'compressed' : ''}`}>
      <header>
        <h1>Industrial Engineering</h1>
      </header>
      <main>
        {/* Your content here */}
      </main>
    </div>
  );
};

export default IndustrialEngineering;
