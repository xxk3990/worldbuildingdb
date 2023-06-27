export const handleGet = async (url, token, setDataInComponent) => {
    await fetch(url, {
        method: 'GET',
        headers: {"Authorization": `Bearer ${token}`} //pass in token as header
    }).then(response => {
        if(response.status === 401) {
            localStorage.clear();
            window.location.href = "/";
        } else {
            return response.json()
        }
    }, []).then(responseData => {
    //The data for the component is the main setXXX variable (example: setWorlds, setLocations)
        return setDataInComponent(responseData); //set it equal to data from API
    })
}

export const handlePost = (url, token, body) => {
    const requestParams = {
        method: 'POST',
        headers: {
          "Content-Type" : 'application/json',
          "Authorization" : `Bearer ${token}`
        }, 
        body: JSON.stringify(body)
    }
    return fetch(url, requestParams)
}