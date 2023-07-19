const users = require('./controllers/users-controller.js')
const worlds = require('./controllers/worlds-controller.js')
const admin = require('./controllers/admin-controller.js')
const locs = require("./controllers/locations-controller.js")
const chars = require("./controllers/characters-controller.js")
const mid = require("./middleware/verify-auth.js")

const router = (app) => {
    app.post('/login', users.login)
    app.post('/addUser', users.createAccount)
    app.get('/verify', mid.verifyRequestAuth, mid.verifySession)
    app.get('/users', mid.verifyRequestAuth, admin.getAllUsers)
    app.get('/allWorlds', mid.verifyRequestAuth, admin.getAllWorlds)
    app.get('/worlds', mid.verifyRequestAuth, worlds.getWorlds)
    app.post('/addWorld', mid.verifyRequestAuth, worlds.addWorld)
    app.delete('/deleteWorld', mid.verifyRequestAuth, worlds.deleteWorld)
    app.get('/profile', mid.verifyRequestAuth, users.userProfile)
    app.get('/locations', mid.verifyRequestAuth, locs.getAllLocations)
    app.post('/addLocation', mid.verifyRequestAuth, locs.addLocation)
    app.delete('/deleteLocation', mid.verifyRequestAuth, locs.deleteLocation)
    app.get("/characters", mid.verifyRequestAuth, chars.getCharacters)
    app.post("/addCharacter", mid.verifyRequestAuth, chars.addCharacter)
    app.delete("/deleteCharacter", mid.verifyRequestAuth, chars.deleteCharacter)
    app.post('/logout', mid.verifyRequestAuth, users.logout)
}

module.exports = router;