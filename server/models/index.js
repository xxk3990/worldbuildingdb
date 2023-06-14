'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};
const { userModel } = require('./user');
const {worldModel} = require('./world');
const {locationModel} = require('./location')
const bcrypt = require("bcrypt")

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'postgres',
  host: 'localhost',
})

const models = {
  User: userModel(sequelize, Sequelize.DataTypes),
  World: worldModel(sequelize, Sequelize.DataTypes),
  Location: locationModel(sequelize, Sequelize.DataTypes)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(() => {
    for(const m of Object.values(models)) {
      console.log(m)
      db[m.name] = m;
    }
    // .forEach(model => {
     
    // })
    
  });

  models.User.hasMany(models.World, {
    as: 'worlds_created',
    foreignKey: 'user_uuid'
  })

  models.World.belongsTo(models.User, {
    as: 'world_owner',
    foreignKey:'user_uuid'
  })

  models.World.hasMany(models.Location, {
    as: "locations_in_world",
    foreignKey: 'world_uuid'
  })

  models.Location.belongsTo(models.World, {
    as: "exists_in",
    foreignKey: "world_uuid"
  })

 




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;