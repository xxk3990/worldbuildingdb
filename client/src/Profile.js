import logo from './logo.svg';
import './styles/profile.css';
import React, { useState, useEffect }  from 'react';
import "./styles/profile.css"
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
       
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
    if(userProfile.worlds_created === undefined) {
        return (
            <section className="profile-container">
                <h4>{userProfile.first_name},{userProfile.last_name}</h4>
                <h4>{userProfile.username}</h4>
                <h4>{userProfile.email}</h4>
                <p>Worlds Created: None Yet</p>
            </section>
        )
    } else {
        return (
            <div className='Profile'>
                <section className='profile-container'>
                    <h1>Your Profile</h1>
                        
                    <h4>{userProfile.first_name},{userProfile.last_name}</h4>
                    <h4>{userProfile.username}</h4>
                    <h4>{userProfile.email}</h4>
                    <ul className='user-worlds'>
                        {userProfile.worlds_created.map(world => {
                            return <li key={world.id}>{world.world_name}, {world.world_type}</li>
                        })}
                    </ul>
                </section>
            </div>
        ) 
    } 
    
        
   
}