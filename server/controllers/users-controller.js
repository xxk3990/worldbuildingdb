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
        expiresIn: "30 minutes",
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
    const matchingUser = await models.User.findOne({
        where: {
            'email': req.body.email,
        },
        raw: true
    })
    if (matchingUser.length !== 0) {
        const passwordValid = await bcrypt.compare(req.body.password, matchingUser.password)
        if(passwordValid) {
            const session = uuidv4();
            const secret = process.env.SECRET; //grab secret
            const token = jwt.sign({
                id: matchingUser.id
            }, secret, {
                expiresIn: "30 minutes"
            }) //set session up
    
            return res.status(200).send({ //return accessToken
                user: matchingUser.id,
                email: matchingUser.email,
                user_role: matchingUser.user_role,
                session_id: session,
                accessToken: token
            })
        } else {
            return res.status(401).send({
                status: "Login info is incorrect"
            })
        }
       
    } else {
        return res.status(401).send({
            status: "No user with email address provided exists."
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
        include: [{//this is not working, profile page on front-end thinks worlds_created = undefined
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