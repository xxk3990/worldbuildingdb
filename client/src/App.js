import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect}  from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Worlds from './Worlds';
import Login from './Login';
import { AuthProvider, ProtectedRoute } from "./services/auth-service";
import HomeLoggedOut from './Home-LoggedOut';

export default function App() {
  useEffect(() => {
    document.title = "Worldbuilding DB"
  })
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeLoggedOut />} />
        <Route path="login" element={<Login />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="worlds" element={<ProtectedRoute><Worlds /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}
