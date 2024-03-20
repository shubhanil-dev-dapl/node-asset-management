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
    await queryInterface.createTable('asset_allocations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        assetId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        allocationFromDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        allocationToDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.DATE,
        },
        allocatedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        status: {
          type: Sequelize.ENUM('active','inactive', 'pending'),
          allowNull: true,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('asset_allocations');
  }
};
