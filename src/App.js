import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Menu from './components/Menu'
import Home from './pages/Home';
import Onas from './pages/Onas';
import Uslugi from './pages/Uslugi';
import Kontakt from './pages/Kontakt';
function App() {
  return (
      <Router>
          <Menu />
          <Routes>
              <Route path="/handly" element={<Home />} />
              <Route path="/handly/o-nas" element={<Onas />} />
              <Route path="/handly/uslugi" element={<Uslugi />} />
              <Route path="/handly/kontakt" element={<Kontakt />} />
          </Routes>
      </Router>
  );
}
export default App;





