import '../styles/characters.css'
import React, { useState, useMemo, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { checkAuth, handleLogout } from '../services/auth-service';

export default function Character() {
    const navigate = useNavigate()
    const characterID = localStorage.getItem("character_uuid")
    const currentUser = localStorage.getItem("user")
    const [character, setCharacter] = useState({
        full_name: '',
        character_species: '',
        character_class: "",
        originally_from: "",
        abilities: "",
        biography: ""
    })

    const goBackToCharacterList = () => {
        navigate('/characters')
    }
    const getCharacter = async () => { //get character method
        console.log(characterID)
        const authorized = await checkAuth()
        if(authorized === false) {
            localStorage.clear(); //clear everything
            sessionStorage.setItem("page", "") //requested page has to be worlds because locations and chars require world info
            navigate('/login');
        } else {
            const endpoint = `character?character=${characterID}&id=${currentUser}`; //get data unique to the current character
            await fetch(`http://localhost:3000/${endpoint}`, {
                method: 'GET',
                credentials: "include"
            }).then(response => response.json(),
            []).then(responseData => {
                console.log('responseData', responseData)
                return setCharacter({
                    full_name: responseData.full_name,
                    character_class: responseData.character_class,
                    character_species: responseData.character_species,
                    abilities: responseData.abilities,
                    biography: responseData.biography,
                    originally_from: responseData.originally_from
                })
            })
        }
      }
    useEffect(() => {
        getCharacter()
        document.title = `${character.full_name} - WorldbuildingDB`
    }, [])
    return (
        <div className="Character">
            <button onClick={goBackToCharacterList}>Back to Character List</button>
            <h1>{character.full_name}</h1>
            <section className='character-container'>
                <section className='character-details'>
                    <ul className="character-props">
                        <li className='character-prop'>
                            <h4>Species</h4>
                            <span>{character.character_species}</span>
                        </li>
                        <li className='character-prop'>
                            <h4>Class</h4>
                            <span>{character.character_class}</span>
                        </li>
                        <li className='character-prop'>
                            <h4>Home World</h4>
                            <span>{character.originally_from}</span>
                        </li>
                        <li className='character-abilities'>
                            <h4>Abilities</h4>
                            <span>{character.abilities}</span>
                        </li>
                    </ul>
                </section>
                <section className='character-bio'>
                    <h4>Bio</h4>
                    {character.biography}
                </section>
            </section>
        </div>
    )

}