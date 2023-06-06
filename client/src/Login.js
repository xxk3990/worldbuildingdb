import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useEffect}  from 'react';
export default function Login() {
    
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [showAlert, setShowAlert] = useState(true)
    useEffect(() => {
      const alertTimer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return () => {
        clearTimeout(alertTimer)
      }
    })
    const handleChange = (name, value) => {
      setLogin({...login, [name]:value})
    }

    const navigateCreateAccount = () => {
      window.location.href = '/CreateAccount'
    }
    
    const submitLogin = async () => {
      const postURL = `http://localhost:3000/login`
      const requestBody = {
        email: login.email,
        password: login.password,
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
         //grab access token sent in response, add to local storage
            localStorage.setItem("authToken", data)
            window.location.href = '/'
        } else {
          alert("Your email or password was incorrect.")
        }
      } catch {
        alert("An error occurred")
      }
    
    }
  
    
      return (
        <div className="Login">
          <section className='user-login'>
            <h4>Login</h4>
              <span className='login-form-question' id="email">Email: <input type='email' name='email' className='user-input'value={login.email} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='login-form-question'id="password">Password: <input type='password' name='password' className='name-input'value={login.password} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <button type='button' onClick={submitLogin}>Submit</button>
          </section>
          <span>New User? Create Account<button type='button' onClick={navigateCreateAccount}>Create Account</button></span>
        </div>
      );
  
  }