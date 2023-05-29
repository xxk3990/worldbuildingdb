const {
    v4: uuidv4
} = require('uuid')
const models = require('../models')

const getWorlds = async (req, res) => {
    //TODO: Figure out how to get specific user's uuid 
    const worlds = models.World.findAll({
        include: [{
            model: models.User,
            attributes: ["first_name", "last_name"],
            as: "world_owner"
        }],
    })
    if(worlds !== undefined) {
        return res.json(worlds)
    } else {
        return res.json({"message": "No worlds added yet."})
    }
}

const addWorld = async (req, res) => {
    const worldOwner = await models.User.findAll({where: {'username' : req.body.user}, raw: true})
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