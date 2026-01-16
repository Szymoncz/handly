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
  const [creatorInfo, setCreatorInfo] = useState(null);

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

      if (!response.ok) {
        throw new Error("Failed to fetch offer");
      }

      const data = await response.json();
      console.log("=== OFFER DETAIL DEBUG ===");
      console.log("Fetched offer:", data);
      console.log("Current user:", user);
      console.log("Offer creator (raw):", data.creator);
      console.log("User ID (raw):", user?.id);
      console.log(
        "Types - creator:",
        typeof data.creator,
        "user.id:",
        typeof user?.id
      );

      setOffer(data);

      // Fetch creator info
      if (data.creator) {
        // Extract ID from URL if creator is a URL
        let creatorId = data.creator;
        if (
          typeof data.creator === "string" &&
          data.creator.includes("/users/")
        ) {
          const match = data.creator.match(/\/users\/(\d+)\//);
          if (match) {
            creatorId = parseInt(match[1]);
          }
        }
        console.log("Extracted creator ID:", creatorId);
        fetchCreatorInfo(creatorId);
      }
    } catch (err) {
      console.error("Error fetching offer:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCreatorInfo(creatorId) {
    try {
      const response = await fetch(`${API_BASE}/users/${creatorId}/`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Creator info:", data);
        setCreatorInfo(data);
      }
    } catch (err) {
      console.error("Error fetching creator info:", err);
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

      if (response.ok || response.status === 204) {
        alert("Oferta została usunięta");
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

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Ładowanie...</div>
    );
  }

  if (!offer) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Nie znaleziono oferty
      </div>
    );
  }

  // Multiple ways to check if this is the user's offer
  let isMyOffer = false;

  if (user) {
    // Check direct ID match
    if (offer.creator === user.id) {
      isMyOffer = true;
    }

    // Check if creator is a URL containing user ID
    if (
      typeof offer.creator === "string" &&
      offer.creator.includes(`/users/${user.id}/`)
    ) {
      isMyOffer = true;
    }

    // Check if creator matches user URL
    if (user.url && offer.creator === user.url) {
      isMyOffer = true;
    }

    // Check with creatorInfo
    if (creatorInfo && creatorInfo.id === user.id) {
      isMyOffer = true;
    }
  }

  console.log("=== OWNERSHIP CHECK ===");
  console.log("Is my offer?", isMyOffer);
  console.log("Delete button will show:", isMyOffer);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .detail-container {
          min-height: 100vh;
          background-color: white;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 576px;
          margin: 0 auto;
        }

        .logo-header {
          text-align: center;
          padding: 16px 0;
          border-bottom: 3px solid #3b82f6;
          font-size: 18px;
          font-weight: bold;
        }

        .image-section {
          position: relative;
          background-color: #cbd5e1;
          width: 100%;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-counter {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .camera-icon {
          width: 16px;
          height: 16px;
        }

        .content-section {
          flex: 1;
          padding: 0 16px 80px 16px;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px dotted #d1d5db;
        }

        .days-ago {
          color: #6b7280;
          font-size: 14px;
        }

        .delete-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: #ef4444;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .delete-btn:hover {
          background-color: #dc2626;
        }

        .offer-title {
          font-size: 18px;
          font-weight: 600;
          margin: 16px 0;
          line-height: 1.4;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px dotted #d1d5db;
        }

        .info-label {
          color: #6b7280;
          font-size: 14px;
          min-width: 140px;
        }

        .info-value {
          font-weight: 500;
          font-size: 14px;
          text-align: right;
          flex: 1;
        }

        .description-section {
          margin-top: 24px;
          padding: 16px;
          background-color: #f9fafb;
          border-radius: 8px;
        }

        .description-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1f2937;
        }

        .description {
          color: #374151;
          font-size: 15px;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .footer-detail {
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

        .btn-back-detail {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 16px;
          padding: 8px 12px;
          transition: color 0.2s;
        }

        .btn-back-detail:hover {
          color: #1f2937;
        }
      `}</style>

      <div className="detail-container">
        <div className="logo-header">LOGO TUTAJ</div>

        <div className="image-section">
          <div style={{ fontSize: "80px" }}>🖼️</div>
          <div className="image-counter">
            <svg
              className="camera-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            1/1
          </div>
        </div>

        <div className="content-section">
          <div className="meta-row">
            <span className="days-ago">
              Dodano: {new Date(offer.timestamp).toLocaleDateString("pl-PL")}
            </span>
            {isMyOffer && (
              <button className="delete-btn" onClick={handleDelete}>
                🗑️ Usuń
              </button>
            )}
          </div>

          <h1 className="offer-title">{offer.title}</h1>

          {creatorInfo && (
            <div className="info-row">
              <span className="info-label">Zleceniodawca:</span>
              <span className="info-value">{creatorInfo.username}</span>
            </div>
          )}

          <div className="info-row">
            <span className="info-label">Budżet:</span>
            <span className="info-value">
              {Number(offer.budget).toFixed(2)} zł
            </span>
          </div>

          {offer.category && (
            <div className="info-row">
              <span className="info-label">Kategoria:</span>
              <span className="info-value">{offer.category}</span>
            </div>
          )}

          {offer.province && (
            <div className="info-row">
              <span className="info-label">Województwo:</span>
              <span className="info-value">{offer.province}</span>
            </div>
          )}

          {offer.city && (
            <div className="info-row">
              <span className="info-label">Miasto:</span>
              <span className="info-value">{offer.city}</span>
            </div>
          )}

          {offer.postalCode && (
            <div className="info-row">
              <span className="info-label">Kod pocztowy:</span>
              <span className="info-value">{offer.postalCode}</span>
            </div>
          )}

          {offer.address && (
            <div className="info-row">
              <span className="info-label">Adres:</span>
              <span className="info-value">{offer.address}</span>
            </div>
          )}

          <div className="info-row">
            <span className="info-label">Data dodania:</span>
            <span className="info-value">
              {new Date(offer.timestamp).toLocaleString("pl-PL")}
            </span>
          </div>

          <div className="description-section">
            <div className="description-title">Opis:</div>
            <div className="description">{offer.description}</div>
          </div>
        </div>

        <div className="footer-detail">
          <button onClick={handleBack} className="btn-back-detail">
            <span>‹</span>
            <span>Powrót</span>
          </button>
        </div>
      </div>
    </>
  );
}
