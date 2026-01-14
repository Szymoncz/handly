import Account from "../assets/Account icon.png";
import Home from "../assets/Home icon.png";
import Main from "../assets/Main icon.png";
import "../components/footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="footer-container">
        <img src={Account} alt="Konto" class="footer-icon" />
        <img src={Home} alt="Home" class="footer-icon" />
        <img src={Main} alt="Dodaj ogłoszenie" class="footer-icon" />
      </div>
    </footer>
  );
};

export default Footer;
