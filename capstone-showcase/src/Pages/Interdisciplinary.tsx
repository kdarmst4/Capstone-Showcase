import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/Interdisciplinary.css";

const Interdisciplinary: React.FC = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`interdisciplinary ${isSideMenu ? 'compressed' : ''}`}>
      <header>
        <h1>Interdisciplinary</h1>
      </header>
      <main>
        {/* Your content here */}
      </main>
    </div>
  );
};

export default Interdisciplinary;
