import logo from './logo.svg';
import './styles/locations.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
export default function Locations() {
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
  useEffect(() => {
    document.title = "Locations – Worldbuilding DB"
  })
  const currentUserToken = localStorage.getItem("authToken")
  //const currentUserID = localStorage.getItem("user")
  const worldName = localStorage.getItem("worldName")
  const currentWorld = localStorage.getItem("world")
  const fetchLocations = async () => { //get worlds method
    const url = `http://localhost:3000/locations?id=${currentWorld}`; //get data unique to the current world id
    await fetch(url, {
      method: 'GET',
      headers: {"Authorization": `Bearer ${currentUserToken}`} //pass in token as header
    }).then(response => {
      if(response.status === 401) { //if a call is attempted without a valid token
        localStorage.clear() //remove all items in localStorage
        navigate('/login', {replace: true}) //Redirect to login
      } else {
        return response.json();
      }
      
    }, []).then(data => {
      setLocations(data)
    })
  }
  useEffect(() => {
    fetchLocations();
  }, [])
  
  const handleChange = (name, value) => {
    setNewLocation({...newLocation, [name]:value})
  }
  
  const postLocations = async () => {
    const postURL = `http://localhost:3000/addLocation`
    const requestBody = {
        location_name: newLocation.locationName,
        location_type: newLocation.locationType,
        world: currentWorld,
        inhabitants: newLocation.inhabitants,
        description: newLocation.description
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
        setLocations([...locations, data])
        setNewLocation({
            locationName: '',
            locationType: '',
            world: '',
            inhabitants:'',
            description: ''
        })
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
          window.location.reload()
        }, 1500)
      } else {
        alert("An error occurred.")
      }
    } catch {
      alert("An error occurred.")
    }
  
  }
  console.log(locations);
  if(locations === {message: 'No locations added yet.'}) {
    return (
      <div className="Locations">
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="Location Added Successfully! Reloading..." anchorOrigin={{horizontal: "center", vertical:"top"}}/>
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
            <button type='button' onClick={postLocations}>Submit</button>
        </section>
      </div>
    )
  } else {
    return (
      <div className="Locations">
        <Snackbar open={openSnackbar} autoHideDuration={1500} message="Location Added Successfully! Reloading..." anchorOrigin={{horizontal: "center", vertical:"top"}}/>
        <h1 className='location-title'>Add or View locations in {worldName}</h1>
        <section className = "locations-grid">
            {locations.map(loc => {
              return <LocationCard loc={loc}/>
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
            <span className='location-form-question'id="inhabitants">Description: <textarea name='description' className='user-input'value={newLocation.description} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
            <button type='button' onClick={postLocations}>Submit</button>
        </section>
      </div>
    );
  }

 
  
  
 

  

}

const LocationCard = (props) => {
  const loc = props.loc;
  return(
    <section className="location-info">
      <h3 id="locationname">Name: {loc.location_name}</h3>
      <p>Type: {loc.location_type}</p>
      <p>Inhabitants: {loc.inhabitants}</p>
      <p>Description <br/>{loc.description}</p>
    </section>
  )
}