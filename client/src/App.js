import logo from './logo.svg';
import './App.css';
import React, {useEffect}  from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Worlds from './Worlds';
import Login from './Login';
import { AuthProvider, ProtectedRoute } from "./services/auth-service";
import HomeLoggedOut from './Home-LoggedOut';
import Navbar from './Navbar';

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
          <Route path="worlds" element={<ProtectedRoute><Worlds /></ProtectedRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
