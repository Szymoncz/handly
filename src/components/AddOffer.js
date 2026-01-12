import { useState } from "react";

const API_URL = "https://apihandly.ddns.net/offers/";
const AUTH_HEADER = {
  Authorization: "Basic " + btoa("admin:admin"),
};

export default function AddOffer({ onOfferCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setSubmitting(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...AUTH_HEADER,
        },
        body: JSON.stringify({
          title,
          description,
          budget,
          creator: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      setTitle("");
      setDescription("");
      setBudget("");

      setSuccess(true);

      onOfferCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
      <h3>Add Offer</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Offer added successfully!</p>}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <br />

      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />

      <br />

      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Offer"}
      </button>
    </form>
  );
}
