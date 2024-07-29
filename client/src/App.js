import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState}  from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Worlds from './components/Worlds';
import Login from './components/Login';
import { AdminRoute } from './route-guards/admin-guard';
import { ProtectedRoute } from './route-guards/login-guard';
import HomeLoggedOut from './components/Home-LoggedOut';
import Navbar from './Navbar';
import Profile from './components/Profile';
import AdminWorlds from './AdminWorlds';
import Users from './components/Users';
import Locations from './components/Locations';
import Characters from './components/Characters';
import Character from './components/Character';

export default function App() {
  useEffect(() => {
    document.title = "Worldbuilding DB"
  })
  return (
    <Routes>
      <Route path="/notLoggedIn" element={ <HomeLoggedOut />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route element={<> <Navbar/> <Outlet /></>}>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Worlds /></ProtectedRoute>} />
        <Route path="/locations" element={<ProtectedRoute><Locations /></ProtectedRoute>} />
        <Route path="/characters" element={<ProtectedRoute><Characters /></ProtectedRoute>} />
        <Route path="/character" element={<ProtectedRoute><Character /></ProtectedRoute>} />
        <Route path="/adminWorlds" element={<ProtectedRoute><AdminRoute><AdminWorlds /></AdminRoute></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><AdminRoute><Users /></AdminRoute></ProtectedRoute>} />
      </Route>
    </Routes>   
  );
  
}
