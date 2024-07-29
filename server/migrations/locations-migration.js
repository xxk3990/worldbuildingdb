'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrementIdentity: true
        },
        world_uuid: {
            type: Sequelize.UUID,
            allowNull: false
        },
        location_name: {
            type: Sequelize.STRING
        },
        location_type: {
            type: Sequelize.STRING
        },
        inhabitants: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};
