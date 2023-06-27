import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';

export default function Profile() {
    const [userProfile, setUserProfile] = useState([]);
    useEffect(() => {
       document.title = "Profile – Worldbuilding DB"
    })
    const currentUserToken = localStorage.getItem("authToken")
    const currentUserID = localStorage.getItem("user")
    const getProfile = () => {
        const url = `http://localhost:3000/profile?id=${currentUserID}`; //get data unique to the current user id
        handleGet(url, currentUserToken, setUserProfile)
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
            </section>
        </div>
    )
}