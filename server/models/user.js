'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //  User.hasMany(models.World)
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.STRING,
    }, 
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true
    });
    sequelize.sync() // You can run without syncing, mess around with it
  return User;
};

