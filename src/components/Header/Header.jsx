import "./header.css";
import { Link, useLocation } from "react-router-dom"; 
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
function Header({ 
  isLoggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isAnyModalOpen
}) {
  
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => 
    setIsMobileMenuOpen(false);
  
  const handleLogoutAndCloseMenu = () => {
    onLogout();
    closeMobileMenu();
  };
  
  const handleSignInAndCloseMenu = () => {
    onSignInClick();
    closeMobileMenu();
  };
  return (
    <header 
      className={`header ${isSavedNewsPage ? "header_theme_light" : "header_theme_dark"} ${isMobileMenuOpen ? "header_mobile-menu-open" : ""}`}
    >
      <Link to="/" className="header__logo" onClick={closeMobileMenu}>
        NewsExplorer
      </Link>
      {!isAnyModalOpen && (
        <button
          type="button"
          className={`header__menu-icon ${isMobileMenuOpen ? "header__menu-icon_close" : ""}`}
          onClick={handleToggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
        >
          <span className="header__menu-icon-line"></span>
          <span className="header__menu-icon-line"></span>
        </button>
      )}
      {isMobileMenuOpen && !isAnyModalOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}>
          <div className="navigation_mobile-open" onClick={(e) => e.stopPropagation()}>
            <div className="navigation__mobile-header">
              <span className="navigation__mobile-title">NewsExplorer</span>
              <button 
                className="navigation__mobile-close-btn" 
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              />
            </div>
            <nav className="navigation__mobile-content">
              <Navigation
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onLogout={handleLogoutAndCloseMenu}
                onSignInClick={handleSignInAndCloseMenu}
                isMobile={true}
                closeMobileMenu={closeMobileMenu}
                isSavedNewsPage={isSavedNewsPage}
              />
            </nav>
          </div>
        </div>
      )}
      <nav className="navigation">
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={onLogout}
          onSignInClick={onSignInClick}
          isMobile={false}
          isSavedNewsPage={isSavedNewsPage}
        />
      </nav>
    </header>
  );
}
export default Header;