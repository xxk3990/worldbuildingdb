const {
    v4: uuidv4
} = require('uuid')
const models = require('../models')

const getWorlds = async (req, res) => { 
    const worlds = await models.World.findAll({where: {'user_uuid' : req.query.id}},{
        include: [{
            model: models.User,
            attributes: ["id"],
            as: "world_owner"
        }]
    })
    //test out doing if(users.length !== 0) instead, could be a stronger check
    if(worlds !== undefined) {
        return res.json(worlds)
    } else {
        return res.json({"message": "No worlds added yet."})
    }
}

const addWorld = async (req, res) => {
    const worldOwner = await models.User.findAll({where: {'id' : req.body.user}, raw: true})
    console.log(worldOwner)
    const newWorld = {
        //id, user_uuid, world_name, world_type, description
        id: uuidv4(),
        user_uuid: worldOwner[0].id,
        world_name: req.body.world_name,
        world_type: req.body.world_type,
        description: req.body.description
    }
    res.status(201).send({status: 'success!'})
    return models.World.create(newWorld);
}

module.exports = {getWorlds, addWorld}