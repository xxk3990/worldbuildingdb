import logo from './logo.svg';
import './styles/navbar.css'
import React  from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
    const checkStorage = localStorage.getItem("authToken")
    return (
        <div className='Navbar'>
            <section className='nav-loggedin'>
                <ul className = "nav-links">
                    <li className='nav-item'><Link to='/worlds'>Worlds</Link></li>
                </ul>
            </section>
        </div>
    )
}