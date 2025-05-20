import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { cartCount } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img className="logo" src="/logo.svg" alt="Jkjewelstudio Logo" />
          <span className="sr-only">Jkjewelstudio</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jewellery" className="nav-link" onClick={toggleMenu}>
                Jewellery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link" onClick={toggleMenu}>
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={toggleMenu}>
                Contact
              </Link>
            </li>

            {/* Cart Link */}
            <li className="nav-item cart-link">
              <Link to="/cart" className="nav-link" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12-2h14l1.5-9H6l-1.5-4H1v2h2l3.6 7.59-1.35 2.44C5.16 16.37 5 16.68 5 17c0 1.104.896 2 2 2h12v-2H7z" />
                </svg>{" "}
                <span>

                {cartCount}
                </span>
              </Link>
            </li>

            {/* Conditionally show Log In / Log Out */}
            {/* {!isAuthenticated ? (
              <li className="nav-item">
                <button
                  onClick={() =>
                    loginWithRedirect({
                      authorizationParams: {
                        redirect_uri: `${window.location.origin}/profile`,
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                        scope: "openid profile email read:current_user",
                      },
                    })
                  }
                  className="login-button"
                >
                  Log In
                </button>
              </li>
            ) : (
              <li className="nav-item nav-profile">
                <Link to="/profile" className="nav-link" onClick={toggleMenu}>
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="profile-picture"
                  />
                  <span className="profile-name">{user?.name}</span>
                </Link>
              </li>
            )} */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
