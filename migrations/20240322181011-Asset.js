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

    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      purchase_from: {
        type: DataTypes.STRING,
        allowNull: true
      },
      warrenty_till_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      asset_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      invoice_copy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: '1=Working, 2= Partially working, 3= Damaged'
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('assets');
  }
};
