'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrementIdentity: true
        },
        location_uuid: {
            type: Sequelize.UUID,
            allowNull: false
        },
        world_uuid: {
            type: Sequelize.UUID,
            allowNull: false
        },
        full_name: {
            type: Sequelize.STRING
        },
        character_species: {
            type: Sequelize.STRING
        },
        character_class: {
            type: Sequelize.STRING
        },
        originally_from: {
            type: Sequelize.STRING
        },
        abilities: {
            type: Sequelize.STRING
        },
        biography: {
            type: Sequelize.STRING
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('characters');
  }
};
