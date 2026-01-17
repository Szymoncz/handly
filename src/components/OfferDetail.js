import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE = "https://apihandly.ddns.net";

export default function OfferDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper to extract numeric ID from URL or String
  const extractId = (data) => {
    if (!data) return null;
    if (typeof data === "number") return data;
    if (typeof data === "string") {
      const match = data.match(/\/users\/(\d+)\/?/);
      return match ? parseInt(match[1], 10) : parseInt(data, 10) || null;
    }
    return null;
  };

  const fetchCreatorInfo = useCallback(async (creatorId) => {
    if (!creatorId) return;
    try {
      const response = await fetch(`${API_BASE}/users/${creatorId}/`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCreatorInfo(data);
      }
    } catch (err) {
      console.error("Error fetching creator info:", err);
    }
  }, []);

  const fetchOfferImages = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/offer-images/?offer=${id}`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data.results || []);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  }, [id]);

  const fetchOffer = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/offers/${id}/`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch offer");

      const data = await response.json();
      setOffer(data);

      const creatorId = extractId(data.creator);
      if (creatorId) {
        fetchCreatorInfo(creatorId);
      }
    } catch (err) {
      console.error("Error fetching offer:", err);
    } finally {
      setLoading(false);
    }
  }, [id, fetchCreatorInfo]);

  useEffect(() => {
    fetchOffer();
    fetchOfferImages();
  }, [fetchOffer, fetchOfferImages]);

  // Ownership Check Logic
  const creatorId = extractId(offer?.creator);
  const loggedInUserId = extractId(user?.id);
  const isMyOffer = creatorId && loggedInUserId && creatorId === loggedInUserId;

  async function handleDelete() {
    if (!window.confirm("Czy na pewno chcesz usunąć tę ofertę?")) return;

    try {
      const response = await fetch(`${API_BASE}/offers/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
      });

      if (response.ok || response.status === 204) {
        alert("Oferta została usunięta");
        navigate("/dashboard");
      } else {
        alert("Błąd podczas usuwania oferty");
      }
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  }

  if (loading)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Ładowanie...</div>
    );
  if (!offer)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Nie znaleziono oferty
      </div>
    );

  const currentImage = images.length > 0 ? images[currentImageIndex] : null;

  return (
    <>
      <style>{`
        .detail-container { min-height: 100vh; background-color: white; max-width: 576px; margin: 0 auto; font-family: sans-serif; }
        .logo-header { text-align: center; padding: 16px 0; border-bottom: 3px solid #3b82f6; font-weight: bold; }
        .image-section { position: relative; background-color: #cbd5e1; width: 100%; height: 280px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .main-image { width: 100%; height: 100%; object-fit: cover; }
        .image-counter { position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); color: white; padding: 6px 12px; border-radius: 4px; font-size: 14px; }
        .thumbnails-container { display: flex; gap: 12px; padding: 16px; overflow-x: auto; }
        .thumbnail { min-width: 80px; height: 80px; background: #cbd5e1; border-radius: 4px; cursor: pointer; border: 2px solid transparent; }
        .thumbnail.active { border-color: #3b82f6; }
        .content-section { padding: 0 16px 80px; }
        .meta-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px dotted #d1d5db; }
        .delete-btn { background: #ef4444; border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
        .offer-title { font-size: 20px; font-weight: 600; margin: 16px 0; }
        .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dotted #d1d5db; font-size: 14px; }
        .info-label { color: #6b7280; }
        .description-section { margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .description { white-space: pre-wrap; line-height: 1.6; }
        .footer-detail { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); max-width: 576px; width: 100%; background: white; border-top: 1px solid #e5e7eb; padding: 16px; }
        .btn-back { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 16px; }
      `}</style>

      <div className="detail-container">
        <div className="logo-header">LOGO TUTAJ</div>

        <div className="image-section">
          {currentImage ? (
            <img src={currentImage.image} alt="Oferta" className="main-image" />
          ) : (
            <div style={{ fontSize: "40px" }}>🖼️</div>
          )}
          <div className="image-counter">
            📷{" "}
            {images.length > 0
              ? `${currentImageIndex + 1}/${images.length}`
              : "0/0"}
          </div>
        </div>

        {images.length > 0 && (
          <div className="thumbnails-container">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`thumbnail ${currentImageIndex === idx ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <img
                  src={img.image}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="thumb"
                />
              </div>
            ))}
          </div>
        )}

        <div className="content-section">
          <div className="meta-row">
            <span style={{ color: "#6b7280" }}>
              Dodano: {new Date(offer.timestamp).toLocaleDateString("pl-PL")}
            </span>
            {isMyOffer && (
              <button className="delete-btn" onClick={handleDelete}>
                🗑️ Usuń moją ofertę
              </button>
            )}
          </div>

          <h1 className="offer-title">{offer.title}</h1>

          {creatorInfo && (
            <div className="info-row">
              <span className="info-label">Zleceniodawca:</span>
              <span style={{ fontWeight: "bold" }}>{creatorInfo.username}</span>
            </div>
          )}

          <div className="info-row">
            <span className="info-label">Budżet:</span>
            <span style={{ fontWeight: "bold" }}>
              {Number(offer.budget).toFixed(2)} zł
            </span>
          </div>

          <div className="description-section">
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Opis:</div>
            <div className="description">{offer.description}</div>
          </div>
        </div>

        <div className="footer-detail">
          <button onClick={() => navigate("/dashboard")} className="btn-back">
            ‹ Powrót
          </button>
        </div>
      </div>
    </>
  );
}
