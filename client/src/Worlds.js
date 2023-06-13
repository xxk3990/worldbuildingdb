import logo from './logo.svg';
import './styles/worlds.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';

export default function Worlds() {
  const navigate = useNavigate()
  const [newWorld, setNewWorld] = useState({
    worldName: '',
    worldType: '',
    user: '',
    description: ''
  })
  const [worlds, setWorlds] = useState([])
  useEffect(() => {
    document.title = "Worlds – Worldbuilding DB"
  })
  const currentUserToken = localStorage.getItem("authToken")
  const currentUserID = localStorage.getItem("user")
  const fetchWorlds = () => {
    const url = `http://localhost:3000/worlds?id=${currentUserID}`;
    fetch(url, {
      method: 'GET',
      headers: {"Authorization": `Bearer ${currentUserToken}`}
    }).then(response => {
      if(response.status === 401) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        localStorage.removeItem("userRole");
        navigate('/login', {replace: true})
      } else {
        return response.json();
      }
      
    }, []).then(data => {
      setWorlds(data)
    })
  }
  useEffect(() => {
    fetchWorlds();
  }, [])
  
  const handleChange = (name, value) => {
    setNewWorld({...newWorld, [name]:value})
  }
  
  const postWorlds = async () => {
    const postURL = `http://localhost:3000/addWorld`
    const requestBody = {
      world_name: newWorld.worldName,
      world_type: newWorld.worldType,
      user: currentUserID,
      description: newWorld.description
    }
    console.log('Params:', requestBody)
    const requestParams = {
      method: 'POST',
      headers: {
        "Content-Type" : 'application/json',
        "Authorization" : `Bearer ${currentUserToken}`
      }, 
      body: JSON.stringify(requestBody)
    }
    try {
      const response = await fetch(postURL, requestParams)
      const data = await response.json()
      if(response.status === 200 || response.status === 201) {
        setWorlds([...worlds, data])
        setNewWorld({
          worldName: '',
          worldType: '',
          user: '',
          description:''
        })
      } else {
        alert("An error occurred.")
      }
    } catch {
      alert("An error occurred.")
    }
  
  }

  if(worlds === undefined) {
    return (
      <div className="Worlds">
        No world found.
      </div>
    )
  } else {
    return (
      <div className="Worlds">
        <section className = "worlds-grid">
            {worlds.map(w => {
              return <WorldCard w={w}/>
            })}
          </section>
        <section className='add-world'>
          <h4>Add a world! Once your main worlds have been set, you can then save locations and/or characters in the world. </h4>
            <span className='world-form-question' id="worldname">World Name: <input type='text' name='worldName' className='user-input' value={newWorld.worldName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='world-form-question' id="worldtype">
              World Type: 
              <select value={newWorld.worldType} name='worldType' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                <option>Select World Type</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </span>
            <span className='world-form-question'id="first-name">Description: <textarea name='description' className='user-input'value={newWorld.description} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <button type='button' onClick={postWorlds}>Submit</button>
        </section>
      </div>
    );
  }

 
  
  
 

  

}

const WorldCard = (props) => {
  const w = props.w;
  return(
    <section className="world-info">
      <h3 id="worldname">{w.world_name}</h3>
      <p>{w.world_type}</p>
      <p>{w.description}</p>
    </section>
  )
}