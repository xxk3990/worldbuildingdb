import logo from './logo.svg';
import './styles/locations.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { handleGet, handlePost, handleDelete } from './services/requests-service';
import { checkAuth } from './services/auth-service';
import { minsTillLogout, sessionInterval } from './services/session-service';
export default function Locations() {
  const [minutes, setMinutes] = useState(minsTillLogout(Date.now()));
  const navigate = useNavigate()
  const [newLocation, setNewLocation] = useState({
    locationName: '',
    locationType: '',
    world: '',
    inhabitants:'',
    description: ''
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [locations, setLocations] = useState([])
  const worldName = localStorage.getItem("worldName")
  const currentWorld = localStorage.getItem("world")
  const currentUser = localStorage.getItem("user");
  const getLocations = async () => { //get locations method
    const authorized = await checkAuth()
    if(authorized === false) {
      localStorage.clear();
      sessionStorage.setItem("page", "") //requested page has to be worlds because locations and chars require world info
      navigate('/login');
    } else {
      const endpoint = `locations?world=${currentWorld}&id=${currentUser}`; //get data unique to the current world id
      handleGet(endpoint, setLocations)
    }
    
  }
  useEffect(() => {
    document.title = "Locations – Worldbuilding DB"
    getLocations();
    console.log(locations);
  }, [])

  useEffect(() => {
    clearInterval(window.interval) //clear active interval from previous page to avoid issues
    sessionInterval(minutes, setMinutes); //set new one with current # of mins till logout
  }, [minutes])
  
  const handleChange = (name, value) => {
    setNewLocation({...newLocation, [name]:value})
  }
  
  const postLocation = async () => {
    const authorized = checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/');
    } else {
      const endpoint = `addLocation?id=${currentUser}`
      const requestBody = {
        location_name: newLocation.locationName,
        location_type: newLocation.locationType,
        world: currentWorld,
        inhabitants: newLocation.inhabitants,
        description: newLocation.description
      }
      console.log('Params:', requestBody)
      try {
        const response = await handlePost(endpoint, requestBody)
        const data = await response.json()
        if(response.status === 200 || response.status === 201) {
          setLocations([...locations, data])
          setNewLocation({
            locationName: '',
            locationType: '',
            world: '',
            inhabitants:'',
            description: ''
          })
          getLocations();
          setOpenSnackbar(true);
          setTimeout(() => {
            setOpenSnackbar(false);
          }, 1500)
        } else {
          alert("An error occurred.")
        }
      } catch {
        alert("An error occurred.")
      }
    }
  }
  if(locations.length === 0) {
    return (
      <div className="Locations">
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="Location Added Successfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
        <h1 className='location-title'>Add locations to {worldName}</h1>
        <h4>No Locations found.</h4>
        <section className='add-location'>
          <h4>Add a Location!</h4>
            <span className='location-form-question' id="location-name">Location Name: <input type='text' name='locationName' className='user-input' value={newLocation.locationName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='location-form-question' id="location-type">
              Location Type: 
              <select value={newLocation.locationType} name='locationType' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                <option>Select Location Type</option>
                <option value="Planet">Planet</option>
                <option value="Country">Country</option>
                <option value="Region">Region</option>
                <option value="Landmark">Landmark</option>
              </select>
            </span>
            <span className='location-form-question'id="inhabitants">Inhabitants (if any): <textarea name='inhabitants' className='user-input'value={newLocation.inhabitants} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <span className='location-form-question'id="inhabitants">Description: <textarea name='description' className='user-input'value={newLocation.description} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <button type='button' onClick={postLocation}>Submit</button>
        </section>
      </div>
    )
  } else {
    return (
      <div className="Locations">
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="Location Added Successfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
        <h1 className='location-title'>Add or View locations in {worldName}</h1>
        <section className = "locations-grid">
            {locations.map(loc => {
              return <LocationCard loc={loc} refreshLocations={getLocations}/>
            })}
          </section>
        <section className='add-location'>
          <h4>Add a Location!</h4>
            <span className='location-form-question' id="location-name">Location Name: <input type='text' name='locationName' className='user-input' value={newLocation.locationName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
            <span className='location-form-question' id="location-type">
              Location Type: 
              <select value={newLocation.locationType} name='locationType' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                <option>Select Location Type</option>
                <option value="Planet">Planet</option>
                <option value="Country">Country</option>
                <option value="Region">Region</option>
                <option value="Landmark">Landmark</option>
              </select>
            </span>
            <span className='location-form-question'id="inhabitants">Inhabitants (if any): <textarea name='inhabitants' className='user-input'value={newLocation.inhabitants} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <span className='location-form-question'id="location-description">Description: <textarea name='description' className='user-input'value={newLocation.description} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <button type='button' onClick={postLocation}>Submit</button>
        </section>
      </div>
    );
  }
}

const LocationCard = (props) => {
  const navigate = useNavigate()
  const loc = props.loc;
  const refreshLocations = props.refreshLocations;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const deleteLocation = async () => {
    const authorized = checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/');
    } else {
      const endpoint = `deleteLocation?location=${loc.id}`
      try {
        const response = await handleDelete(endpoint)
        if(response.status === 200 || response.status === 201) {
          setOpenSnackbar(true);
          setTimeout(() => {
            refreshLocations();
            setOpenSnackbar(false);
          }, 1500)
        } else {
          alert("An error occurred.")
        }
      } catch {
        alert("An error occurred while deleting this location.")
      }
    }
  }
  return(
    <section className="location-info">
      <Snackbar open={openSnackbar} autoHideDuration={1500} message="Deleting Location..." anchorOrigin={{horizontal: "center", vertical:"top"}}/>
      <h3 id="locationname">Name: {loc.location_name}</h3>
      <p>Type: {loc.location_type}</p>
      <p>Inhabitants: {loc.inhabitants}</p>
      <p>Description <br/>{loc.description}</p>
      <button type="button" className='delete-location-btn' onClick={deleteLocation}>Delete</button>
    </section>
  )
}