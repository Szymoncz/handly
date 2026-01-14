import React from "react";
import Account from "../assets/Account icon.png";
import Home from "../assets/Home icon.png";
import Main from "../assets/Main icon.png";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <img src={Account} alt="Konto" style={iconStyle} />
        <img src={Home} alt="Home" style={iconStyle} />
        <img src={Main} alt="Dodaj ogłoszenie" style={iconStyle} />
      </div>
    </footer>
  );
};

const footerStyle = {
  position: "sticky",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#ffffff",

  padding: "15px 0",
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: "768px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const iconStyle = {
  width: "32px",
  height: "32px",
  cursor: "pointer",
};

export default Footer;
