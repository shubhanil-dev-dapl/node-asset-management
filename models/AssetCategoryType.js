// models/AssetCategoryType.js
"use strict";

const { DataTypes } = require('sequelize');
const { dbConnection } = require('../src/config/database');

const AssetCategoryType = dbConnection.define(
    "asset_category_types",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        timestamps: true,
        paranoid: true,
    }
);


dbConnection.sync({
}).then(() => {
    console.log('Asset Category Type Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});


module.exports = {
    AssetCategoryType
};