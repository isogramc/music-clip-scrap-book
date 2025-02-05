import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import ProfilePageKeys from './pages/ProfilePageKeys';
import axios from 'axios';
// import LoginPage from './pages/LoginPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5005/users/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage userId={user.id} />} />
        <Route path="/profile-keys/:songId" element={<ProfilePageKeys user={user} />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/*<Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage user={user}/>} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
