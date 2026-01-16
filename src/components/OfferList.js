import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_BASE = "https://apihandly.ddns.net";

export default function OfferList() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const response = await fetch(`${API_BASE}/offers/`, {
        headers: {
          Authorization: "Basic " + btoa("admin:admin"),
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }

      const data = await response.json();
      console.log("Fetched offers:", data);
      setOffers(data.results || []);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    if (window.confirm("Czy na pewno chcesz się wylogować?")) {
      await logout();
      navigate("/", { state: { message: "Zostałeś wylogowany" } });
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Ładowanie...</div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        Błąd: {error}
      </div>
    );
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .offers-container {
          min-height: 100vh;
          background-color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 576px;
          margin: 0 auto;
          padding-bottom: 80px;
        }

        .logo-header-list {
          text-align: center;
          padding: 16px 0;
          border-bottom: 3px solid #3b82f6;
          font-size: 18px;
          font-weight: bold;
          position: relative;
        }

        .logout-btn-header {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .logout-btn-header:hover {
          background-color: #dc2626;
        }

        .user-info {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #6b7280;
        }

        .offers-section {
          padding: 16px;
          border: 2px dotted #cbd5e1;
          margin: 16px;
          border-radius: 4px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .add-offer-btn {
          width: 100%;
          background-color: #f3f4f6;
          border: none;
          padding: 16px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          margin-bottom: 16px;
          transition: background-color 0.2s;
        }

        .add-offer-btn:hover {
          background-color: #e5e7eb;
        }

        .offer-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .offer-item:last-child {
          border-bottom: none;
        }

        .offer-item:hover {
          background-color: #f9fafb;
        }

        .offer-image {
          width: 90px;
          height: 90px;
          background-color: #cbd5e1;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .offer-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .image-placeholder {
          width: 40px;
          height: 40px;
          color: white;
        }

        .offer-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .offer-category {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .offer-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
          color: #1f2937;
        }

        .offer-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .offer-date {
          color: #6b7280;
        }

        .offer-price {
          color: #1f2937;
          font-weight: 600;
        }
      `}</style>

      <div className="offers-container">
        <div className="logo-header-list">
          {user && <span className="user-info">{user.username}</span>}
          LOGO TUTAJ
          <button className="logout-btn-header" onClick={handleLogout}>
            Wyloguj
          </button>
        </div>

        <div className="offers-section">
          <h2 className="section-title">Twoje ogłoszenia</h2>

          <button className="add-offer-btn" onClick={() => navigate("/add")}>
            <span>Dodaj ogłoszenie</span>
            <span style={{ fontSize: "20px" }}>+</span>
          </button>

          <div className="offers-list">
            {offers.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  padding: "20px",
                }}
              >
                Brak ogłoszeń
              </p>
            ) : (
              offers.map((offer) => (
                <div
                  key={offer.id}
                  className="offer-item"
                  onClick={() => navigate(`/offer/${offer.id}`)}
                >
                  <div className="offer-image">
                    <svg
                      className="image-placeholder"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="offer-content">
                    <div>
                      <div className="offer-category">Kategoria ogłoszenia</div>
                      <div className="offer-title">{offer.title}</div>
                    </div>
                    <div className="offer-meta">
                      <span className="offer-date">
                        Dodano:{" "}
                        {new Date(offer.timestamp).toLocaleDateString("pl-PL")}
                      </span>
                      <span className="offer-price">
                        Płaca: {Number(offer.budget).toFixed(2)}zł
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
