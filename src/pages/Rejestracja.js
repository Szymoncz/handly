import { useState } from "react";

export default function Rejestracja() {
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://193.111.249.75:8001/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Nie udało się zarejestrować...");
      }
    } catch (err) {
      setError("Błąd odpowiedzi serwera... spróbuj ponownie");
      console.error("Błąd rejestracji:", err);
    }
  };
  if (success) {
    return (
      <div>Brawo! Rejestracja się powiodła! Możesz ise teraz zalogować</div>
    );
  }

  return (
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

        <button class="register-button" type="submit">
          Zarejestruj się
        </button>
      </div>
    </form>
  );
}
