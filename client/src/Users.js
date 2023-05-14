import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [dob, setDOB] = useState("")
  const fetchUsers = () => {
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
   fetchUsers();
  }, [])

  const postUsers = () => {
    const postURL = `http://localhost:3000/addUser`
    const requestBody = {
      username: username,
      email: email,
      password: password,
      first_name: firstname,
      last_name: lastname,
      dob: dob,
    }
    console.log('Params:', requestBody)
    const requestParams = {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(requestBody)
    }
    return fetch(postURL, requestParams)
  
  }

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
        <section className='add-user'>
          <h4>Add a user!</h4>
            <span className='user-form-question' id="username">Username: <input type='text' name='username' className='user-input' value={username} onChange={e => setUsername(e.target.value)}/></span>
            <span className='user-form-question' id="email">Email: <input type='email' name='email' className='user-input'value={email} onChange={e => setEmail(e.target.value)}/></span>
            <span className='user-form-question'id="password">Password: <input type='password' name='password' className='name-input'value={password} onChange={e => setPassword(e.target.value)}/></span>
            <span className='user-form-question'id="first-name">First name: <input type='name' name='firstname' className='user-input'value={firstname} onChange={e => setFirstName(e.target.value)}/></span>
            <span className='user-form-question'id="last-name">Last name: <input type='name' name='lastname' className='user-input'value={lastname} onChange={e => setLastName(e.target.value)}/></span>
            <span className='user-form-question'id="date-of-birth">Date of Birth: <input type='date' name='dob' className='name-input' min="1970-01-01" max="2023-12-31"value={dob} onChange={e => setDOB(e.target.value.toString())}/></span>
            <button type='submit' onClick={postUsers}>Submit</button>
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