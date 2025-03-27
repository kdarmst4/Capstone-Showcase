import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/AuthContext";
import "../CSS/StudentLogin.css";
import asuLogoPlain from "../assets/asuLogoPlain.png";

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("student-login-page-body");
    return () => {
      document.body.classList.remove("student-login-page-body");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === "asu.edu" && password === "1234") {
      login("Student");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <img src={asuLogoPlain} alt="ASU Logo" className="logo" />
        <h2 className="student-login-title">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email Address"
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;