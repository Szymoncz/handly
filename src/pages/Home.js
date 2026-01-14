import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div class="app">
        <div class="container">
          <h1>Witamy w Handly</h1>

          <Link to="/logowanie">
            <button class="register-button">Zaloguj</button>
          </Link>

          <Link to="/rejestracja">
            <button class="register-button">Rejestracja</button>
          </Link>
        </div>
      </div>
    </>
  );
}
