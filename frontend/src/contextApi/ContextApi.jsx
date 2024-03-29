// ContextApi.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const checkAuth = async () => {
    try {
        const response = await axios.post(
            "https://healthy-me-3en2.onrender.com/api/v1/checkAuth",
            null,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.data.message !== "Access granted") {
            localStorage.removeItem("token");
            setIsLoggedIn(false); // Update the state when the token is removed
            console.log("not granted");
        }

        return response.data.message;
    } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        console.log("error while login", error);
    }
};


  useEffect(() => {
    checkAuth(); // Automatically check authentication on app load
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(!!(localStorage.getItem("token")));

  const storeInLs = (token) => {
    return localStorage.setItem("token", token);
  };
  const getFromLs = () => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ storeInLs, isLoggedIn, setIsLoggedIn, getFromLs, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
