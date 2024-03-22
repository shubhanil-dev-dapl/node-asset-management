const { DataTypes } = require('sequelize');
const { dbConnection } = require('../config/database');

// This is not working now.. we have started migration.
const Company = dbConnection.define('companies', {
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
    }
});

dbConnection.sync({
    // alter: true
}).then(() => {
    console.log('Company Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

module.exports = {
    Company
};