// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./CSS/App.css";
import PreEventLandingPage from "./Pages/PreEventLandingPage";
import Menu from "./Menu";
import ComputerScience from "./Pages/ComputerSciencePage";
import ComputerSystemsEngineering from "./Pages/ComputerSystemsEngineeringPage";
import IndustrialEngineering from "./Pages/IndustrialEngineeringPage";
import Survey from "./Pages/Survey";
import Interdisciplinary from "./Pages/InterdisciplinaryPage";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
