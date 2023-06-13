import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect}  from 'react';
import { Snackbar } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
export default function Login() {
  // const navigate = useNavigate()
  const [login, setLogin] = useState({
      email: '',
      password: ''
  })

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    document.title = "Login – Worldbuilding DB"
  })

  const handleChange = (name, value) => {
    setLogin({...login, [name]:value})
  }

  const navigateCreateAccount = () => {
    window.location.href = '/createAccount'
  }

  const navigateToWorlds = () => {
    setTimeout(() => {
      setOpenSnackbar(false);
      window.location.href = '/worlds'
    }, 2000)
  }
  
  const submitLogin = async () => {
    const postURL = `http://localhost:3000/login`
    const requestBody = {
      email: login.email,
      password: login.password,
    }
    const requestParams = {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(requestBody)
    }
    try {
      const response = await fetch(postURL, requestParams)
      const data = await response.json()
      if(response.status === 200 || response.status === 201) {
       //grab access token sent in response, add to local storage
          localStorage.setItem("authToken", data.accessToken)
          localStorage.setItem("user", data.user);
          localStorage.setItem("userRole", data.user_role)
          setOpenSnackbar(true)
          navigateToWorlds()
      } else if(response.status === 401) {
        alert(`${data.status}`)
      }
    } catch {
      alert("An error occurred")
    }
  
  }

  
  return (
    <div className="Login">
     <Snackbar open={openSnackbar} autoHideDuration={2000} message="Login Successful!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
      <section className='user-login'>
        <h4>Login</h4>
          <span className='login-form-question' id="email">Email: <input type='email' name='email' className='email-input'value={login.email} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
          <span className='login-form-question'id="password">Password: <input type='password' name='password' className='password-input'value={login.password} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
          <button type='button' onClick={submitLogin}>Submit</button>
      </section>
      <span>New User? Create Account<button type='button' onClick={navigateCreateAccount}>Create Account</button></span>
    </div>
  );
  
}