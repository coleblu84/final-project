import "./footer.css";
import GithubIcon from "../../assets/Github.jpg";
import LinkedinIcon from "../../assets/Linkedin.svg";
import TripleTenIcon from "../../assets/TripleTen.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © 2025 Supersite, Powered by News API
        </p>

        <nav className="footer__nav">
          <a href="#" className="footer__link">
            Home
          </a>

          <a
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TripleTen"
            className="footer__link footer__link--with-icon"
          >
            <img
              src={TripleTenIcon}
              alt="TripleTen"
              width="20"
              height="20"
              className="footer__icon"
            />
          </a>
        </nav>

        <div className="footer__social">
          <a
            href="https://github.com/coleblu84"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="footer__social-link"
          >
            <img src={GithubIcon} alt="GitHub" width="24" height="24" />
          </a>

          <a
            href="https://www.linkedin.com/in/coleblu84/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="footer__social-link"
          >
            <img src={LinkedinIcon} alt="LinkedIn" width="24" height="24" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
