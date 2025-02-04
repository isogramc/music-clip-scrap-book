
import React , {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ProfilePageKeys from './pages/ProfilePageKeys';
// import LoginPage from './pages/LoginPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
import './styles/global.css';

function App() {
  const [user, setUser] = useState({userId: 2, image: "https://res.cloudinary.com/dwyipecoa/image/upload/v1737391815/th-3544425054_iifsql.jpg"});
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage user={user}/>} />
        <Route path="/profile-keys/:songId" element={<ProfilePageKeys user={user}/>} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
