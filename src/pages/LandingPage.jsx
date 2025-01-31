import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';


function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Piano App</div>
        <div className="nav-links">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/profile" className="profile-btn">Profile</Link>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to Piano App</h1>
        <p>Learn, play, and record your own melodies with our virtual piano.</p>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </footer>
    </div>
  );
}

export default LandingPage;