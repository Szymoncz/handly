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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.budget) {
      alert("Proszę wypełnić wymagane pola: Tytuł, Opis i Budżet");
      return;
    }

    try {
      // BACKEND EXPECTS INTEGER ID
      const userId = user?.id ? parseInt(user.id, 10) : 1;

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
          creator: userId, // FIXED: Sending integer ID, not URL
          budget: parseFloat(formData.budget) || 0,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (images.length > 0) await uploadImages(data.id);
        navigate("/dashboard");
      } else {
        const error = await response.json();
        alert("Błąd: " + JSON.stringify(error));
      }
    } catch (err) {
      console.error("Error creating offer:", err);
      alert("Błąd połączenia z serwerem");
    }
  };

  const uploadImages = async (offerId) => {
    for (let i = 0; i < images.length; i++) {
      const fd = new FormData();
      fd.append("offer", offerId);
      fd.append("image", images[i]);
      fd.append("caption", `Zdjęcie ${i + 1}`);

      await fetch(`${API_BASE}/offer-images/`, {
        method: "POST",
        headers: { Authorization: "Basic " + btoa("admin:admin") },
        credentials: "include",
        body: fd,
      });
    }
  };

  return (
    <>
      <style>{`
        .container { min-height: 100vh; background-color: white; max-width: 576px; margin: 0 auto; font-family: sans-serif; }
        .logo-section { text-align: center; padding: 24px 0; font-size: 24px; font-weight: bold; }
        .form-content { padding: 0 16px 96px 16px; }
        .form-group { margin-bottom: 24px; }
        .label { display: block; font-size: 16px; font-weight: 500; margin-bottom: 8px; }
        .input, .textarea { width: 100%; background-color: #f3f4f6; border: none; padding: 12px 16px; font-size: 14px; outline: none; }
        .image-previews { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px; margin-top: 12px; }
        .footer { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); max-width: 576px; width: 100%; background: white; border-top: 1px solid #e5e7eb; padding: 16px; display: flex; justify-content: space-between; }
        .btn-submit { background-color: #3b82f6; color: white; border: none; padding: 8px 24px; border-radius: 6px; cursor: pointer; }
      `}</style>
      <div className="container">
        <div className="logo-section">LOGO</div>
        <div className="form-content">
          <div className="form-group">
            <label className="label">Tytuł</label>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Opis</label>
            <textarea
              name="description"
              onChange={handleInputChange}
              className="textarea"
              rows={5}
            />
          </div>
          <div className="form-group">
            <label className="label">Budżet</label>
            <input
              type="number"
              name="budget"
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Zdjęcia</label>
            <input type="file" multiple onChange={handleImageChange} />
            <div className="image-previews">
              {imagePreviews.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => navigate("/dashboard")}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            ‹ Powrót
          </button>
          <button onClick={handleSubmit} className="btn-submit">
            Dodaj robotę ›
          </button>
        </div>
      </div>
    </>
  );
}
