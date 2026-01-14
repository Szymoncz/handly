import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div class="app">
        <div class="container">
          <h1>Witamy w Handly</h1>

          <Link to="/logowanie">
            <button>Zaloguj</button>
          </Link>

          <Link to="/rejestracja">
            <button style={{ marginLeft: "12px" }}>Rejestracja</button>
          </Link>
        </div>
      </div>
    </>
  );
}
