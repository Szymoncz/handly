import { Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <header className="container">
        <Menu />
      </header>

      <main className="container page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logowanie/" element={<Logowanie />} />
          <Route path="/rejestracja/" element={<Rejestracja />} />
          <Route path="/dashboard/" element={<Dashboard />} />
        </Routes>
      </main>

      <footer className="container footer-wrapper">
        <Footer />
      </footer>
    </div>
  );
}
export default App;
