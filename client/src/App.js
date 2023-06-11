import logo from './logo.svg';
import './App.css';
import React, {useEffect}  from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Worlds from './Worlds';
import Login from './Login';
import { AdminRoute, AuthProvider, ProtectedRoute } from "./services/auth-service";
import HomeLoggedOut from './Home-LoggedOut';
import Navbar from './Navbar';
import Profile from './Profile';
import AdminWorlds from './AdminWorlds';
import Users from './Users';

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
        <Route element={<><Navbar/> <Outlet /></>}>
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="worlds" element={<ProtectedRoute><Worlds /></ProtectedRoute>} />
          <Route path="adminWorlds" element={<ProtectedRoute><AdminRoute><AdminWorlds /></AdminRoute></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute><AdminRoute><Users /></AdminRoute></ProtectedRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
