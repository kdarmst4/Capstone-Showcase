// src/components/Menu.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <div className="menu">
        <ul className="menu-list">
          <li>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="18px"
                height="18px"
                className="home-icon"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link to="/computer-science">Computer Science</Link>
          </li>
          <li>
            <Link to="/computer-systems-engineering">
              Computer Systems Engineering
            </Link>
          </li>
          <li>
            <Link to="/industrial-engineering">Industrial Engineering</Link>
          </li>
          <li>
            <Link to="/interdisciplinary">Interdisciplinary</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
