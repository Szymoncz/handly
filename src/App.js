import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Menu from './components/Menu'
import Home from './pages/Home';
import Onas from './pages/Onas';
import Uslugi from './pages/Uslugi';
import Kontakt from './pages/Kontakt';
import Footer from './components/Footer';

function App() {
  return (
      <div className="container">
          <div className="menu-wrapper">
          <Menu />
          </div>
          <main className="page-content">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/o-nas/" element={<Onas />} />
              <Route path="/uslugi/" element={<Uslugi />} />
              <Route path="/kontakt/" element={<Kontakt />} />
          </Routes>
          </main>
          <div className="footer-wrapper">
          <Footer />
          </div>
      </div>

  );
}
export default App;





