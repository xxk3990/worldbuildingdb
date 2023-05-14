const { Sequelize, DataTypes } = require('sequelize');
const seq = new Sequelize('database')
const World = seq.define('World', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
})

module.exports = {World}