const users = require('./controllers/users-controller.js')
const worlds = require('./controllers/worlds-controller.js')

const router = (app) => {
    app.get('/users', users.getUsers)
    app.post('/addUser', users.createAccount)
    app.post('/addWorld', worlds.addWorld)
    app.get('/worlds', worlds.getWorlds)
    app.post('/login', users.login)
}

module.exports = router;