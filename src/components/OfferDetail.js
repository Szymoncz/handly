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

  // Helper to extract numeric ID from URL or Value
  const normalizeId = (val) => {
    if (!val) return null;
    if (typeof val === "string" && val.includes("/")) {
      const match = val.match(/\/users\/(\d+)\/?/);
      return match ? parseInt(match[1], 10) : null;
    }
    return parseInt(val, 10);
  };

  const fetchCreatorInfo = useCallback(async (cId) => {
    try {
      const response = await fetch(`${API_BASE}/users/${cId}/`, {
        headers: { Authorization: "Basic " + btoa("admin:admin") },
      });
      if (response.ok) setCreatorInfo(await response.json());
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchOffer = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/offers/${id}/`, {
        headers: { Authorization: "Basic " + btoa("admin:admin") },
      });
      if (res.ok) {
        const data = await res.json();
        setOffer(data);
        const extractedCreatorId = normalizeId(data.creator);
        if (extractedCreatorId) fetchCreatorInfo(extractedCreatorId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, fetchCreatorInfo]);

  useEffect(() => {
    fetchOffer();
    fetch(`${API_BASE}/offer-images/?offer=${id}`, {
      headers: { Authorization: "Basic " + btoa("admin:admin") },
    })
      .then((r) => r.json())
      .then((d) => setImages(d.results || []));
  }, [fetchOffer, id]);

  const creatorId = normalizeId(offer?.creator);
  const loggedInUserId = normalizeId(user?.id);
  const isMyOffer = creatorId && loggedInUserId && creatorId === loggedInUserId;

  const handleDelete = async () => {
    if (!window.confirm("Usunąć ofertę?")) return;
    const res = await fetch(`${API_BASE}/offers/${id}/`, {
      method: "DELETE",
      headers: { Authorization: "Basic " + btoa("admin:admin") },
    });
    if (res.ok) {
      alert("Usunięto");
      navigate("/dashboard");
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Ładowanie...</div>
    );
  if (!offer)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Nie znaleziono oferty
      </div>
    );

  return (
    <>
      <style>{`
        .detail-container { min-height: 100vh; background-color: white; max-width: 576px; margin: 0 auto; font-family: sans-serif; }
        .logo-header { text-align: center; padding: 16px 0; border-bottom: 3px solid #3b82f6; font-weight: bold; }
        .image-section { position: relative; background-color: #cbd5e1; width: 100%; height: 280px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .main-image { width: 100%; height: 100%; object-fit: cover; }
        .content-section { padding: 16px; padding-bottom: 100px; }
        .meta-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px dotted #d1d5db; }
        .delete-btn { background-color: #ef4444; border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
        .offer-title { font-size: 18px; font-weight: 600; margin: 16px 0; }
        .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dotted #d1d5db; font-size: 14px; }
        .description-section { margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px; }
        .footer-detail { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); max-width: 576px; width: 100%; background: white; border-top: 1px solid #e5e7eb; padding: 16px; }
      `}</style>
      <div className="detail-container">
        <div className="logo-header">LOGO TUTAJ</div>
        <div className="image-section">
          {images[currentImageIndex] ? (
            <img src={images[currentImageIndex].image} className="main-image" />
          ) : (
            <div style={{ fontSize: "40px" }}>🖼️</div>
          )}
        </div>
        <div className="content-section">
          <div className="meta-row">
            <span style={{ color: "#6b7280" }}>
              Dodano: {new Date(offer.timestamp).toLocaleDateString()}
            </span>
            {isMyOffer && (
              <button className="delete-btn" onClick={handleDelete}>
                🗑️ Usuń ofertę
              </button>
            )}
          </div>
          <h1 className="offer-title">{offer.title}</h1>
          {creatorInfo && (
            <div className="info-row">
              <span>Zleceniodawca:</span>
              <strong>{creatorInfo.username}</strong>
            </div>
          )}
          <div className="info-row">
            <span>Budżet:</span>
            <strong>{offer.budget} zł</strong>
          </div>
          <div className="description-section">
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Opis:</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{offer.description}</div>
          </div>
        </div>
        <div className="footer-detail">
          <button
            onClick={() => navigate("/dashboard")}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            ‹ Powrót
          </button>
        </div>
      </div>
    </>
  );
}
