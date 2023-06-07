// const {Client} = require('pg')

//const { now } = require('sequelize/types/utils');
const {v4: uuidv4} = require('uuid')
const models = require('../models')
const jwt = require('jsonwebtoken')
const process = require("process")

const getUsers = async (req, res) => {
    const users = await models.User.findAll({ 
        include: [{
            model: models.World,
            attributes: ["world_name", "world_type"],
            as: "worlds_created"
        }],
    })
    //include find
    if(users !== undefined) {
        return res.json(users);
    } else {
        return res.json({"message": "No users added yet."})
    }
    
}
const createAccount = (req, res ) => {
    console.log('Body:',req.body);
    const newUser = {
        id: uuidv4(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        user_role: req.body.user_role
        // created_at: now,
        // updated_at: now
    }
    res.status(201).send({status: 'success!'})
    return models.User.create(newUser);
}

const login = async (req, res) => {
    const matchingUser = await models.User.findAll({where: {'email': req.body.email, 'password': req.body.password}, raw: true})
    if(matchingUser[0].email !== req.body.email || matchingUser[0].password !== req.body.password) {
        return res.status(401).send({status: "Email or password does not match records."})
    } else {
        const session = uuidv4();
        const secret = process.env.SECRET; //grab secret
        const token = jwt.sign({id: matchingUser[0].id}, secret, {expiresIn: '1h'} ) //set session up
    
        return res.status(200).send({ //return accessToken
            user: matchingUser[0].id,
            email: matchingUser[0].email,
            user_role: matchingUser[0].user_role,
            session_id: session,
            accessToken: token
        })
    }
}
module.exports = {getUsers, createAccount, login}