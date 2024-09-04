import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../CSS/AdminLogin.css";
import asuLogoPlain from "../assets/asuLogoPlain.png";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    document.body.classList.add("admin-login-page-body");
    return () => {
      document.body.classList.remove("admin-login-page-body");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder login validation. Replace with actual authentication logic.
    if (username === "admin" && password === "Oh1o4o58vUjp") {
      setAuth(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <img src={asuLogoPlain} alt="ASU Logo" className="logo" />
        <h2 className="admin-login-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
