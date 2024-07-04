// src/components/Menu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <div className="menu">
        <h1>Menu</h1>
        <ul className="menu-list">
          <li>
            <Link to="/pre-event-landing-page">Pre-Event Landing Page</Link>
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
