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
      // Important: Use the ID from AuthContext. If not found, default to 1 for safety.
      const userId = user?.id || 1;

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
          // SEND AS URL: This matches the Hyperlinked format
          creator: `${API_BASE}/users/${userId}/`,
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
    <div
      style={{
        maxWidth: "576px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Dodaj nowe ogłoszenie</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          className="input"
          name="title"
          placeholder="Tytuł"
          onChange={handleInputChange}
          style={inputStyle}
        />
        <textarea
          className="textarea"
          name="description"
          placeholder="Opis"
          rows={5}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          className="input"
          name="budget"
          type="number"
          placeholder="Budżet (zł)"
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input type="file" multiple onChange={handleImageChange} />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {imagePreviews.map((p, i) => (
            <img
              key={i}
              src={p}
              alt="p"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          ))}
        </div>
        <button onClick={handleSubmit} style={btnStyle}>
          Dodaj robotę
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          Powrót
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  background: "#f3f4f6",
  border: "none",
};
const btnStyle = {
  padding: "12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
