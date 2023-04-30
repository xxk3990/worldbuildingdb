// const {Client} = require('pg')

const models = require('../models')

const getUsers = async (req, res) => {
    const users = await models.User.findAll()
    return res.json(users);
}
module.exports = {getUsers}