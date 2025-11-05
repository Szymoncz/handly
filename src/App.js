import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Menu from './components/Menu'
import Home from './pages/Home';
import Onas from './pages/Onas';
import Uslugi from './pages/Uslugi';
import Kontakt from './pages/Kontakt';

function App() {
  return (
      <>
          <Menu />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/o-nas/" element={<Onas />} />
              <Route path="/uslugi/" element={<Uslugi />} />
              <Route path="/kontakt/" element={<Kontakt />} />
          </Routes>
      </>
  );
}
export default App;





