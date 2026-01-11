import { useState } from "react";

export default function AddOffer({ onOfferCreated }) {
  async function createOffer(offer) {
    const response = await fetch("https://apihandly.ddns.net/offers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin"),
      },
      body: JSON.stringify({
        title: offer.title,
        description: offer.description,
        budget: offer.budget,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return response.json();
  }

  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newOffer = await createOffer({
        creator,
        title,
        description,
        budget,
      });

      setTitle("");
      setCreator("");
      setDescription("");
      setBudget("");

      onOfferCreated(newOffer);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Dodaj ofertę</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br />

      <input
        placeholder="Creator"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
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

      <button type="submit">Dodaj ofertę</button>
    </form>
  );
}
