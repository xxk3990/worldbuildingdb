const users = require('./controllers/users-controller.js')
const worlds = require('./controllers/worlds-controller.js')
const admin = require('./controllers/admin-controller.js')

const router = (app) => {
    app.get('/users', admin.getAllUsers)
    app.post('/addUser', users.createAccount)
    app.post('/addWorld', worlds.addWorld)
    app.get('/worlds', worlds.getWorlds)
    app.post('/login', users.login)
    app.get('/profile', users.userProfile)
}

module.exports = router;