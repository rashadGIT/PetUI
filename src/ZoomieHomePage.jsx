import React from "react";

// Basic CSS for layout and mobile responsiveness
import "./css/ZoomieHomePage.css";
import logo from "./assets/logo.png";
import Navbar from "./Navbar";

export default function ZoomieHomePage() {
  return (
    <div className="zoomie-container">
      <Navbar currentPage={"home"} />
      {/* <header className="zoomie-header">
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
      </header> */}

      <main>
        <section className="hero">
          <h1>Where Pets, Vets, and Businesses Meet</h1>
          <p>
            Zoomie connects pet owners to veterinarians and pet services—powered
            by smart AI to keep tails wagging.
          </p>
          <a href="/chat" className="zoomie-button">Ask Zoomie AI</a>
        </section>

        <section id="about" className="section">
          <h2>About Zoomie</h2>
          <p>
            Zoomie is a smart platform that brings together pet owners,
            veterinarians, and pet-related businesses. Using the power of
            technology and AI, we make pet care simple—whether you need expert
            advice, an urgent vet visit, or your favorite pet supplies.
          </p>
        </section>

        <section id="how" className="section">
          <h2>How It Works</h2>
          <div className="three-columns">
            <div className="card">
              <div className="card-icon">🐾</div>
              <h3>Find a Vet</h3>
            </div>
            <div className="card">
              <a href="/chat">
              <div className="card-icon">💬</div>
              <h3>Chat with AI</h3>
              </a>
            </div>
            <div className="card">
              <div className="card-icon">🛒</div>
              <h3>Connect to Services</h3>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <h2>Featured Services</h2>
          <div className="grid">
            <div className="card">
              <h3>Book a Vet Visit</h3>
              <p>Schedule in-clinic or virtual consultations in minutes.</p>
            </div>
            <div className="card">
              <h3>Grooming Appointments</h3>
              <p>Find trusted groomers to keep pets looking their best.</p>
            </div>
            <div className="card">
              <h3>Pet Supplies</h3>
              <p>Order food, toys & meds—delivered to your door.</p>
            </div>
            <div className="card">
              <h3>Emergency Help</h3>
              <p>24/7 support to locate the nearest emergency clinic.</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section">
          <h2>What Our Users Say</h2>
          <div className="grid">
            <blockquote>
              “Zoomie helped me get a same-day vet appointment for my dog—
              lifesaver!”
              <br />
              <cite>— Emily R.</cite>
            </blockquote>
            <blockquote>
              “The AI chat answered my cat nutrition questions instantly. So
              helpful!”
              <br />
              <cite>— Dr. Chen, DVM</cite>
            </blockquote>
          </div>
        </section>
      </main>

      <footer id="contact" className="zoomie-footer">
        <div className="footer-column">
          <h3>Zoomie</h3>
          <p>Empowering happier, healthier pets with technology.</p>
        </div>
        <div className="footer-column">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#hero">Home</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
        </div>
        <div className="footer-column">
          <form>
            <label htmlFor="newsletter">Join our newsletter (Coming Soon)</label>
            <input type="email" id="newsletter" placeholder="Email address" />
            <button type="submit" disabled>Subscribe</button>
          </form>
        </div>
      </footer>
    </div>
  );
}