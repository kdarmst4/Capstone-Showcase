import React, { useState } from "react";
import styles from "./Admin.module.css";
import authStyles from "./AdminAuth.module.css";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "Oh1o4o58vUjp";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
      setError("");
    } else {
      setError("Incorrect password");
      setIsPasswordCorrect(false);
    }
  };

  return (
    <div className={styles.passwordFormWrapper}>
      {!isPasswordCorrect ? (
        <form onSubmit={handlePasswordSubmit} className={styles.form}>
          <label>Password: </label>
          <input
            type="password"
            name="pass"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Submit</button>
          {error && <span className={styles.errorText}>{error}</span>}
        </form>
      ) : (
        <div className={authStyles.authWrapper}>
          <form
            action="adminDownload"
            method="get"
            className={authStyles.authForm}
          >
            <button className={authStyles.centerButton}>
              Download 2024 Showcase Data (as a .csv, which can be opened by
              Excel/Google Docs)
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
