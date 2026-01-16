import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE = "https://apihandly.ddns.net";

export default function OfferDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffer();
  }, [id]);

  async function fetchOffer() {
    try {
      const response = await fetch(`${API_BASE}/offers/${id}/`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
      });
      const data = await response.json();
      setOffer(data);
    } catch (err) {
      console.error("Error fetching offer:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Czy na pewno chcesz usunąć tę ofertę?")) return;

    try {
      const response = await fetch(`${API_BASE}/offers/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        alert("Błąd podczas usuwania oferty");
      }
    } catch (err) {
      console.error("Error deleting offer:", err);
      alert("Błąd połączenia z serwerem");
    }
  }

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleShare = () => {
    console.log("Share offer");
  };

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  if (!offer) {
    return <div className="error">Nie znaleziono oferty</div>;
  }

  const isMyOffer = user && offer.creator === user.id;

  return (
    <div className="detail-container">
      <div className="logo-header">LOGO TUTAJ</div>

      <div className="image-section">
        <div
          className="main-image"
          style={{
            backgroundColor: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "80px",
          }}
        >
          🖼️
        </div>
        <div className="image-counter">
          <svg className="camera-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          1/1
        </div>
      </div>

      <div className="content-section">
        <div className="meta-row">
          <span className="days-ago">
            {new Date(offer.timestamp).toLocaleDateString("pl-PL")}
          </span>
          {isMyOffer && (
            <button
              className="share-btn"
              onClick={handleDelete}
              style={{ color: "#ef4444" }}
            >
              🗑️ Usuń
            </button>
          )}
        </div>

        <h1 className="offer-title">{offer.title}</h1>

        <div className="category-row">
          <span className="category">Kategoria ogłoszenia</span>
          <span style={{ fontWeight: 600 }}>
            Budżet: {Number(offer.budget).toFixed(2)}zł
          </span>
        </div>

        <div className="description">{offer.description}</div>
      </div>

      <div className="footer-detail">
        <button onClick={handleBack} className="btn-back-detail">
          <span>‹</span>
          <span>Powrót</span>
        </button>
      </div>
    </div>
  );
}
