import React, { useState, useEffect } from "react";

const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeUserData = (userData) => { 
        localStorage.setItem('user', userData); // generate a "user" key with value "userData"
  }

  const authenticateUser = () => { 
        const user = localStorage.getItem('user');
        
        if (user) {  // If user exists in the localStorage
            const parsedUser = JSON.parse(user) // {"email" : "lloyd@test.com"} --> {email: "lloyd@test.com"}
           // Update state variables        
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(parsedUser);        
          }
      
         else {
          // If user is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);      
        }   
      }

      const removeUser = () => {                
        localStorage.removeItem("user");
      }
     
      const logOutUser = () => {                
        removeUser(); // clear localStorage
        authenticateUser(); // update state variables accordingly
      } 

      useEffect(() => {                                          
        authenticateUser()
      }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeUserData, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };