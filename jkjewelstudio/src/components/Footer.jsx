import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

const Footer = () => {
  return (
    <FadeIn>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2 className="footer-logo">JkJewelStudio</h2>
            <p>
              Beautiful handcrafted jewelry that speaks elegance and tradition.
            </p>
          </div>

          {/* <div className="footer-center">
          <ul className="footer-list">
            <li className="footer-item">
              <Link to="/" className="footer-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="footer-item">
              <Link to="/about" className="footer-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            </li>
            <li className="footer-item">
              <Link to="/gallery" className="footer-link" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
            </li>
            <li className="footer-item">
              <Link to="/contact" className="footer-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </li>
          </ul>

        </div> */}

          <div className="footer-right">
            <h3>Contact Us</h3>
            <p>Phone: +91-XXXXXXXXXX</p>
            <p>Email: contact@jkjewelstudio.com</p>
            <p>Location: Ahmedabad, Gujarat, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} JkJewelStudio. All rights
            reserved.
          </p>
        </div>
      </footer>
    </FadeIn>
  );
};

export default Footer;
