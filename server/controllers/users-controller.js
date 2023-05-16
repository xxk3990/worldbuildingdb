// const {Client} = require('pg')

//const { now } = require('sequelize/types/utils');
const {v4: uuidv4} = require('uuid')
const models = require('../models')

const getUsers = async (req, res) => {
    const users = await models.User.findAll()
    //include find
    if(users !== undefined) {
        return res.json(users);
    } else {
        return res.json({"message": "No users added yet."})
    }
    
}
const addUser = (req, res ) => {
    console.log('Body:',req.body);
    const newUser = {
        id: uuidv4(),
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