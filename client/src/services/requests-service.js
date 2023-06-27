export const handleGet = async (url, token, setData) => {
    await fetch(url, {
        method: 'GET',
        headers: {"Authorization": `Bearer ${token}`} //pass in token as header
    }).then(response => {
        if(response.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        } else {
            return response.json()
        }
    }, []).then(data => {
        return setData(data);
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