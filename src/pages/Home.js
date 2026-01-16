import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="app">
        <div className="container">
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
