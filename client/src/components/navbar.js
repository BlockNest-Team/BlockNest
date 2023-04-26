// src/components/Navbar.js

import React, { useState } from 'react';
import '../styles/components/navbar.scss';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">BlockNest</div>
      <ul className={`navbar__links ${mobileMenuOpen ? 'open' : ''}`}>
        <li className="navbar__item">
          <a href="#" className="navbar__link">Home</a>
        </li>
        <li className="navbar__item">
          <a href="#" className="navbar__link">Wallet</a>
        </li>
        <li className="navbar__item">
          <a href="#" className="navbar__link">Friends</a>
        </li>
        <li className="navbar__item">
          <a href="#" className="navbar__link">Messages</a>
        </li>
      </ul>
          <button className="navbar__connect-btn">Connect Wallet</button>
          {/* <button
              className="button is-white connect-wallet"
              onClick={connectWallet}
            >
              <span className="is-link has-text-weight-bold">
                {walletAddress && walletAddress.length > 0
                  ? `Connected: ${walletAddress.substring(
                      0,
                      6
                    )}...${walletAddress.substring(38)}`
                  : "Connect Wallet"}
              </span>
            </button> */}
      <div
        className={`navbar__hamburger ${mobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
