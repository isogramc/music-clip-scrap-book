// import { useContext } from "react";
// import { AuthContext } from "./auth.context";
// import { useLocalStorage } from "./useLocalStorage";

// // NOTE: optimally move this into a separate file
//  export const User = {
//      id: "",
//      fullName: "",
//      email: "",
//      image: "",
//  };

// export const useUser = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { setItem } = useLocalStorage();

//   const addUser = (user) => {
//     setUser(user);
//     setItem("user", JSON.stringify(user));
//   };

//   const removeUser = () => {
//     setUser(null);
//     setItem("user", "");
//   };

//   return { user, addUser, removeUser, setUser };
// };

