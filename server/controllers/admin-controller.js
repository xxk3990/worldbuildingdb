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
    //include find
    //test out doing if(users.length !== 0) instead, could be a stronger check
    if (users !== undefined) { 
        return res.json(users);
    } else {
        return res.json({
            "message": "No users added yet."
        })
    }

}

module.exports = {
    getAllUsers,
}