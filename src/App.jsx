import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import ProfilePageKeys from './pages/ProfilePageKeys';
import Profile from './components/Profile'
import AboutPage from './pages/AboutPage';
// import LoginPage from './pages/LoginPage';
import ContactPage from './pages/TeamPage';
import './App.css'
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null);

  return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route 
          path="/profile" 
          element={<ProfilePage userId={user}/>}
        />  
        <Route 
          path="/profile-keys/:songId" 
          element={<ProfilePageKeys user={user} /> }
        />  
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
  );
}

export default App;
