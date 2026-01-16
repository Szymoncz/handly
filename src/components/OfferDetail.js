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
  const [deleting, setDeleting] = useState(false);

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

      if (!response.ok) throw new Error("Failed to fetch offer");

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

    setDeleting(true);

    try {
      const response = await fetch(`${API_BASE}/offers/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
      });

      if (response.ok) {
        alert("Oferta została usunięta pomyślnie");
        navigate("/dashboard"); // or navigate(-1) to go back
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(
          errorData.detail || "Nie udało się usunąć oferty – spróbuj ponownie"
        );
      }
    } catch (err) {
      console.error("Error deleting offer:", err);
      alert("Błąd połączenia z serwerem");
    } finally {
      setDeleting(false);
    }
  }

  const handleBack = () => {
    navigate("/dashboard"); // or navigate(-1)
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

  const isMyOffer = user && offer.creator === user.id;

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

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          padding: 0 16px 96px 16px; /* more space for footer */
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
          background: #fee2e2;
          color: #ef4444;
          border: 1px solid #fecaca;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn:hover:not(:disabled) {
          background: #fecaca;
          border-color: #f87171;
        }

        .delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .offer-title {
          font-size: 18px;
          font-weight: 600;
          margin: 16px 0;
          line-height: 1.4;
        }

        .category-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .category {
          color: #6b7280;
          font-size: 14px;
        }

        .description {
          margin-top: 24px;
          color: #374151;
          font-size: 15px;
          line-height: 1.6;
        }

        .footer-detail {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 576px;
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
              <button
                className="delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Usuwanie..." : "🗑️ Usuń"}
              </button>
            )}
          </div>

          <h1 className="offer-title">{offer.title}</h1>

          <div className="category-row">
            <span className="category">Kategoria ogłoszenia</span>
            <span style={{ fontWeight: 600 }}>
              Budżet: {Number(offer.budget).toFixed(2)} zł
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
    </>
  );
}
