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
        const url = `http://localhost:3000/profile?id=${currentUserID}`; //get data unique to the current user id
        fetch(url, {
            method: 'GET',
            headers: {"Authorization": `Bearer ${currentUserToken}`} //pass in token as header
        }).then(response => {
            if(response.status === 401) { //if a call is attempted without a valid token
                localStorage.removeItem('authToken') //remove from LS
                localStorage.removeItem('user')//remove from LS
                localStorage.removeItem("userRole"); //remove from LS
                navigate('/login', {replace: true}) //Redirect to login
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