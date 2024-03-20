// models/AssetAllocation.js
"use strict";

const secrets = [

];

module.exports = function (sequelize, DataTypes) {
    const AssetAllocation = sequelize.define(
        "asset_allocations",
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
                type: Sequelize.ENUM('active', 'inactive', 'pending'),
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    AssetAllocation.prototype.purge = function () {
        const clean = {};
        for (const key of Object.keys(this.dataValues)) {
            if (!secrets.includes(key)) {
                clean[key] = this.dataValues[key];
            }
        }
        return clean;
    };

    return AssetAllocation;
};