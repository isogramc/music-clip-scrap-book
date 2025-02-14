import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import ProfilePageKeys from './pages/ProfilePageKeys';
import Login from './components/Login'
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/TeamPage';
import './App.css'
import './styles/global.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LoginContext from './context/LoginContext';

function App() {

  const [user, setUser] = useState({id: "", fullName: "", image: ""});
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
      setUser({id: "", fullName: "", image: ""});
      setLoggedIn(false);
      navigate("/");
  }

  const setLoggedInFunct = (userLog) => {
    console.log(userLog);
    setLoggedIn(true);
    setUser(userLog);
  }

  return (
    <>
    <LoginContext.Provider value={{...user, loggedIn}}>
      <Navbar logOut={logout} setShowLogin={setShowLogin}/>
      {showLogin && <Login setShowLogin={setShowLogin} setLoggedInFunct={setLoggedInFunct}/>}      
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route 
            path="/profile" 
            element={<ProfilePage setShowLogin={setShowLogin}/>}
          />
          <Route 
            exact path="/edit/:songId" 
            element={<ProfilePageKeys setShowLogin={setShowLogin}/> }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
       {!loggedIn && <Footer/>}
      </LoginContext.Provider>
    </>
  );
}

export default App;
