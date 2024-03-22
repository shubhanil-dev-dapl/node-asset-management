'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: true
      },
      category_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      purchase_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      purchase_from: {
        type: Sequelize.STRING,
        allowNull: true
      },
      warrenty_till_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      asset_code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      invoice_copy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      images: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: '1=Working, 2= Partially working, 3= Damaged'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
