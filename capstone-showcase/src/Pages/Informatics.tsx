import React from "react";
import { useMenuContext } from "../MenuContext";
import "../CSS/Informatics.css";

const Informatics = () => {
  const { isSideMenu } = useMenuContext();

  return (
    <div className={`informatics ${isSideMenu ? "compressed" : ""}`}>
      <header>
        <h1>Informatics</h1>
      </header>
      <main>{/* Your content here */}</main>
    </div>
  );
};

export default Informatics;
