import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../CSS/AdminLogin.css";
import asuLogoPlain from "../assets/asuLogoPlain.png";
import { EyeOff, Eye } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder login validation. Replace with actual authentication logic.
    if (username === "admin" && password === "Oh1o4o58vUjp") {
      setAuth(true);
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <img src={asuLogoPlain} alt="ASU Logo" className="logo" />
        <h1>ASU Capstone Showcase</h1>
        <h2 className="admin-login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <span className="input">
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="admin-input"
          />
          </span>

          <span className="input">
            <input
              type={showPassword ? "text" : "password"}
              
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-input"
            />
            {showPassword ? (
              <Eye onClick={() => setShowPassword(false)} className="eye-icon" />
            ) : (
              <EyeOff onClick={() => setShowPassword(true)} className="eye-icon" />
            )}
          </span>

          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
