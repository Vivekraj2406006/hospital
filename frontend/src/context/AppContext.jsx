import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/users/get-user`);
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
    if (token) {
      getUserData();
    }
  }, []);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${backendUrl}/api/auth/logout`);
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      // Optionally show error toast
    }
  };

  const contextValue = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    user,
    getUserData,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

