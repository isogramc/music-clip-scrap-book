import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';

function Login({ setShowLogin, setLoggedInFunct }){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [aUser, setAUser] = useState(null);
    const navigate = useNavigate();

    const remote = `${import.meta.env.VITE_APP_API_URL}/users`;

    const setTokens = (data) => {
       setLoggedInFunct(data);
       localStorage.setItem("tokens", JSON.stringify(data));
    }

  function stringToHex(str) {
      let hex = '';
      for (let i = 0; i < str.length; i++) {
          const charCode = str.charCodeAt(i);
          const hexValue = charCode.toString(16);
          hex += hexValue.padStart(2, '0');
      }
      return hex;
  }

    const handleClose = () => {
      console.log('close');
      setShowLogin(false);
    }
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      
      
       try {
        //const hashDigest = stringToHex(password + "1994ilovechocolate");
        const response = await axios.get(remote);

        console.log(response);
        console.log("done=>", email, password);

        const user = response.data.find(
          (u) => u.email === email && u.password == password
        )
          //setAUser(user);

          if (user) {
            console.log(user);
            setTokens(user);
            navigate("/profile");
            handleClose();
          }
 
      } catch (err) {
        setError("Login failed. Please try again.");
      }
    };
  
    const closeLoginPopup = () => {
      handleClose();
      setEmail("");
      setPassword("");
      setError("");
    };


    return(
        <>
            <div className="login-popup-overlay" onClick={handleClose}>
              <div className="login-popup" onClick={(e) => e.stopPropagation()}>
                <div className="btn-close-pop"><button className="close-button" onClick={closeLoginPopup}>X</button></div>
                <h1>Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="signup-option">
                  Don't have an account? <Link to="/signup"><p onClick={handleClose}>Sign up here</p></Link>
                </div>
              </div>
            </div>
          </>
    )
}
export default Login