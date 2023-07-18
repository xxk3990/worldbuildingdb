import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';
import { checkAuth } from './services/auth-service';
import { handleLogout } from './services/auth-service';
export default function Profile() {
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate()
    const expiration = localStorage.getItem("expiration")
    const loginTime = localStorage.getItem("loginTime")

    const minutesRemaining = (now) => {
        const timeSinceLogin = now - loginTime; //get milliseconds since user logged in
        const minutesSince = timeSinceLogin / 60000; //convert it to minutes
        const minsLeft = expiration - minutesSince; //subtract # of minutes logged in from token exp time
        return Math.round(minsLeft); //round off decimals
    }
    const [minutes, setMinutes] = useState(minutesRemaining(Date.now()))
    useEffect(() => {
        document.title = "Profile – Worldbuilding DB"
        const interval = setInterval(() => {
            const decrease = minutes - 1;
            setMinutes(decrease)
        }, 60000) //every minute, reduce # of minutes left by 1
        if(minutes === 0) {
            console.log("clear interval condition reached");
            clearInterval(interval)
            handleLogout()
            navigate("/login");
        }
    }, [minutes])

    const currentUserID = localStorage.getItem("user")
 
    const getProfile = async () => {
        const authorized = await checkAuth()
        if(authorized === false) {
            localStorage.clear(); //delete all the important stuff
            sessionStorage.setItem("page", "profile") //temporarily save requested page
            navigate('/login')
        } else {
            const endpoint = `profile?id=${currentUserID}`; //get data unique to the current user id
            handleGet(endpoint, setUserProfile)
        }
    }
    useEffect(() => {
        getProfile()
    }, [])
    return (
        <div className='Profile'>
            <section className='profile-container'>
                <h1>Your Profile</h1>
                    
                <h4>Name: {userProfile.first_name} {userProfile.last_name}</h4>
                <h4>Username: {userProfile.username}</h4>
                <h4 className='user-email'>Email: {userProfile.email}</h4>
                <span className = "logout-info">
                    <h4>{minutes === 1 ? `Automatic logout occurs ${expiration} minutes after login. You will be logged out in ${minutes} minute` : `Automatic logout occurs ${expiration} minutes after login. You will be logged out in ${minutes} minutes.`}</h4>
                </span>
            </section>
        </div>
    )
}

