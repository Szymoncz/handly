import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const menuItems = [
    { name: "Strona główna", path: "/handly/"},
    { name: "O nas", path: "/handly/o-nas/"},
    { name: "Usługi", path: "/handly/uslugi/"},
    { name: "Kontakt", path: "/handly/kontakt/"},
];


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="menu-container">
            <div className="menu-wrapper">
                <button className={`hamburger ${isOpen ? "active": ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu rozwijane"
                        >
                    <span></span>
                    <span></span>
                    <span></span>
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