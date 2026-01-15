import { useState } from "react";

export default function OfferDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample data - replace with actual data from props or API
  const offer = {
    title: "Długi tytuł będzie tutaj, tak będzie wyglądać dłuższy tytuł",
    category: "Tutaj kategoria",
    daysAgo: "3 dni temu",
    images: [
      "/placeholder1.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg",
      "/placeholder4.jpg",
      "/placeholder5.jpg",
      "/placeholder6.jpg",
    ],
    description: "Tutaj będzie pełny opis oferty...",
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBack = () => {
    console.log("Going back to list");
    // Handle navigation back to offers list
  };

  const handleShare = () => {
    console.log("Share offer");
    // Handle share functionality
  };

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

        .thumbnails-container {
          display: flex;
          gap: 12px;
          padding: 16px;
          overflow-x: auto;
        }

        .thumbnail {
          min-width: 80px;
          height: 80px;
          background-color: #cbd5e1;
          border-radius: 4px;
          cursor: pointer;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: border-color 0.2s;
        }

        .thumbnail:hover {
          border-color: #3b82f6;
        }

        .thumbnail.active {
          border-color: #3b82f6;
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }

        .content-section {
          flex: 1;
          padding: 0 16px 80px 16px;
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

        .share-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 14px;
          padding: 4px 8px;
          transition: color 0.2s;
        }

        .share-btn:hover {
          color: #1f2937;
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
          max-width: 576px;
          width: 100%;
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
          <img
            src={offer.images[currentImageIndex]}
            alt="Offer"
            className="main-image"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="image-counter">
            <svg
              className="camera-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            {currentImageIndex + 1}/{offer.images.length}
          </div>
        </div>

        <div className="thumbnails-container">
          {offer.images.map((img, index) => (
            <div
              key={index}
              className={`thumbnail ${
                currentImageIndex === index ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          ))}
        </div>

        <div className="content-section">
          <div className="meta-row">
            <span className="days-ago">{offer.daysAgo}</span>
            <button className="share-btn" onClick={handleShare}>
              Udostępnij
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
          </div>

          <h1 className="offer-title">{offer.title}</h1>

          <div className="category-row">
            <span className="category">{offer.category}</span>
            <button className="share-btn" onClick={handleShare}>
              Udostępnij
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
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
