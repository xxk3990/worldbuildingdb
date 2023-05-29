const users = require('./controllers/users-controller.js')
const worlds = require('./controllers/worlds-controller.js')

const router = (app) => {
    app.get('/users', users.getUsers)
    app.post('/addUser', users.addUser)
    app.post('/addWorld', worlds.addWorld)
    app.get('/worlds', worlds.getWorlds)
}

module.exports = router;