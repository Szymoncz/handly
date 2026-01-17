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

  // --- CRITICAL ID EXTRACTION LOGIC ---
  const normalizeId = (val) => {
    if (!val) return null;
    if (typeof val === "string" && val.includes("/")) {
      const parts = val.split("/").filter(Boolean);
      const lastPart = parts[parts.length - 1];
      return parseInt(lastPart, 10);
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
        const cId = normalizeId(data.creator);
        if (cId) fetchCreatorInfo(cId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, fetchCreatorInfo]);

  useEffect(() => {
    fetchOffer();
    // Fetch images logic...
    fetch(`${API_BASE}/offer-images/?offer=${id}`, {
      headers: { Authorization: "Basic " + btoa("admin:admin") },
    })
      .then((r) => r.json())
      .then((d) => setImages(d.results || []));
  }, [fetchOffer, id]);

  // Ownership Check
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
      <div style={{ textAlign: "center", padding: "50px" }}>Brak oferty</div>
    );

  return (
    <div
      style={{
        maxWidth: "576px",
        margin: "0 auto",
        paddingBottom: "100px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          height: "250px",
          background: "#cbd5e1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images[currentImageIndex] ? (
          <img
            src={images[currentImageIndex].image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "🖼️"
        )}
      </div>

      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span style={{ color: "#6b7280" }}>
            {new Date(offer.timestamp).toLocaleDateString()}
          </span>
          {isMyOffer && (
            <button
              onClick={handleDelete}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Usuń moją ofertę
            </button>
          )}
        </div>

        <h1 style={{ fontSize: "22px" }}>{offer.title}</h1>
        <p style={{ margin: "20px 0", lineHeight: "1.6" }}>
          {offer.description}
        </p>
        <div style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
          <strong>Zleceniodawca:</strong> {creatorInfo?.username || "..."}{" "}
          <br />
          <strong>Budżet:</strong> {offer.budget} zł
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
        }}
      >
        Powrót
      </button>
    </div>
  );
}
