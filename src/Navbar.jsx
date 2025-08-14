import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";

export default function Navbar({ currentPage, userImageUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    console.log("Navbar mounted", currentPage);
    const original = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="zoomie-header" style={{ position: "relative", zIndex: 30 }}>
      {/* Left: Logo / Brand */}
      <a href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}>
        <img src={logo} alt="Zoomie Logo" className="logo-img" />
        <span>Zoomie</span>
      </a>

      {/* Primary Nav (desktop) */}
      <nav id="primary-navigation" className={`zoomie-nav ${isOpen ? "open" : ""}`}>
        {/* {currentPage !=='home' && <a href="/" onClick={closeMenu} className={currentPage === "home" ? "active" : ""}>Home</a>} */}
        {currentPage ==='home' && <a href="#about" onClick={closeMenu} className={currentPage === "about" ? "active" : ""}>About</a>}
        {currentPage ==='home' && <a href="#how" onClick={closeMenu} className={currentPage === "how" ? "active" : ""}>How It Works</a>}
        {currentPage ==='home' && <a href="#services" onClick={closeMenu} className={currentPage === "services" ? "active" : ""}>Services</a>}
        {currentPage ==='home' && <a href="#contact" onClick={closeMenu} className={currentPage === "contact" ? "active" : ""}>Contact</a>}
        {/* Ask button is hidden here on desktop (lives in actions), but shown inside dropdown on mobile via CSS below */}
        {currentPage !== 'chat' && <a href="/chat" onClick={closeMenu} className="zoomie-button nav-ask-btn--mobile">Ask Zoomie AI</a>}
      </nav>

      {/* Right (desktop): actions */}
      <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {currentPage !== 'chat' && <a href="/chat" className="zoomie-button nav-ask-btn">Ask Zoomie AI</a>}
        {/* <a href="/profile" aria-label="Profile" className="nav-avatar-link" style={{ display: "inline-flex" }}>
          <img
            src={userImageUrl || "https://cdn-icons-png.flaticon.com/512/147/147144.png"}
            alt="User avatar"
            className="nav-avatar"
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
        </a> */}
      </div>

      {/* Mobile: Hamburger button */}
      {currentPage !== 'chat' && <button
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        className="hamburger"
        onClick={() => setIsOpen((v) => !v)}
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        ☰
      </button>}

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="nav-overlay"
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 20,
          }}
        />
      )}

      {/* Inline responsive helpers (keeps desktop styles intact) */}
      <style>
        {`
          /* Desktop defaults */
          .nav-ask-btn--mobile { display: none; }

          /* Show hamburger / hide nav on small screens */
          @media (max-width: 768px) {
            /* layout: logo left, hamburger + avatar right */
            .zoomie-header {
              display: grid;
              grid-template-columns: 1fr auto auto;
              align-items: center;
              column-gap: 12px;
            }
            .hamburger { display: inline-block !important; }
            .zoomie-nav { display: none; }
            .zoomie-nav.open {
              display: flex !important;
              flex-direction: column;
              position: absolute;
              top: 60px;
              right: 12px;
              background: #202123;
              padding: 12px;
              border-radius: 10px;
              box-shadow: 0 8px 24px rgba(0,0,0,0.25);
              z-index: 30;
              gap: 10px;
              min-width: 220px;
              color: white;
            }
            .zoomie-nav.open a {
              color: white;
            }
            .zoomie-nav.open a:hover {
              color: black;
            }
            /* show Ask button inside dropdown on mobile */
            .nav-ask-btn--mobile { display: block; text-align: center; }
            /* hide desktop Ask button on mobile */
            .nav-actions .nav-ask-btn { display: none; }
          }

          /* Keep normal desktop layout */
          @media (min-width: 769px) {
            .hamburger { display: none !important; }
            .zoomie-nav {
              display: flex;
              gap: 20px;
              align-items: center;
            }
          }
        `}
      </style>
    </header>
  );
}