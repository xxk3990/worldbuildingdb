import logo from './logo.svg';
import './styles/worlds.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { handleGet, handlePost } from './services/requests-service';
export default function Worlds() {
  const [newWorld, setNewWorld] = useState({
    worldName: '',
    worldType: '',
    user: '',
    description: ''
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [worlds, setWorlds] = useState([])
  const currentUserToken = localStorage.getItem("authToken")
  const currentUserID = localStorage.getItem("user")
  const getWorlds = () => {
    const url = `http://localhost:3000/worlds?id=${currentUserID}`; //get data unique to the current user id
    handleGet(url, currentUserToken, setWorlds)
  }
  
  useEffect(() => {
    document.title = "Worlds – Worldbuilding DB"
    getWorlds()
  }, [])
  
  const handleChange = (name, value) => {
    setNewWorld({...newWorld, [name]:value})
  }
  
  const postWorld = async () => {
    const postURL = `http://localhost:3000/addWorld`
    const requestBody = {
      world_name: newWorld.worldName,
      world_type: newWorld.worldType,
      user: currentUserID,
      description: newWorld.description
    }
    console.log('Params:', requestBody)
    try {
      const response = await handlePost(postURL, currentUserToken, requestBody)
      const data = await response.json()
      if(response.status === 200 || response.status === 201) {
        setWorlds([...worlds, data])
        setNewWorld({
          worldName: '',
          worldType: '',
          user: '',
          description:''
        })
        getWorlds();
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 1500)
      } else {
        alert("An error occurred.")
      }
    } catch {
      alert("An error occurred while saving this world.")
    }
  }

  if(worlds === undefined) {
    return (
      <div className="Worlds">
        <h4>No world found.</h4>
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
            <button type='button' onClick={postWorld}>Submit</button>
        </section>
      </div>
    )
  } else {
    return (
      <div className="Worlds">
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="World Created Successfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
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
            <button type='button' onClick={postWorld}>Submit</button>
        </section>
      </div>
    );
  }

 
  
  
 

  

}



const WorldCard = (props) => {
  const w = props.w;
  const navigateToLocations = () => {
    //first remove any previously set world/world name so user can have multiple worlds
    localStorage.removeItem("world")
    localStorage.removeItem("worldName");

    //then add current
    localStorage.setItem("world", w.id)
    localStorage.setItem("worldName", w.world_name);

    window.location.href = '/locations'
  }
  return(
    <section className="world-info">
      <h3 id="worldname">{w.world_name}</h3>
      <p>{w.world_type}</p>
      <p>{w.description}</p>
      <button type="button" className='toLocations' onClick={navigateToLocations}>Locations</button>
    </section>
  )
}