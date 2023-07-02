// const {Client} = require('pg')

//const { now } = require('sequelize/types/utils');
const cookie = require("cookie-parser")
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
    return res.status(200).send()
}

const login = async (req, res, next) => {
    const matchingUser = await models.User.findOne({
        where: {
            'email': req.body.email,
        },
        raw: true
    })
    if (matchingUser.length !== 0) {
        const passwordValid = await bcrypt.compare(req.body.password, matchingUser.password)
        if (passwordValid) {
            const session = uuidv4();
            const secret = process.env.SECRET; //grab secret
            const token = jwt.sign({
                id: matchingUser.id
            }, secret, {
                expiresIn: "30 minutes"
            }) //set session up
            const requiredUserData = {
                user: matchingUser.id,
                user_role: matchingUser.user_role
            }
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 1800000, //30 min
            }).status(200).json(requiredUserData)
            
        } else {
            return res.status(401).send({
                status: "Login info is incorrect"
            })
        }

    } else {
        return res.status(401).send({
            status: "No user with info provided exists."
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
        include: [{ //this is not working, profile page on front-end thinks worlds_created is undefined
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
    userProfile,
}