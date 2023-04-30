const users = require('./controllers/users-controller.js')

const router = (app) => {
    app.get('/users', users.getUsers)
}

module.exports = router;