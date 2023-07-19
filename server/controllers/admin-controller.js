const models = require('../models')

/* File for all routes accessible by admin users only */

const getAllUsers = async (req, res) => {
    const users = await models.User.findAll({
        include: [{
            model: models.World,
            attributes: ["world_name", "world_type"],
            as: "worlds_created"
        }],
    })
    if (users.length !== 0) { 
        return res.json(users);
    } else {
        return res.json({
            "message": "No users added yet."
        })
    }

}

const getAllWorlds = async (req, res) => {
    const worlds = await models.World.findAll({
        include: [{
            model: models.User,
            attributes: ["username"],
            as: "world_owner"
        }]
    })
    if(worlds.length !== 0) {
        return res.json(worlds);
    } else {
        return res.json({
            "message": "No worlds added yet."
        })
    }
}

module.exports = {
    getAllUsers,
    getAllWorlds
}