import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect, useRef, createContext, useContext}  from 'react';

export default function CreateAccount() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    dob: ''
  })

  const handleChange = (name, value) => {
    setNewUser({...newUser, [name]:value})
  }
  
  const postUsers = async () => {
    const postURL = `http://localhost:3000/addUser`
    const requestBody = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      first_name: newUser.firstname,
      last_name: newUser.lastname,
      dob: newUser.dob,
    }
    console.log('Params:', requestBody)
    const requestParams = {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(requestBody)
    }
    try {
      const response = await fetch(postURL, requestParams)
      const data = await response.json()
      if(response.status === 200 || response.status === 201) {
       // setUsers([...users, data])
        setNewUser({
          username:'',
          email: '',
          password:'',
          firstname: '',
          lastname: '',
          dob:''
        })
      } else {
        alert("An error occurred.")
      }
    } catch {
      alert("An error occurred.")
    }
  
  }

  
    return (
      <div className="Create Account">
        <section className='add-user'>
          <h4>Create Account</h4>
            <span className='user-form-question' id="username">Username: <input type='text' name='username' className='user-input' value={newUser.username} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question' id="email">Email: <input type='email' name='email' className='user-input'value={newUser.email} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="password">Password: <input type='password' name='password' className='name-input'value={newUser.password} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="first-name">First name: <input type='name' name='firstname' className='user-input'value={newUser.firstname} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="last-name">Last name: <input type='name' name='lastname' className='user-input'value={newUser.lastname} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="date-of-birth">Date of Birth: <input type='date' name='dob' className='name-input' min="1970-01-01" max="2023-12-31"value={newUser.dob} onChange={e => handleChange(e.target.name, e.target.value.toString())}/></span>
            <button type='button' onClick={postUsers}>Submit</button>
        </section>
      </div>
    );

}