import React from "react";
import "./logowanie.css";

export default function Logowanie() {
  return (
    <>
      <form className="auth-form">
        <div className="group">
          <p className="title">Zaloguj się!</p>

          <label htmlFor="login">Login</label>
          <input name="login" required />

          <label htmlFor="pass">Hasło</label>
          <input name="pass" required />

          <input type="submit" value="Zaloguj się do panelu" />
        </div>
      </form>

      <p className="auth-footer-text">Nie masz konta? Zarejestruj się!</p>

      <button className="auth-secondary-btn">Rejestracja</button>
    </>
  );
}
