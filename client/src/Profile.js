import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';
import { checkAuth } from './services/auth-service';

export default function Profile() {
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
       document.title = "Profile – Worldbuilding DB"
    })
    const currentUserToken = localStorage.getItem("authToken")
    const currentUserID = localStorage.getItem("user")
    const getProfile = () => {
        const authorized = checkAuth()
        if(authorized === false) {
            localStorage.clear();
            navigate('/')
        } else {
            const endpoint = `profile?id=${currentUserID}`; //get data unique to the current user id
            handleGet(endpoint, currentUserToken, setUserProfile)
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
            </section>
        </div>
    )
}