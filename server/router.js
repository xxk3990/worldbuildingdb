const users = require('./controllers/users-controller.js')

const router = (app) => {
    app.get('/users', users.getUsers)
    app.post('/addUser', users.addUser)
}

module.exports = router;