import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/AuthContext";
import "../CSS/SponsorLogin.css";
import asuLogoPlain from "../assets/asuLogoPlain.png";

const SponsorLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("sponsor-login-page-body");
    return () => {
      document.body.classList.remove("sponsor-login-page-body");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === " ") {
      login("Sponsor");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <img src={asuLogoPlain} alt="ASU Logo" className="logo" />
        <h2 className="sponsor-login-title">Sponsor Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone Number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Send my One-Time Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SponsorLogin;