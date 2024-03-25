"use strict";

const { DataTypes,BelongsTo } = require('sequelize');
const { dbConnection } = require('../src/config/database');
const { AssetCategoryType } = require('./AssetCategoryType');

const Asset = dbConnection.define('assets',
    {
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
        }
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

dbConnection.sync({
    // alter: true
}).then(() => {
    console.log('Asset Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

module.exports = {
    Asset
};