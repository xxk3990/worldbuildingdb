import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect}  from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    const currentUserToken = localStorage.getItem("authToken")
    const url = `http://localhost:3000/users`;
    fetch(url, {
        method: 'GET',
        headers: {"Authorization": `Bearer ${currentUserToken}`}
    }).then(response => {
      return response.json();
    }, []).then(data => {
       setUsers(data)
    })
  }
  useEffect(() => {
   fetchUsers();
  }, [])

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
  if(u.worlds_created === undefined) {
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