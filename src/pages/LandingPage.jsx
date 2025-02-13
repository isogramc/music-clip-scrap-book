import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import ProjectsList from "../components/ProjectsList";
import "./styles/LandingPage.css";

function LandingPage() {
 
  const [songs, setSongs] = useState([]);

  return (
    <div className="landing-container">

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to Piano App</h1>
        <p>Learn, play, and record your own melodies with our virtual piano.</p>
        <div className="contains-proj-list">
          <ProjectsList props={songs}/>
        </div>
      </main>
      
    </div>
  );
}


export default LandingPage;
