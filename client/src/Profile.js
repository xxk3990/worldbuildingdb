import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
       document.title = "Profile – Worldbuilding DB"
    })
    const currentUserToken = localStorage.getItem("authToken")
    const currentUserID = localStorage.getItem("user")
    const fetchProfile = () => {
        const url = `http://localhost:3000/profile?id=${currentUserID}`;
        fetch(url, {
            method: 'GET',
            headers: {"Authorization": `Bearer ${currentUserToken}`}
        }).then(response => {
            if(response.status === 401) {
              localStorage.removeItem('authToken')
              localStorage.removeItem('user')
              localStorage.removeItem("userRole");
              navigate('/login', {replace: true})
            } else {
              return response.json();
            }
            
        }, []).then(data => {
            setUserProfile(data)
        })
    }
    useEffect(() => {
        fetchProfile()
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