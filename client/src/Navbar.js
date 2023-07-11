import logo from './logo.svg';
import './styles/navbar.css'
import React  from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from './services/auth-service';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar/Snackbar';
export default function Navbar() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate()
    const callLogout = async () => {
        setOpenSnackbar(true)
        setTimeout(async() => {
            await handleLogout()
            setOpenSnackbar(false)
            navigate("/notLoggedIn")
        }, 2000)
        
    }
    const role = localStorage.getItem("userRole")
    if(role === "Admin") {
        return (
            <div className='Navbar'>
                <Snackbar open={openSnackbar} autoHideDuration={2000} message="Logging Out..." anchorOrigin={{horizontal: "center", vertical:"top"}}/>
                <section className='nav-loggedin'>
                    <ul className = "nav-links">
                        <li className='nav-item'><Link to='/worlds'>Worlds</Link></li>
                        <li className='nav-item'><Link to='/profile'>Profile</Link></li>
                        <li className='nav-item'><Link to='/users'>All Users</Link></li>
                        <li className='nav-item'><Link to='/adminWorlds'>All Worlds</Link></li>
                        <li className='nav-item'><button type ="button" className='logout-btn' onClick = {callLogout}>Logout</button></li>
                    </ul>
                </section>
            </div>
        )
    } else {
        return (
            <div className='Navbar'>
                <Snackbar open={openSnackbar} autoHideDuration={1000} message="Logging Out..." anchorOrigin={{horizontal: "center", vertical:"top"}}/>
                <section className='nav-loggedin'>
                    <ul className = "nav-links">
                        <li className='nav-item'><Link to='/worlds'>Worlds</Link></li>
                        <li className='nav-item'><Link to='/profile'>Profile</Link></li>
                        <li className='nav-item'><button type ="button" className='logout-btn' onClick = {callLogout}>Logout</button></li>
                    </ul>
                </section>
            </div>
        )
    }
   
}