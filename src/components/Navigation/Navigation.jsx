import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/saved-news">Saved News</Link>
    </nav>
  );
}

export default Navigation;
