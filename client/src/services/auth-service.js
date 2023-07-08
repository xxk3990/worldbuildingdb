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
    credentials: "include",
    body: JSON.stringify(body)
  }
  return await fetch(url, loginParams)
}

export const handleLogout = async () => {
  localStorage.clear();
  window.location.href = '/'
}

export const checkAuth = async () => {
  const response = await fetch('http://localhost:3000/verify', {
    method: 'GET',
    credentials: "include"
  })
  const result = await response.json();
  console.log('auth result: ', result)
  if(result.authenticated === true) {
    return true;
  } else {
    return false;
  }
}