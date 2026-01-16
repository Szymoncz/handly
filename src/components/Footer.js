import { useNavigate } from "react-router-dom";
import Account from "../assets/Account icon.png";
import Home from "../assets/Home icon.png";
import Main from "../assets/Main icon.png";
import "../components/footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="footer-main">
        <div className="footer-container">
          <img
            src={Home}
            alt="Home"
            className="footer-icon"
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          />
          <img
            src={Main}
            alt="Dodaj ogłoszenie"
            className="footer-icon"
            onClick={() => navigate("/add")}
            style={{ cursor: "pointer" }}
          />
          <img
            src={Account}
            alt="Konto"
            className="footer-icon"
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
