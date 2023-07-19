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

    if(worlds.length !== 0) {
        return res.json(worlds)
    } else {
        return res.send([]) //send empty response so front-end can check if worlds.length === 0
    }
}

const addWorld = async (req, res) => {
    const worldOwner = await models.User.findOne({where: {'id' : req.body.user}, raw: true})
    console.log(worldOwner)
    const newWorld = {
        //id, user_uuid, world_name, world_type, description
        id: uuidv4(),
        user_uuid: worldOwner.id,
        world_name: req.body.world_name,
        world_type: req.body.world_type,
        description: req.body.description
    }
    res.status(201).send({"message": 'success!'})
    return models.World.create(newWorld);
}

const deleteWorld = async (req, res) => {
    res.status(200).send({"message": "Success!"})
    return models.World.destroy({where: {'id':req.query.world}})
}

module.exports = {getWorlds, addWorld, deleteWorld}