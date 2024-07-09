// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PreEventLandingPage from "./Pages/PreEventLandingPage";
import Menu from "./Menu";
import ComputerScience from "./Pages/ComputerScience";
import ComputerSystemsEngineering from "./Pages/ComputerSystemsEngineering";
import IndustrialEngineering from "./Pages/IndustrialEngineering";
import Survey from "./Pages/Survey";
import Interdisciplinary from "./Pages/Interdisciplinary";
import Admin from "./Pages/Admin";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/" element={<PreEventLandingPage />} />
          <Route
            path="/pre-event-landing-page"
            element={<PreEventLandingPage />}
          />
          <Route path="/computer-science" element={<ComputerScience />} />
          <Route
            path="/computer-systems-engineering"
            element={<ComputerSystemsEngineering />}
          />
          <Route
            path="/industrial-engineering"
            element={<IndustrialEngineering />}
          />
          <Route path="/interdisciplinary" element={<Interdisciplinary />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
