import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom";
import authMethods from "./../services/auth.service";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

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

    // function hex_to_ascii(str1) {
    //   var hex = str1.toString();
    //   var str = '';
    //   for (var n = 0; n < hex.length; n += 2) {
    //       str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    //   }
    //   return str;
    // }

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
      console.log("login");

      const hashDigest = stringToHex(password + "1994ilovechocolate");
      // const compareVal = hmacSHA512(hashDigest, "ilovechocolate");
  
      try {
        authMethods.login({email: email, password: password}).then(response=>{
            const user = response.find((u) => 
                u.email === email && u.password === hashDigest
            );

            setAUser(user);
        }).then(()=>{

          if (aUser) {
            console.log(aUser);
            setTokens(aUser);
            navigate("/profile", { state: { user: aUser, loggedIn: true } });
            handleClose();
          } else {
            setError("Invalid email or password.");
          }

        });

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
                <button className="close-button" onClick={closeLoginPopup}>X</button>
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
                <p className="signup-option">
                  Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
              </div>
            </div>
          </>
    )
}
export default Login