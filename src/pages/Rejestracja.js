import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://apihandly.ddns.net";

export default function Rejestracja() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const credentials = btoa("admin:admin");

      const response = await fetch(`${API_BASE}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/logowanie");
        }, 2000);
      } else {
        setError(
          data.username?.[0] ||
            data.email?.[0] ||
            data.detail ||
            "Nie udało się zarejestrować..."
        );
      }
    } catch (err) {
      setError("Błąd odpowiedzi serwera... spróbuj ponownie");
      console.error("Błąd rejestracji:", err);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        Brawo! Rejestracja się powiodła! Możesz się teraz zalogować.
        <br />
        Przekierowywanie do logowania...
      </div>
    );
  }

  return (
    <>
      <div className="app">
        <div className="container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="group">
              <p className="title">Rejestracja</p>

              <input
                type="text"
                name="username"
                placeholder="Nazwa użytkownika"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Hasło"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {error && <div className="error">{error}</div>}

              <button className="register-button" type="submit">
                Zarejestruj się
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
