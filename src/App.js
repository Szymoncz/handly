import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Onas from "./pages/Onas";
import Uslugi from "./pages/Uslugi";
import Kontakt from "./pages/Kontakt";
import Footer from "./components/Footer";
import Logowanie from "./pages/Logowanie";

function App() {
  return (
    <div className="app">
      <header className="container">
        <Menu />
      </header>

      <main className="container page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-nas/" element={<Onas />} />
          <Route path="/uslugi/" element={<Uslugi />} />
          <Route path="/kontakt/" element={<Kontakt />} />
          <Route path="/logowanie/" element={<Logowanie />} />
        </Routes>
      </main>

      <footer className="container footer-wrapper">
        <Footer />
      </footer>
    </div>
  );
}
export default App;
