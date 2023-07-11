import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';
import { checkAuth } from './services/auth-service';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
export default function Profile() {
    localStorage.setItem("page", "profile")
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate()
    const expiration = localStorage.getItem("expiration")
    const loginHour = localStorage.getItem("loginHour")
    let loginMinute = localStorage.getItem("loginMinute");
    if(loginMinute < 10) {
        loginMinute = `0${loginMinute}`
    }

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
    return (
        <div className='Profile'>
            <section className='profile-container'>
                <h1>Your Profile</h1>
                    
                <h4>Name: {userProfile.first_name} {userProfile.last_name}</h4>
                <h4>Username: {userProfile.username}</h4>
                <h4>Email: {userProfile.email}</h4>
                <h4>Logout occurs {expiration} minutes after login. You logged in at {loginHour}:{loginMinute}.</h4>
            </section>
        </div>
    )
}