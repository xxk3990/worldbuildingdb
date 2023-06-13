// const {Client} = require('pg')

//const { now } = require('sequelize/types/utils');
const {
    v4: uuidv4
} = require('uuid')
const models = require('../models')
const jwt = require('jsonwebtoken')
const process = require("process")
const bcrypt = require("bcrypt");


const saltRounds = 10;

const createAccount = async (req, res) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password.toString(), salt)
    const newUser = {
        id: uuidv4(),
        username: req.body.username,
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        user_role: req.body.user_role
        // created_at: now,
        // updated_at: now
    }
    models.User.create(newUser);
    const session = uuidv4();
    const secret = process.env.SECRET; //grab secret
    const token = jwt.sign({
        id: newUser.id
    }, secret, {
        expiresIn: "30 minutes"
    }) //set session up
    return res.status(200).send({ //return accessToken
        newUser,
        user: newUser.id,
        email: newUser.email,
        user_role: newUser.user_role,
        session_id: session,
        accessToken: token
    })
}

const login = async (req, res) => {
    const matchingUser = await models.User.findAll({
        where: {
            'email': req.body.email,
        },
        raw: true
    })
    if (matchingUser.length !== 0) {
        const passwordExists = await bcrypt.compare(req.body.password, matchingUser[0].password)
        if(passwordExists) {
            const session = uuidv4();
            const secret = process.env.SECRET; //grab secret
            const token = jwt.sign({
                id: matchingUser[0].id
            }, secret, {
                expiresIn: "30 minutes"
            }) //set session up
    
            return res.status(200).send({ //return accessToken
                user: matchingUser[0].id,
                email: matchingUser[0].email,
                user_role: matchingUser[0].user_role,
                session_id: session,
                accessToken: token
            })
        } else {
            return res.status(401).send({
                status: "Username or Password is incorrect"
            })
        }
       
    } else {
        return res.status(401).send({
            status: "User does not exist."
        })
    }
}

const userProfile = async (req, res) => {
    const matchingUser = await models.User.findOne({
        where: {
            'id': req.query.id
        },
        raw: true,
    }, {
        include: [{
            model: models.World,
            attributes: ["world_name", "world_type"],
            as: "worlds_created"
        }],
    })
    if (matchingUser.length !== 0) {
        return res.json(matchingUser)
    } else {
        return res.status(401).send({
            status: "You are not logged in."
        })
    }
}

module.exports = {
    createAccount,
    login,
    userProfile
}