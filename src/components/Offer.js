import { useEffect, useState } from "react";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch("https://apihandly.ddns.net/offers/", {
          headers: {
            Authorization: "Basic " + btoa("admin:admin"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }

        const data = await response.json();
        setOffers(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  if (loading) return <p>Loading offers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Offers</h2>

      {Array.isArray(offers) &&
        offers.map((offer) => (
          <div
            key={offer.id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
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
              <strong>Created at:</strong>{" "}
              {new Date(offer.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Offers;
