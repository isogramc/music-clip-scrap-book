import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import ProfilePageKeys from './pages/ProfilePageKeys';
import Profile from './components/Profile';
import axios from 'axios';
// import LoginPage from './pages/LoginPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null);
  const remote = `${import.meta.env.VITE_APP_API_URL}/users`;
  const local = "http://localhost:5005/users";
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(remote);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
        <Route
          path="/profile"
          element={
                  <Profile render={(user) => (
                      <ProfilePage userId={user.id} image={user.image} fullName={user.fullName} />
                   )}
              />
          }
        />
        <Route
          path="/profile-keys/:songId"
          element={<Profile render={(user) =>
            <ProfilePageKeys user={user} />
          }
          />
        }
        />
        <Route path="/signup" element={<SignUpPage />} />
        {/*<Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
