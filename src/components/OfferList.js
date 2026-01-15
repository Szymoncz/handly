import { useNavigate } from "react-router-dom";

export default function OfferList() {
  const navigate = useNavigate();

  // Sample offers data - replace with actual data from API
  const offers = [
    {
      id: 1,
      category: "Kategoria ogłoszenia",
      title: "Bardzo długi tytuł ogłoszenia wykonania prac w domu",
      addedDate: "24.12.2025",
      price: "400.00zł",
      image: "/placeholder.jpg",
    },
    {
      id: 2,
      category: "Kategoria ogłoszenia",
      title: "Krótki tytuł ogłoszenia",
      addedDate: "24.12.2025",
      price: "400.00zł",
      image: "/placeholder.jpg",
    },
    {
      id: 3,
      category: "Kategoria ogłoszenia",
      title: "Bardzo długi tytuł ogłoszenia wykonania prac w domu",
      addedDate: "24.12.2025",
      price: "400.00zł",
      image: "/placeholder.jpg",
    },
    {
      id: 4,
      category: "Kategoria ogłoszenia",
      title: "Krótki tytuł ogłoszenia",
      addedDate: "24.12.2025",
      price: "400.00zł",
      image: "/placeholder.jpg",
    },
    {
      id: 5,
      category: "Kategoria ogłoszenia",
      title: "Krótki tytuł ogłoszenia",
      addedDate: "24.12.2025",
      price: "400.00zł",
      image: "/placeholder.jpg",
    },
  ];

  const handleOfferClick = (offerId) => {
    navigate(`/offer/${offerId}`);
  };

  const handleAddOffer = () => {
    navigate("/add");
  };

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
        <div className="logo-header-list">LOGO TUTAJ</div>

        <div className="offers-section">
          <h2 className="section-title">Twoje ogłoszenia</h2>

          <button className="add-offer-btn" onClick={handleAddOffer}>
            <span>Dodaj ogłoszenie</span>
            <span style={{ fontSize: "20px" }}>+</span>
          </button>

          <div className="offers-list">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="offer-item"
                onClick={() => handleOfferClick(offer.id)}
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
                    <div className="offer-category">{offer.category}</div>
                    <div className="offer-title">{offer.title}</div>
                  </div>
                  <div className="offer-meta">
                    <span className="offer-date">
                      Dodano: {offer.addedDate}
                    </span>
                    <span className="offer-price">Płaca: {offer.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
