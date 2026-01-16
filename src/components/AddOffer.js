import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE = "https://apihandly.ddns.net";

export default function AddOffer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE}/offers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          creator: user?.id || 1,
          budget: parseFloat(formData.budget) || 0,
        }),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        alert("Błąd podczas dodawania oferty");
      }
    } catch (err) {
      console.error("Error creating offer:", err);
      alert("Błąd połączenia z serwerem");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="logo-section">
        <div className="logo">LOGO</div>
      </div>

      <div className="form-content">
        <h1 className="page-title">Dodaj nowe ogłoszenie</h1>

        <div className="form-group">
          <label className="label">Tytuł</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Podaj tytuł ogłoszenia"
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Opis</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Podaj opis ogłoszenia tutaj"
            rows={6}
            className="textarea"
          />
        </div>

        <div className="form-group">
          <label className="label">Budżet</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Podaj kwotę w złotówkach"
            className="input"
          />
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <button onClick={handleBack} className="btn-back">
            <span>‹</span>
            <span>Powrót</span>
          </button>
          <button onClick={handleSubmit} className="btn-submit">
            <span>Dodaj robotę</span>
            <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
