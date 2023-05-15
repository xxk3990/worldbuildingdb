const dotenv = require('dotenv');

dotenv.config();


module.exports = {
  "development": {
    "username": null,
    "password": null,
    "database": "worldbuildingdb",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "database_prod",
    "dialect": "postgres"
  }
}