// models/AssetCategoryType.js
"use strict";

const secrets = [

];

module.exports = function (sequelize, DataTypes) {
    const AssetCategoryType = sequelize.define(
        "asset_category_type",
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
        {
            timestamps: true,
            paranoid: true,
        }
    );

    AssetCategoryType.prototype.purge = function () {
        const clean = {};
        for (const key of Object.keys(this.dataValues)) {
            if (!secrets.includes(key)) {
                clean[key] = this.dataValues[key];
            }
        }
        return clean;
    };

    return AssetCategoryType;
};