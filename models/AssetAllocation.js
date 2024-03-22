"use strict";

const { DataTypes } = require('sequelize');
const { dbConnection } = require('../src/config/database');

const AssetAllocation = dbConnection.define('asset_allocations',
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
            allowNull: true,
        },
        allocationToDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        allocatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'pending'),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }
);

dbConnection.sync({
    // alter: true
}).then(() => {
    console.log('Asset Allocation Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

module.exports = {
    AssetAllocation
};