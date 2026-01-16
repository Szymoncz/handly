import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  }, [location]);

  return (
    <>
      <div className="app">
        <div className="container">
          {message && (
            <div
              style={{
                backgroundColor: "#10b981",
                color: "white",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}

          <h1>Witamy w Handly</h1>

          <Link to="/logowanie">
            <button className="register-button">Zaloguj</button>
          </Link>

          <Link to="/rejestracja">
            <button className="register-button">Rejestracja</button>
          </Link>
        </div>
      </div>
    </>
  );
}
