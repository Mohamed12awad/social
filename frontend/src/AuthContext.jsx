// AuthContext.js
import { createContext, useContext, useState } from "react";
// import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [userData, setUserData] = useState(fetchData() || "");

  const signIn = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken("");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const isAuthenticated = () => {
    return !!token;
  };

  // var fetchData = async () => {
  //   if (token) {
  //     try {
  //       const response = await axios
  //         .get("http://localhost:5000/api/users/singleuser", {
  //           headers: {
  //             "Content-Type": `application/json`,
  //             Authorization: `${token}`,
  //           },
  //         })
  //         .then((data) => {
  //           return data;
  //         });
  //     } catch (error) {
  //       console.error("Error data:", error.response);
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        token,
        // userData,
        signIn,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
