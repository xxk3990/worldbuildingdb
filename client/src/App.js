import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';
import { ReactDOM } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Users from "./Users"
import CreateAccount from './CreateAccount';
import Worlds from './Worlds';
import Login from './Login';

export default function App() {
  const navigate = useNavigate();

  const viewUsers = () => {
    navigate('/users', {replace: true})
  }
  
  const isLoggedIn = localStorage.getItem("authToken")
  if(isLoggedIn === null) {
    const login = () => {
      navigate('/login', {replace: true})
    }
    const createAccount = () => {
      navigate('/CreateAccount', {replace: true})
    }
    return (
      <div className='App'>
        <ul className="links">
            <li className="links-li"><button onClick={login}>Login</button></li>
            <li className="links-li"><button onClick={createAccount}>Create Account</button></li>
        </ul>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="createAccount" element={<CreateAccount />} />
        </Routes>
      </div>
    )
  } else {
    const viewWorlds = () => {
      navigate('/worlds', {replace: true})
    }
    return (
      <div className='App'>
        <section className='routes'>
          <ul className="links">
            <li className="links-li"><button onClick={viewWorlds}>Your Worlds</button></li>
          </ul>
        </section>
          <Routes>
            <Route path="worlds" element={<Worlds />} />
          </Routes>
        
      </div>
    );
  }



}
