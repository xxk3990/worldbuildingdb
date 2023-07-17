const models = require('../models')
const {
    v4: uuidv4
} = require('uuid')
const getAllLocations = async (req, res) => {

    const locations = await models.Location.findAll({where: {'world_uuid' : req.query.worldID}, raw:true},
        {
        include: [{
            model: models.World,
            attributes: ["world_name"],
            as: "exists_in"
        }],
    })
    if (locations.length !== 0) {
        return res.json(locations);
    } else {
        return res.send([]) //send empty response so front end can do if locations === 0
    }

}

const addLocation = async (req, res) => {
    const world = await models.World.findAll({where: {'id' : req.body.world}, raw: true})
    const newWorld = {
        //id, user_uuid, world_name, world_type, description
        id: uuidv4(),
        world_uuid: world[0].id,
        location_name: req.body.location_name,
        location_type: req.body.location_type,
        inhabitants: req.body.inhabitants,
        description: req.body.description
    }
    res.status(201).send({status: 'success!'})
    return models.Location.create(newWorld);
}

module.exports = {
    getAllLocations, 
    addLocation
}