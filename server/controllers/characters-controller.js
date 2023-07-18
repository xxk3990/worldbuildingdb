const {
    v4: uuidv4
} = require('uuid')
const models = require('../models')

const getCharacters = async (req, res) => { 
    const characters = await models.Character.findAll({where: {'world_uuid' : req.query.world}, raw:true},{
        include: [{
            model: models.Location,
            attributes: ["location_name"],
            as: "home_location"
        }]
    })
    if(characters.length !== 0) {
        return res.json(characters)
    } else {
        return res.send([]) //send empty response so front-end can check if characters.length === 0
    }
}

const addCharacter = async (req, res) => {
    const overallWorld = await models.World.findOne({where: {'id': req.body.world}, raw:true})
    const homeLocation = await models.Location.findOne({where: {"location_name" : req.body.originally_from}, raw:true})
    const newCharacter = {
        //id, location_uuid, world_uuid, full_name, character_species, character_class, originally_from, abilities, biography
        id: uuidv4(),
        location_uuid: homeLocation.id,
        world_uuid: overallWorld.id,
        full_name: req.body.full_name,
        character_species: req.body.character_species,
        character_class: req.body.character_class,
        originally_from: homeLocation.location_name,
        abilities: req.body.abilities,
        biography: req.body.biography
    }
    res.status(201).send({"message": 'success!'})
    return models.Character.create(newCharacter);
}

module.exports = {
    getCharacters,
    addCharacter
}