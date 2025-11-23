import Navigation from "../Navigation/Navigation";

function Header({ onLoginClick, onRegisterClick }) {
  return (
    <header>
      <Navigation />
      <button onClick={onLoginClick}>Sign in</button>
      <button onClick={onRegisterClick}>Sign up</button>
    </header>
  );
}

export default Header;
