import React from "react";
import "./styles/AboutPage.css";
import { useNavigate } from "react-router";

function AboutPage() {

  const navigate = useNavigate();
  const goBack = () => navigate('/');

  return (
    <div className="about-page">
      <div className="about-wrapper">
      <h1>Iron Project:</h1>
      <p>
      The Piano Tutor App aims to provide users with a platform for 
      learning piano through interactive features, sharing and musical 
      "play-alongs". By integrating with a web audio framework, users can 
      experience a responsive and engaging learning environment.
      </p>
      <h2>Iron Team:</h2>
      <p>
      Trix and Paulo are two aspiring developers at the beginning of 
      their journey in the tech world.
      </p>

      <p>
      With creativity as their driving force, 
      they are passionate about coding and constantly seeking opportunities
       to learn and grow. Together, they share a vision of building a 
       bright and successful future as innovative and impactful developers.
      </p>
      </div>
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
        <div style={{width: '120px'}}><button onClick={goBack}>&larr; Back</button></div>
      </div>

      <div style={{display: 'flex', flexDirection: "column", textAlign: 'center'}}>
        <div><iframe
          src="https://prezi.com/p/embed/mY6IVXCcNhuXQYL3ZXEM/"
          id="iframe_container"
          frameborder="0"
          webkitallowfullscreen=""
          mozallowfullscreen=""
          allowfullscreen=""
          allow="autoplay; fullscreen"
          height="315"
          width="560"
        ></iframe>
        </div>   
      </div>
    
    </div>
  );
}