import { Link } from "react-router-dom";
import "../components/logowanie.css";

export default function Logowanie() {
  const login = "admin";
  const password = "admin";

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(login + ":" + password));

  fetch("https://apihandly.ddns.net/users/", {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Wystąpił błąd: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <>
      <form className="auth-form">
        <div className="group">
          <p className="title">Zaloguj się!</p>

          <label htmlFor="login">Login</label>
          <input name="login" required />

          <label htmlFor="pass">Hasło</label>
          <input name="pass" required />

          <input type="submit" value="Zaloguj się do panelu" />
        </div>
      </form>

      <p className="auth-footer-text">Nie masz konta? Zarejestruj się!</p>
      <Link to="/rejestracja/">
        <button className="auth-secondary-btn">Rejestracja</button>
      </Link>
    </>
  );
}
