'use strict';
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrementIdentity: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.STRING,
    world_uuid: {
      type: DataTypes.UUID,
    },
    }, 
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true
    },
    {
      // classMethods: {
      //   associate:(models) => {
      //     User.hasMany(models.World, {
      //       foreignkey: 'world_uuid'
      //     })
      //   }
      // }
    }
    );
  return User;
}

module.exports = {userModel}

