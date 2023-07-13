import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';
import { checkAuth } from './services/auth-service';
export default function Profile() {
    localStorage.setItem("page", "profile")
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate()
    const expiration = localStorage.getItem("expiration")
    const loginTime = localStorage.getItem("loginTime")

    useEffect(() => {
        document.title = "Profile – Worldbuilding DB"
    })

    const currentUserID = localStorage.getItem("user")
 
    const getProfile = async () => {
        const authorized = await checkAuth()
        if(authorized === false) {
            localStorage.clear();
            navigate('/login')
        } else {
            const endpoint = `profile?id=${currentUserID}`; //get data unique to the current user id
            handleGet(endpoint, setUserProfile)
        }
    }
    useEffect(() => {
        getProfile()
    }, [])
    const minutesRemaining = (now, expiration, loginTime) => {
        const timeSinceLogin = now - loginTime; //get milliseconds since user logged in
        const minutesSince = timeSinceLogin / 60000; //convert it to minutes
        const minsLeft = expiration - minutesSince; //subtract # of minutes logged in from token exp time
        return Math.round(minsLeft); //round off decimals
    }
    return (
        <div className='Profile'>
            <section className='profile-container'>
                <h1>Your Profile</h1>
                    
                <h4>Name: {userProfile.first_name} {userProfile.last_name}</h4>
                <h4>Username: {userProfile.username}</h4>
                <h4>Email: {userProfile.email}</h4>
                <h4>Automatic logout occurs {expiration} minutes after login. You will be logged out in&nbsp; 
                    {minutesRemaining(Date.now(), expiration, loginTime)} minutes (reload to refresh).</h4>
            </section>
        </div>
    )
}

