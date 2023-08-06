import logo from './logo.svg';
import './styles/worlds.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { handleDelete, handleGet, handlePost } from './services/requests-service';
import { checkAuth, handleLogout } from "./services/auth-service";
import { sessionInterval, minsTillLogout } from './services/session-service';
export default function Worlds() {
  const [minutes, setMinutes] = useState(minsTillLogout(Date.now()));
  const navigate = useNavigate()
  const [newWorld, setNewWorld] = useState({
    worldName: '',
    worldType: '',
    user: '',
    description: ''
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [worlds, setWorlds] = useState([])
  const currentUserID = localStorage.getItem("user")
  const getWorlds = async () => {
    const authorized = await checkAuth();
    if(authorized === false) {
      localStorage.clear();
      sessionStorage.setItem("page", "") //temporarily save requested page
      navigate('/login');
    } else {
      const endpoint = `worlds?id=${currentUserID}`; //get data unique to the current user id
      handleGet(endpoint, setWorlds)
    }
  }
  
  useEffect(() => {
    document.title = "Worlds – Worldbuilding DB"
    getWorlds()
  }, [])
  useEffect(() => {
    clearInterval(window.interval) //clear active interval from previous page to avoid issues
    sessionInterval(minutes, setMinutes); //set new one with current # of mins till logout
  }, [minutes])
  
  const handleChange = (name, value) => {
    setNewWorld({...newWorld, [name]:value})
  }
  
  const postWorld = async () => {
    const authorized = checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/');
    } else {
      const endpoint = `addWorld?id=${currentUserID}`
      const requestBody = {
        world_name: newWorld.worldName,
        world_type: newWorld.worldType,
        user: currentUserID,
        description: newWorld.description
      }
      console.log('Params:', requestBody)
      try {
        const response = await handlePost(endpoint, requestBody)
        const data = await response.json()
        if(response.status === 200 || response.status === 201) {
          setWorlds([...worlds, data])
          setNewWorld({
            worldName: '',
            worldType: '',
            user: '',
            description:''
          })
          getWorlds()
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
  }

  if(worlds.length === 0) {
    return (
      <div className="Worlds">
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="World Created Successfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
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
        <h1>Your Worlds</h1>
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="World Created Successfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
        <h4>Note: deleting a world will also delete its locations and characters.</h4>
        <section className = "worlds-grid">
            {worlds.map(w => {
              return <WorldCard w={w} refreshWorlds={getWorlds}/>
            })}
          </section>
        <section className='add-world'>
          <h4>Add another world! </h4>
            <span className='world-form-question' id="worldname">World Name: <input type='text' name='worldName' className='user-input' value={newWorld.worldName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='world-form-question' id="worldtype">
              World Type: 
              <select value={newWorld.worldType} name='worldType' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                <option>Select World Type</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </span>
            <span className='world-form-question'id="world-description">Description: <textarea name='description' className='user-input'value={newWorld.description} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <button type='button' onClick={postWorld}>Submit</button>
        </section>
      </div>
    );
  }
}



const WorldCard = (props) => {
  const navigate = useNavigate()
  const w = props.w;
  const refreshWorlds = props.refreshWorlds;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigateToLocations = () => {
    //first remove any previously set world/world name so user can have multiple worlds
    localStorage.removeItem("world")
    localStorage.removeItem("worldName");

    //then add current
    localStorage.setItem("world", w.id)
    localStorage.setItem("worldName", w.world_name);

    navigate('/locations')
  }
  const navigateToCharacters = () => {
    //first remove any previously set world/world name so user can have multiple worlds
    localStorage.removeItem("world")
    localStorage.removeItem("worldName");
    
    //then add current
    localStorage.setItem("world", w.id)
    localStorage.setItem("worldName", w.world_name);
    navigate('/characters')
  }
  const deleteWorld = async() => {
    const authorized = checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/');
    } else {
      localStorage.removeItem("world")
      localStorage.removeItem("worldName");
      const endpoint = `deleteWorld?world=${w.id}`
      try {
        const response = await handleDelete(endpoint)
        if(response.status === 200 || response.status === 201) {
          setOpenSnackbar(true);
          setTimeout(() => {
            refreshWorlds();
            setOpenSnackbar(false);
          }, 1500)
        } else {
          alert("An error occurred.")
        }
      } catch {
        alert("An error occurred while deleting this world.")
      }
    }
  }
  return(
    <section className="world-info">
      <Snackbar open={openSnackbar} autoHideDuration={1500} message="Deleting World..." anchorOrigin={{horizontal: "center", vertical:"top"}}/>
      <h3 id="worldname">{w.world_name}</h3>
      <p>{w.world_type}</p>
      <p>{w.description}</p>
      <button type="button" className='toLocations' onClick={navigateToLocations}>Locations</button>
      <button type="button" className='toCharacters' onClick={navigateToCharacters}>Characters</button>
      <button type="button" className='delete-world-btn' onClick={deleteWorld}>Delete</button>
    </section>
  )
}