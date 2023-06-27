import { createContext, useContext, useMemo, useState } from "react";
import {Navigate, useNavigate, useOutlet, Link } from "react-router-dom";
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

export const useAuth = () => {
  return useContext(AuthContext);
};