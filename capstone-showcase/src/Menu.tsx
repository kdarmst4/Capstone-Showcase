import React from "react";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu">
        <h1>Menu</h1>
        <ul className="menu-list">
          <li>
            <a href="#pre-event-landing-page">Pre-Event Landing Page</a>
          </li>
          <li>
            <a href="#computer-science">Computer Science</a>
          </li>
          <li>
            <a href="#computer-systems-engineering">
              Computer Systems Engineering
            </a>
          </li>
          <li>
            <a href="#industrial-engineering">Industrial Engineering</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
