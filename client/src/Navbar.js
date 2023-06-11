import logo from './logo.svg';
import './styles/navbar.css'
import React  from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
    const role = localStorage.getItem("userRole")
    if(role === "Admin") {
        return (
            <div className='Navbar'>
                <section className='nav-loggedin'>
                    <ul className = "nav-links">
                        <li className='nav-item'><Link to='/worlds'>Worlds</Link></li>
                        <li className='nav-item'><Link to='/profile'>Profile</Link></li>
                        <li className='nav-item'><Link to='/users'>All Users</Link></li>
                        <li className='nav-item'><Link to='/adminWorlds'>All Worlds</Link></li>
                    </ul>
                </section>
            </div>
        )
    } else {
        return (
            <div className='Navbar'>
                <section className='nav-loggedin'>
                    <ul className = "nav-links">
                        <li className='nav-item'><Link to='/worlds'>Worlds</Link></li>
                        <li className='nav-item'><Link to='/profile'>Profile</Link></li>
                    </ul>
                </section>
            </div>
        )
    }
   
}