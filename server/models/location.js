'use strict';
const locationModel = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrementIdentity: true
        },
        world_uuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        location_type: {
            type: DataTypes.STRING
        },
        inhabitants: {
            type: DataTypes.STRING,
        },
        location_description: {
            type: DataTypes.STRING
        },
        sequelize,
        modelName: 'Location',
        tableName: 'locations',
        underscored: true
    });
    return Location;
}

module.exports = {
    locationModel
}