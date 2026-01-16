import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://apihandly.ddns.net";

export default function OfferList() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const data = await response.json();
      setOffers(data.results || []);
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="offers-container">
      <div className="logo-header-list">LOGO TUTAJ</div>

      <div className="offers-section">
        <h2 className="section-title">Twoje ogłoszenia</h2>

        <button onClick={() => navigate("/add")} className="add-offer-btn">
          <span>Dodaj ogłoszenie</span>
          <span style={{ fontSize: "20px" }}>+</span>
        </button>

        <div className="offers-list">
          {offers.map((offer) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
