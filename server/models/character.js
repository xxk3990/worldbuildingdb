'use strict';
const characterModel = (sequelize, DataTypes) => {
    const Character = sequelize.define('Character', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrementIdentity: true
        },
        location_uuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        world_uuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING
        },
        character_species: {
            type: DataTypes.STRING
        },
        character_class: {
            type: DataTypes.STRING
        },
        originally_from: {
            type: DataTypes.STRING
        },
        abilities: {
            type: DataTypes.STRING
        },
        biography: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'Character',
        tableName: 'characters',
        underscored: true
    });
  return Character
}

module.exports = {characterModel}