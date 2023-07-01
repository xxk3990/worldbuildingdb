import jwt_decode from "jwt-decode";
import { useState } from "react";

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

export const handleLogin = async (url, body) => {
  const loginParams = {
    method: 'POST',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify(body)
  }
  return fetch(url, loginParams)
}

export const handleLogout = async () => {
  localStorage.clear();
  window.location.href = '/'
}

export const checkAuth = () => {
  let authorized = true;
  const token = localStorage.getItem("authToken");
  try {
    const decodedToken = jwt_decode(token)
    if(decodedToken.exp * 1000 > Date.now()) {
      authorized = true;
    } else {
      authorized = false;
    }
  } catch {
    authorized = false;
  }
  return authorized;
}