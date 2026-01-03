import React from "react";

export default function Logowanie() {
  return (
    <>
      <p>Zaloguj się!</p>
      <label for="login">Login</label>
      <input name="login"></input>
      <label for="pass">Hasło</label>
      <input name="pass"></input>
      <button>Zaloguj</button>
      <p>Nie masz konta? Zarejestruj się!</p>
      <button>Rejestracja</button>
    </>
  );
}
