import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        setIsLoggedIn(data.user.isAccountVerified);
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
      getUserData();
  }, []);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if(data.isAdmin){
        sessionStorage.removeItem("isAdmin");
      }
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
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

