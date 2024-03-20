'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('notifications', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      notifiedTo: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      notificationMessage: {
        type: DataTypes.STRING(160),
        defaultValue: '',
        allowNull: true
      },
      notifiedDateTime: {
        type: DataTypes.DATE,
        unique: true,
        allowNull: true
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('notifications');
  }
};
