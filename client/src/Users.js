import logo from './logo.svg';
import './styles/users.css';
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGet } from './services/requests-service';
import { checkAuth } from './services/auth-service';

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const authorized = await checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate("/login")
    } else {
      const endpoint = `users`;
      handleGet(endpoint, setUsers)
    }
  }
  useEffect(() => {
   document.title = "All users – Worldbuilding DB"
   fetchUsers();
  }, [users])

  if(users === undefined) {
    return (
      <div className="Users">
        No users found.
      </div>
    )
  } else {
    return (
      <div className="Users">
        <section className = "data-grid">
            {users.map(u => {
              return <UserCard u={u}/>
            })}
          </section>
      </div>
    );
  }

}

const UserCard = (props) => {
  const u = props.u;
  if(u.worlds_created.length === 0) {
    return(
      <section className="user-info">
        <h3 id="firstname">{u.first_name} {u.last_name}</h3>
        <p>{u.username}</p>
        <p>{u.email}</p>
        <p>Worlds Created: None Yet</p>
      </section>
    )
  } else {
    return(
      <section className="user-info">
        <h3 id="firstname">{u.first_name} {u.last_name}</h3>
        <p>{u.username}</p>
        <p>{u.email}</p>
        <p>Worlds Created:</p>
        <ul className='user-worlds'>
          {u.worlds_created.map(world => {
            return <li key={world.id}>{world.world_name}, {world.world_type}</li>
          })}
        </ul>
      </section>
    )
  }

}