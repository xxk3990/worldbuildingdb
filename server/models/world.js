const { Sequelize, DataTypes } = require('sequelize');
const seq = new Sequelize('postgres')
const World = seq.define('World', {
    id: { 
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    user_uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    world_type: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
}, {
    seq,
    underscored: true,
    modelName: 'World',
    tableName: 'worlds',
    associate:(models)=> {
        World.belongsTo(models.user,{foreignKey:'user_uuid'})
    }
})

module.exports = {World}