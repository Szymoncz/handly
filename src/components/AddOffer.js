import { useState } from "react";
import "../components/logowanie.css";

const API_URL = "https://apihandly.ddns.net/offers/";
const AUTH_HEADER = {
  Authorization: "Basic " + btoa("admin:admin"),
};

export default function AddOffer({ onOfferCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("budget", budget);
      formData.append("creator", 1);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          ...AUTH_HEADER,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(JSON.stringify(err));
      }

      setTitle("");
      setDescription("");
      setBudget("");
      setImage(null);
      setSuccess(true);
      onOfferCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-form">
      <form className="group" onSubmit={handleSubmit}>
        <div className="title">Dodaj ofertę</div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Udało się - oferta dodana</p>}

        <input
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ resize: "vertical", minHeight: "80px" }}
        />

        <input
          type="number"
          placeholder="Budżet"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div style={{ marginTop: "8px" }}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          ) : (
            <div
              style={{
                height: "150px",
                background: "#f0f0f0",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
                fontSize: "14px",
              }}
            >
              Brak zdjęcia (opcjonalne)
            </div>
          )}
        </div>

        <input
          type="submit"
          value={submitting ? "Dodawanie..." : "Dodaj ofertę"}
          disabled={submitting}
        />
      </form>
    </div>
  );
}
