// const {Client} = require('pg')

//const { now } = require('sequelize/types/utils');
const models = require('../models')

const getUsers = async (req, res) => {
    const users = await models.User.findAll()
    //include find
    return res.json(users);
}
const addUser = (req, res ) => {
    console.log('Body:',req.body);
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        // created_at: now,
        // updated_at: now
    }
    return models.User.create(newUser);
}
module.exports = {getUsers, addUser}