import logo from "./assets/logo.png";

export default function Navbar({currentPage}) {
  return (
    <header className="zoomie-header">
            <div className="nav-logo">
              <img src={logo} alt="Zoomie Logo" className="logo-img" />
              Zoomie 
            </div>
            <nav className="zoomie-nav">
              <a href="#about">About</a>
              <a href="#how">How It Works</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </nav>
            <a href="/chat" className="zoomie-button">Ask Zoomie AI</a>
    </header>
  );
}