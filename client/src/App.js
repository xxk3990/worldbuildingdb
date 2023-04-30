import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const fetchCall = () => {
    const url = `http://localhost:3000/users`;
    fetch(url, {
        method: 'GET',
    }).then(response => {
      return response.json();
    }, []).then(data => {
       setUsers(data)
    })
  }
  useEffect(() => {
   fetchCall()
  }, [])

  if(users === undefined) {
    return (
      <div className="App">
        No users found.
      </div>
    )
  } else {
    return (
      <div className="App">
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
  return(
    <section className="user-info">
      <h3 id="firstname">{u.first_name} {u.last_name}</h3>
      <p>{u.username}</p>
      <p>{u.email}</p>
    </section>
  )

}
