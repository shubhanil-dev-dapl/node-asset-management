// models/Company.js
"use strict";

const secrets = [

];

module.exports = function (sequelize, DataTypes) {
    const Company = sequelize.define(
        "companies",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            logo: {
                type: DataTypes.STRING,
                defaultValue: '',
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true
            },
            postalCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive', 'deleted'),
                defaultValue: 'active',
                allowNull: true
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

    Company.prototype.purge = function () {
        const clean = {};
        for (const key of Object.keys(this.dataValues)) {
            if (!secrets.includes(key)) {
                clean[key] = this.dataValues[key];
            }
        }
        return clean;
    };

    return Company;
};