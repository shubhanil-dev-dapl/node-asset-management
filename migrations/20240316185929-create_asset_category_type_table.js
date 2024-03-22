'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('table_name', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('asset_category_types',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      },

    );

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('table_name');
     */
    await queryInterface.dropTable('asset_category_types');
  }
};
