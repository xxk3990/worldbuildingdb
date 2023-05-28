const users = require('./controllers/users-controller.js')
const worlds = require('./controllers/worlds-controller.js')

const router = (app) => {
    app.get('/users', users.getUsers)
    app.post('/addUser', users.addUser)
    app.get('/worlds', worlds.getWorlds)
    app.post('/addWorld', worlds.addWorld)
}

module.exports = router;