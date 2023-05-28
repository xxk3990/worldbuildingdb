import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';
import { ReactDOM } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Users from "./Users"
import CreateAccount from './CreateAccount';
import Worlds from './Worlds';

export default function App() {
  const navigate = useNavigate();

  const viewUsers = () => {
    navigate('/users', {replace: true})
  }
  return (
    <div>
      <section className='routes'>
        <ul className="links">
          <li className="links-li"><button onClick={viewUsers}>View Users</button></li>
        </ul>
      </section>
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="worlds" element={<Worlds />} />
        </Routes>
      
    </div>
  );

}
