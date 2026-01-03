import React from "react";
import "./logowanie.css";

export default function Logowanie() {
  return (
    <>
      <form>
        <div class="group">
          <p>Zaloguj się!</p>
          <label for="login">Login</label>
          <input name="login" required />
          <label for="pass">Hasło</label>
          <input name="pass" required />
          <input type="submit" value="Zaloguj się do panelu" />
        </div>
      </form>
      <p>Nie masz konta? Zarejestruj się!</p>
      <button>Rejestracja</button>
    </>
  );
}
