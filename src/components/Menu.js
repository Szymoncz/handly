import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Strona główna", path: "/" },
    { name: "O nas", path: "/o-nas/" },
    { name: "Usługi", path: "/uslugi/" },
    { name: "Kontakt", path: "/kontakt/" },
    { name: "Logowanie", path: "/logowanie/" },
  ];

  return (
    <nav className="menu-container">
      <div className="menu-wrapper">
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu rozwijane"
        >
          <span className={`menu-icon ${isOpen ? "open" : ""}`}></span>
        </button>
        <ul className={`menu-list ${isOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
