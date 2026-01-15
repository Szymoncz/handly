import { Link } from "react-router-dom";
import Account from "../assets/Account icon.png";
import Home from "../assets/Home icon.png";
import Main from "../assets/Main icon.png";
import "../components/footer.css";
//import { useAuth } from "../components/AuthContext";

const Footer = () => {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-container">
          <img src={Home} alt="Home" className="footer-icon" />
          <Link to="/add">
            <img src={Main} alt="Dodaj ogłoszenie" className="footer-icon" />
          </Link>
          <img src={Account} alt="Konto" className="footer-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
