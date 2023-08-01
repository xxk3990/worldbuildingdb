import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect}  from 'react';
import "./styles/admin-worlds.css"
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';
import { checkAuth } from './services/auth-service';
import { minsTillLogout, sessionInterval } from './services/session-service';

export default function AdminWorlds() {
  const [minutes, setMinutes] = useState(minsTillLogout(Date.now()));
  const navigate = useNavigate()
  const [adminWorlds, setAdminWorlds] = useState([]);
  const fetchAllWorlds = async () => {
    const authorized = await checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate("/login")
    } else {
      const endpoint = `allWorlds`;
      handleGet(endpoint, setAdminWorlds)
    }
  }
  useEffect(() => {
   document.title = "All users – Worldbuilding DB"
   fetchAllWorlds();
  }, [])

  useEffect(() => {
    clearInterval(window.interval) //clear interval from previous page to avoid issues
    sessionInterval(minutes, setMinutes) //set new one with current # of mins till logout
  }, [minutes])

  if(adminWorlds.length === 0) {
    return (
      <div className="AdminWorlds">
        No worlds found.
      </div>
    )
  } else {
    return (
      <div className="AdminWorlds">
        <h1 className='page-header'>All worlds</h1>
        <section className = "admin-worlds-grid">
            
            {adminWorlds.map(aw => {
              return <AdminWorldCard aw={aw}/>
            })}
          </section>
      </div>
    );
  }

}

const AdminWorldCard = (props) => {
  const aw = props.aw;
  return(
    <section className="admin-world-info">
      <h3 id="admin-world-name">{aw.world_name}</h3>
      <p>Type: {aw.world_type}</p>
      <p>Made by: {aw.world_owner.username}</p>
    </section>
  )


}