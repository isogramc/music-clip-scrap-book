import { useState, useContext } from "react"
import { Link } from "react-router";
import LoginContext from "../context/LoginContext";

function Navbar({logOut, setShowLogin}){

  const user = useContext(LoginContext);
  //console.log(JSON.stringify(user));

    const handleShowLogin = () => {
        setShowLogin(true);
    }

    const handleLogout = () => {
        logOut(user);
    }

     if(user.id===""){
      return (
          <nav className="navbar">
          <Link to="/"><div className="logo"></div></Link>
          <div className="nav-links">
            <button onClick={handleShowLogin} className="login-btn">
              Login
            </button>
          </div>
        </nav> )
      }

    if(user.id>=0){
      return <nav className="top-nav">
      <div className="profile-section">
        <div className="profile-circle">
          {user.image && <img src={user.image}
            alt="User profile image"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}/> }
        </div>
        <div className="welcome-message">
          <p>Welcome<br/> {user.fullName}</p>
        </div>
      </div>

      {/* Center: Logo */}

      <div className="logo"></div>
     

      {/* Right: Welcome message */}
      
      <button onClick={handleLogout}>Logout</button>
    </nav>
    }


}
export default Navbar