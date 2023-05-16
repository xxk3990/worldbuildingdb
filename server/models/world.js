const worldModel = (sequelize, DataTypes) => {
    const World = sequelize.define('World', {
        id: { 
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrementIdentity: true
        },
        user_uuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        world_name: {
            type: DataTypes.STRING
        },
        world_type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        underscored: true,
        modelName: 'World',
        tableName: 'worlds',
    }, {
        classMethods: {
            associate:(models)=> {
                World.belongsTo(models.User,{foreignKey:'user_uuid'})
            }
        }
    })
    return World
}


module.exports = {worldModel}