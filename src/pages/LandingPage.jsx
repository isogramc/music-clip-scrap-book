import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import ProjectsList from "../components/ProjectsList";
import "./styles/LandingPage.css";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const remote = `${import.meta.env.VITE_APP_API_URL}/users`;
  const local = "http://localhost:5005/users";

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(remote);
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        console.log(user);
        setTokens(user);
        setLoggedIn(true);
        navigate("/profile", { state: { userId: user.id } });
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const closeLoginPopup = () => {
    setShowLogin(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <button onClick={() => setShowLogin(true)} className="login-btn">
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to Piano App</h1>
        <p>Learn, play, and record your own melodies with our virtual piano.</p>
        <div className="contains-proj-list">
          <ProjectsList />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </footer>

      {/* Login Pop-up */}
      {showLogin && (
        <div className="login-popup-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeLoginPopup}>X</button>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="signup-option">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


export default LandingPage;
