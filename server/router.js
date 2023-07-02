const users = require('./controllers/users-controller.js')
const worlds = require('./controllers/worlds-controller.js')
const admin = require('./controllers/admin-controller.js')
const locs = require("./controllers/locations-controller.js")
const mid = require("./middleware/verify-auth.js")

const router = (app) => {
    app.post('/login', users.login)
    app.post('/addUser', users.createAccount)
    app.get('/verify', mid.verifyAuth)
    app.get('/users', mid.verifyAuth, admin.getAllUsers)
    app.post('/addWorld', mid.verifyAuth, worlds.addWorld)
    app.get('/worlds', mid.verifyAuth, worlds.getWorlds)
    app.get('/profile', mid.verifyAuth, users.userProfile)
    app.get('/locations', mid.verifyAuth, locs.getAllLocations)
    app.post('/addLocation', mid.verifyAuth, locs.addLocation)
}

module.exports = router;