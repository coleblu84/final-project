import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2025 News Explorer</p>

      <nav className="footer__nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <a href="https://github.com/coleblu84" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
