import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import "../components/logowanie.css";

export default function Logowanie() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div class="app">
        <div class="container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="group">
              <p className="title">Zaloguj się!</p>

              <label>Login</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label>Hasło</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <div className="error">{error}</div>}

              <input
                type="submit"
                class="register-button"
                value="Zaloguj się do panelu"
              />
            </div>
          </form>

          <p className="auth-footer-text">Nie masz konta?</p>
          <Link to="/rejestracja">
            <button className="auth-secondary-btn">Rejestracja</button>
          </Link>
        </div>
      </div>
    </>
  );
}
