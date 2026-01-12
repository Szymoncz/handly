import { useEffect, useState } from "react";
import AddOffer from "./AddOffer";

const API_URL = "https://apihandly.ddns.net/offers/";
const AUTH_HEADER = {
  Authorization: "Basic " + btoa("admin:admin"),
};

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = 1;

  async function fetchOffers() {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: AUTH_HEADER,
      });

      if (!response.ok) throw new Error("Failed to fetch offers");

      const data = await response.json();
      setOffers(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteOffer(id) {
    if (!window.confirm("Delete this offer?")) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: AUTH_HEADER,
      });

      if (!response.ok) {
        throw new Error("Failed to delete offer");
      }

      fetchOffers();
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div>
      <h2>Offers Dashboard</h2>

      <AddOffer onOfferCreated={fetchOffers} />

      {loading && <p>Loading offers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        offers.map((offer) => (
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
              <strong>Budget:</strong> ${Number(offer.budget).toFixed(2)}
            </p>

            <p>
              <strong>Creator ID:</strong> {offer.creator}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(offer.timestamp).toLocaleString()}
            </p>

            {offer.creator === currentUserId && (
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
                  fontSize: "14px",
                }}
                title="Delete offer"
              >
                ❌
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
