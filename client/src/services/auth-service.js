import { createContext, useContext, useMemo, useState } from "react";
import {Navigate, useNavigate, useOutlet, Link } from "react-router-dom";
import Navbar from "../Navbar";
const AuthContext = createContext();

export const useLocalStorage = (keyName) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return value;
      } else {
        localStorage.setItem(keyName, JSON.stringify(null));
        return null;
      }
    } catch (err) {
      return null;
    }
  });
  const setValue = (newValue) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("authToken")
    const navigate = useNavigate();
    // call this function when you want to authenticate the user
    const login = async (data) => {
        setUser(data);
        navigate("/worlds");
    };

  // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/login", { replace: true });
    };
    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
      // user is not authenticated
      return <Navigate to="/login" />;
    }
    return children;
};