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
    photos: "",
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
      alert("Proszę wypełnić wszystkie pola");
      return;
    }

    try {
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
          // you can later add: province, city, etc. if backend supports them
        }),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Błąd: " + JSON.stringify(error));
      }
    } catch (err) {
      console.error("Connection error:", err);
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

        body {
          background: white;
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
          padding: 0 16px 100px 16px;
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
          color: #1f2937;
        }

        .input {
          width: 100%;
          background-color: #f3f4f6;
          border: none;
          padding: 12px 16px;
          font-size: 14px;
          border-radius: 6px;
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
          border-radius: 6px;
          resize: vertical;
          min-height: 120px;
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

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 20px;
          pointer-events: none;
        }

        .footer {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 576px;
          background-color: white;
          border-top: 1px solid #e5e7eb;
          padding: 16px;
          z-index: 10;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #4b5563;
          font-size: 16px;
          font-weight: 500;
          padding: 10px 14px;
          cursor: pointer;
        }

        .btn-back:hover {
          color: #1f2937;
        }

        .btn-submit {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #3b82f6;
          color: white;
          border: none;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-submit:hover {
          background-color: #2563eb;
        }

        /* Make footer full-width on small screens */
        @media (max-width: 600px) {
          .footer {
            left: 0;
            transform: none;
            max-width: 100%;
          }
        }
      `}</style>

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

          <div className="grid-2 form-group">
            <div>
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
            <div>
              <label className="label">Kategoria</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Wyszukaj..."
                  className="input"
                />
                <span className="input-icon">›</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Zdjęcia</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="photos"
                value={formData.photos}
                onChange={handleInputChange}
                placeholder="Dodaj zdjęcia (pierwsze będzie okładką)"
                className="input"
              />
              <span className="input-icon">›</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-content">
            <button onClick={handleBack} className="btn-back">
              <span>‹</span> Powrót
            </button>
            <button onClick={handleSubmit} className="btn-submit">
              Dodaj robotę <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
