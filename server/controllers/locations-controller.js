const models = require('../models')

const getAllLocations = async (req, res) => {
    const locations = await models.Location.findAll({
        include: [{
            model: models.World,
            attributes: ["world_name"],
            as: "exists_in"
        }],
    })
    //include find
    if (locations !== undefined) {
        return res.json(locations);
    } else {
        return res.json({
            "message": "No users added yet."
        })
    }

}

module.exports = {getAllLocations}