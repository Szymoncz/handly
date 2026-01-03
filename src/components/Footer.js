import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">Handly</div>
        <div className="footer-links">
          <a href="/handly/polityka-prywatnosci/">Polityka prywatności</a>
          <a href="/handly/regulamin/">Regulamin</a>
        </div>
      </div>
    </footer>
  );
}
