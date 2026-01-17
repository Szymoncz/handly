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
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.budget) {
      alert("Proszę wypełnić wymagane pola: Tytuł, Opis i Budżet");
      return;
    }

    try {
      console.log("Submitting offer with data:", formData);
      console.log("Current user:", user);

      // FIXED: Changed from fetch`...` to fetch(...)
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
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Offer created successfully:", data);

        // Upload images if any
        if (images.length > 0) {
          await uploadImages(data.id);
        }

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

  const uploadImages = async (offerId) => {
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("offer", offerId);
      formData.append("image", images[i]);
      formData.append("caption", `Zdjęcie ${i + 1}`);

      try {
        const response = await fetch(`${API_BASE}/offer-images/`, {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa("admin:admin"),
          },
          credentials: "include",
          body: formData,
        });

        if (!response.ok) {
          console.error("Failed to upload image", i + 1);
        }
      } catch (err) {
        console.error("Error uploading image:", err);
      }
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

        .file-input-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 100%;
        }

        .file-input-wrapper input[type=file] {
          position: absolute;
          left: -9999px;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background-color: #f3f4f6;
          padding: 12px 16px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .file-input-label:hover {
          background-color: #e5e7eb;
        }

        .image-previews {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }

        .image-preview {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
          border: 2px solid #e5e7eb;
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

          <div className="form-group">
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

          <div className="form-group">
            <label className="label">Zdjęcia</label>
            <div className="file-input-wrapper">
              <label className="file-input-label">
                📷 Wybierz zdjęcia (pierwsze będzie okładką)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Podgląd ${index + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>
            )}
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
