import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router';

export default function CreateAccount() {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Create Account – Worldbuilding DB"
  })
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    dob: '',
    role: ''
  })

  const handleChange = (name, value) => {
    setNewUser({...newUser, [name]:value})
  }
  
  const postUser = async () => {
    const postURL = `http://localhost:3000/addUser`
    const requestBody = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      first_name: newUser.firstname,
      last_name: newUser.lastname,
      dob: newUser.dob,
      user_role: newUser.role
    }
    console.log('Params:', requestBody)
    const requestParams = {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(requestBody)
    }
    try {
      const response = await fetch(postURL, requestParams)
      if(response.status === 200 || response.status === 201) {
       // setUsers([...users, data])
        setNewUser({
          username:'',
          email: '',
          password:'',
          firstname: '',
          lastname: '',
          dob:'',
          role: ''
        })
        navigate('/login'); //redirect to login on successful account creation
      } else {
        alert("An error occurred.")
      }
    } catch {
      alert("An error occurred.")
    }
  
  }

  
    return (
      <div className="CreateAccount">
        <section className='add-user'>
          <h4>Create Account</h4>
            <span className='user-form-question' id="username">Username: <input type='text' name='username' className='user-input' value={newUser.username} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question' id="email">Email: <input type='email' name='email' className='user-input'value={newUser.email} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="password">Password: <input type='password' name='password' className='name-input'value={newUser.password} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="first-name">First name: <input type='name' name='firstname' className='user-input'value={newUser.firstname} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="last-name">Last name: <input type='name' name='lastname' className='user-input'value={newUser.lastname} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='user-form-question'id="date-of-birth">Date of Birth: <input type='date' name='dob' className='name-input' min="1970-01-01" max="2023-12-31"value={newUser.dob} onChange={e => handleChange(e.target.name, e.target.value.toString())}/></span>
            <span className='user-form-question' id="user-role">
              Type of User: 
              <select value={newUser.role} name='role' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                <option>Select User Type</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </span>
            <button type='button' onClick={postUser}>Submit</button>
        </section>
      </div>
    );

}