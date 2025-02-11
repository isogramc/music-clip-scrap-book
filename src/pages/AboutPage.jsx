import React from "react";
import "./styles/AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <h1>Iron Project:</h1>
      <p>
      The Piano Tutor App aims to provide users with a platform for 
      learning piano through interactive features, sharing and musical 
      "play-alongs". By integrating with a web audio framework, users can 
      experience a responsive and engaging learning environment.
      </p>
      <h2>Iron Team:</h2>
      <p>
      Paulo and Trix are two aspiring developers at the beginning of 
      their journey in the tech world.
      </p>

      <p>
      With creativity as their driving force, 
      they are passionate about coding and constantly seeking opportunities
       to learn and grow. Together, they share a vision of building a 
       bright and successful future as innovative and impactful developers.
      </p>
      <h2>Find them:</h2>
      <div className="team-links">
        <div className="team-member">
          <h2>Paulo</h2>
          <a href="https://github.com/paulroar" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/paulo-prado-a2a37157/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h2>Trix Mostert</h2>
          <a href="https://github.com/isogramc" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/trixmostert/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    
    </div>
  );
}

export default AboutPage;