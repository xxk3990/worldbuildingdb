import logo from './logo.svg';
import './styles/characters.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { handleGet, handlePost } from './services/requests-service';
import { checkAuth } from './services/auth-service';
export default function Characters() {
  localStorage.setItem("page", "characters");
  const navigate = useNavigate()
  const [newCharacter, setNewCharacter] = useState({
    fullName: '',
    characterSpecies: '',
    characterClass: "",
    originallyFrom: "",
    abilities: "",
    biography: ""
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [characters, setCharacters] = useState([])
  const [locations, setLocations] = useState([]);
  const worldName = localStorage.getItem("worldName")
  const currentWorld = localStorage.getItem("world")
  const currentUser = localStorage.getItem("user");
  const getCharacters = async () => { //get characters method
    const authorized = await checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/login');
    } else {
      const endpoint = `characters?world=${currentWorld}&id=${currentUser}`; //get data unique to the current world id
      handleGet(endpoint, setCharacters)
    }
  }
  const getLocationsForCharacter = async () => {
    const authorized = await checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/login');
    } else {
      const endpoint = `locations?world=${currentWorld}&id=${currentUser}`; //get data unique to the current world id
      handleGet(endpoint, setLocations)
    }
  }
  useEffect(() => {
    document.title = "Characters – Worldbuilding DB"
    getCharacters();
    getLocationsForCharacter(); //this is so the user can choose from a list of existing locations when selecting a character's homeworld
    console.log(characters);
  }, [])
  
  const handleChange = (name, value) => {
    setNewCharacter({...newCharacter, [name]:value})
  }
  
  const postCharacter = async () => {
    const authorized = checkAuth()
    if(authorized === false) {
      localStorage.clear();
      navigate('/');
    } else {
      const endpoint = `addCharacter?id=${currentUser}`
      const requestBody = {
        world: currentWorld,
        full_name: newCharacter.fullName,
        character_species: newCharacter.characterSpecies,
        character_class: newCharacter.characterClass,
        originally_from: newCharacter.originallyFrom,
        abilities: newCharacter.abilities,
        biography: newCharacter.biography
      } 
      console.log('Params:', requestBody)
      try {
        const response = await handlePost(endpoint, requestBody)
        const data = await response.json()
        if(response.status === 200 || response.status === 201) {
          setCharacters([...characters, data])
          setNewCharacter({
            fullName: '',
            characterSpecies: '',
            characterClass: "",
            originallyFrom: "",
            abilities: "",
            biography: ""
          })
          getCharacters();
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
  if(characters.length === 0) {
    if(locations.length === 0) {
      return (
        <div className="Characters">
          <Snackbar open={openSnackbar} autoHideDuration={1500} message="Character Added Succesfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
          <h1 className='characters-title'>Add Characters to {worldName}</h1>
          <h4>No Characters found.</h4>
          <section className='add-character'>
            <h4>Add a character!</h4>
              <span className='character-form-question' id="character-name">Character Full Name: <input type='text' name='fullName' className='user-input' value={newCharacter.fullName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-type">Character Species: <input type='text' name='characterSpecies' className='user-input' value={newCharacter.characterSpecies} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-class">Character Class: <input type='text' name='characterClass' className='user-input' value={newCharacter.characterClass} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-home-location">Home location: <input type='text' name='originallyFrom' className='user-input' value={newCharacter.originallyFrom} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question'id="character-abilities"> Abilities: <textarea name='abilities' className='user-input'value={newCharacter.abilities} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <span className='character-form-question'id="character-biography">Bio: <textarea name='biography' className='user-input'value={newCharacter.biography} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <button type='button' onClick={postCharacter}>Submit</button>
          </section>
        </div>
      )
    } else {
      return (
        <div className="Characters">
          <Snackbar open={openSnackbar} autoHideDuration={1500} message="Character Added Succesfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
          <h1 className='characters-title'>Add Characters to {worldName}</h1>
          <h4>No Characters found.</h4>
          <section className='add-character'>
            <h4>Add a character!</h4>
              <span className='character-form-question' id="character-name">Character Full Name: <input type='text' name='fullName' className='user-input' value={newCharacter.fullName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-type">Character Species: <input type='text' name='characterSpecies' className='user-input' value={newCharacter.characterSpecies} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-class">Character Class: <input type='text' name='characterClass' className='user-input' value={newCharacter.characterClass} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-home-location">
                Originally From: 
                <select value={newCharacter.originallyFrom} name='originallyFrom' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                  <option>Select Location</option>
                  {locations.map(loc =>
                    <option value={loc.location_name}>{loc.location_name}</option>  
                  )}
                </select>
              </span>
              <span className='character-form-question'id="character-abilities"> Abilities: <textarea name='abilities' className='user-input'value={newCharacter.abilities} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <span className='character-form-question'id="character-biography">Bio: <textarea name='biography' className='user-input'value={newCharacter.biography} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <button type='button' onClick={postCharacter}>Submit</button>
          </section>
        </div>
      )
    }
    
  } else {
    if(locations.length === 0) {
      return (
        <div className="Characters">
          <Snackbar open={openSnackbar} autoHideDuration={1500} message="Character Added Succesfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
          <h1 className='character-title'>Add or View Characters in {worldName}</h1>
          <section className = "character-grid">
              {characters.map(chr => {
                return <CharacterCard chr={chr}/>
              })}
            </section>
            <section className='add-character'>
            <h4>Add a character!</h4>
              <span className='character-form-question' id="character-name">Character Full Name: <input type='text' name='fullName' className='user-input' value={newCharacter.fullName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-type">Character Species: <input type='text' name='characterSpecies' className='user-input' value={newCharacter.characterSpecies} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-class">Character Class: <input type='text' name='characterClass' className='user-input' value={newCharacter.characterClass} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-home-location">Home location: <input type='text' name='originallyFrom' className='user-input' value={newCharacter.originallyFrom} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question'id="character-abilities"> Abilities: <textarea name='abilities' className='user-input'value={newCharacter.abilities} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <span className='character-form-question'id="character-biography">Bio: <textarea name='biography' className='user-input'value={newCharacter.biography} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <button type='button' onClick={postCharacter}>Submit</button>
          </section>
        </div>
      );
    } else {
      return (
        <div className="Characters">
          <Snackbar open={openSnackbar} autoHideDuration={1500} message="Character Added Succesfully!" anchorOrigin={{horizontal: "center", vertical:"top"}}/>
          <h1 className='character-title'>Add or View Characters in {worldName}</h1>
          <section className = "characters-grid">
              {characters.map(chr => {
                return <CharacterCard chr={chr}/>
              })}
            </section>
            <section className='add-character'>
            <h4>Add a character!</h4>
              <span className='character-form-question' id="character-name">Character Full Name: <input type='text' name='fullName' className='user-input' value={newCharacter.fullName} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-type">Character Species: <input type='text' name='characterSpecies' className='user-input' value={newCharacter.characterSpecies} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-class">Character Class: <input type='text' name='characterClass' className='user-input' value={newCharacter.characterClass} onChange={e => handleChange(e.target.name, e.target.value)}/></span>
              <span className='character-form-question' id="character-home-location">
                Originally From: <select value={newCharacter.originallyFrom} name='originallyFrom' className='user-input' onChange={ e => handleChange(e.target.name, e.target.value)}>
                  <option>Select Location</option>
                  {locations.map(loc =>
                    <option value={loc.location_name}>{loc.location_name}</option>  
                  )}
                </select>
              </span>
              <span className='character-form-question'id="character-abilities"> Abilities: <textarea name='abilities' className='user-input'value={newCharacter.abilities} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <span className='character-form-question'id="character-biography">Bio: <textarea name='biography' className='user-input'value={newCharacter.biography} onChange={e => handleChange(e.target.name, e.target.value)}></textarea></span>
              <button type='button' onClick={postCharacter}>Submit</button>
          </section>
        </div>
      );
    }

  }

 
  
  
 

  

}

const CharacterCard = (props) => {
  const chr = props.chr;
  return(
    <section className="character-info">
      <h3 id="character-name">Name: {chr.full_name}</h3>
      <p>Species: {chr.character_species}</p>
      <p>Class: {chr.character_class}</p>
      <p>Originally from: {chr.originally_from}</p>
      <p>Abilities: <br/>{chr.abilities}</p>
      <p>Bio: <br/>{chr.biography}</p>
    </section>
  )
}