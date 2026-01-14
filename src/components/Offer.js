import { useEffect, useState } from "react";
import AddOffer from "./AddOffer";

const API_URL = "https://apihandly.ddns.net/offers/";
const AUTH_HEADER = {
  Authorization: "Basic " + btoa("admin:admin"),
};

export default function Offers({
  showAdd = false,
  showDelete = false,
  currentUserId = null,
}) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOffers() {
    const response = await fetch(API_URL, { headers: AUTH_HEADER });
    const data = await response.json();
    setOffers(data.results);
  }

  async function deleteOffer(id) {
    if (!window.confirm("Jesteś pewien, że chcesz usunąć?")) return;

    const response = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: AUTH_HEADER,
    });

    if (!response.ok) {
      alert("Błąd - nie udało się usunąć oferty");
      return;
    }

    fetchOffers();
  }

  useEffect(() => {
    fetchOffers()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Ładowanie ofert...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {showAdd && <AddOffer onOfferCreated={fetchOffers} />}

      {offers.map((offer) => {
        const isMyOffer =
          showDelete && currentUserId && offer.creator === currentUserId;

        return (
          <div
            key={offer.id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
              position: "relative",
            }}
          >
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>

            <p>
              <strong>Budżet:</strong> ${Number(offer.budget).toFixed(2)}
            </p>

            <p>
              <strong>Stworzona:</strong>{" "}
              {new Date(offer.timestamp).toLocaleString()}
            </p>

            {isMyOffer && (
              <button
                onClick={() => deleteOffer(offer.id)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  border: "none",
                  background: "transparent",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
