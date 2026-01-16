import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE = "https://apihandly.ddns.net";

export default function AddOffer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    description: "",
    budget: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.budget) {
      alert("Proszę wypełnić wymagane pola: Tytuł, Opis i Budżet");
      return;
    }

    try {
      console.log("Submitting offer with data:", formData);
      console.log("Current user:", user);

      const response = await fetch(`${API_BASE}/offers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          creator: user?.id || 1,
          budget: parseFloat(formData.budget) || 0,
          // Optional fields - only send if they have values
          ...(formData.category && { category: formData.category }),
          ...(formData.province && { province: formData.province }),
          ...(formData.city && { city: formData.city }),
          ...(formData.postalCode && { postalCode: formData.postalCode }),
          ...(formData.address && { address: formData.address }),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Offer created successfully:", data);
        navigate("/dashboard");
      } else {
        const error = await response.json();
        console.error("Error response:", error);
        alert("Błąd podczas dodawania oferty: " + JSON.stringify(error));
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
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          min-height: 100vh;
          background-color: white;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 576px;
          margin: 0 auto;
        }

        .logo-section {
          text-align: center;
          padding: 24px 0;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
        }

        .form-content {
          flex: 1;
          padding: 0 16px 96px 16px;
        }

        .page-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .label {
          display: block;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .label-required:after {
          content: " *";
          color: #ef4444;
        }

        .input {
          width: 100%;
          background-color: #f3f4f6;
          border: none;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
        }

        .input:focus {
          outline: 2px solid #d1d5db;
        }

        .input::placeholder {
          color: #9ca3af;
        }

        .textarea {
          width: 100%;
          background-color: #f3f4f6;
          border: none;
          padding: 12px 16px;
          font-size: 14px;
          resize: none;
          font-family: inherit;
          outline: none;
        }

        .textarea:focus {
          outline: 2px solid #d1d5db;
        }

        .textarea::placeholder {
          color: #9ca3af;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .grid-2-mb {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .footer {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          max-width: 576px;
          width: 100%;
          background-color: white;
          border-top: 1px solid #e5e7eb;
          padding: 16px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #4b5563;
          cursor: pointer;
          font-size: 16px;
          padding: 8px 12px;
          transition: color 0.2s;
        }

        .btn-back:hover {
          color: #1f2937;
        }

        .btn-submit {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: #3b82f6;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
          padding: 8px 24px;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .btn-submit:hover {
          background-color: #2563eb;
        }
      `}</style>

      <div className="container">
        <div className="logo-section">
          <div className="logo">LOGO</div>
        </div>

        <div className="form-content">
          <h1 className="page-title">Dodaj nowe ogłoszenie</h1>

          <div className="form-group">
            <label className="label label-required">Tytuł</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Podaj tytuł ogłoszenia"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Miejsce spotkania</label>
            <div className="grid-2-mb">
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                placeholder="Województwo"
                className="input"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Miasto"
                className="input"
              />
            </div>
            <div className="grid-2">
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Kod pocztowy"
                className="input"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Adres"
                className="input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label label-required">Opis</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Podaj opis ogłoszenia tutaj"
              rows={6}
              className="textarea"
              required
            />
          </div>

          <div className="grid-2 form-group">
            <div>
              <label className="label label-required">Budżet</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Podaj kwotę w złotówkach"
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Kategoria</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="np. Remont, Sprzątanie..."
                className="input"
              />
            </div>
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
    </>
  );
}
