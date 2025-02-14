import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import ProjectsList from "../components/ProjectsList";
import "./styles/LandingPage.css";

function LandingPage() {

  return (
    <div className="landing-container">

      {/* Main Content */}
      <main className="main-content" style={{marginTop: '30px'}}>
        <h1>Welcome Piano Tutor</h1>
        <p>Learn, play, and record your own melodies with our virtual piano.</p>
        <div className="contains-proj-list">
          <ProjectsList />
        </div>
      </main>
      
    </div>
  );
}


export default LandingPage;
