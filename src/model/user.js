const { DataTypes } = require('sequelize');
const { dbConnection } = require('../config/database');
// This is Working Now.. we didn't have started migration yet in this model
const User = dbConnection.define('users', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true
    },
    // fullName: {
    //     type: DataTypes.VIRTUAL,
    //     get() {
    //         return `${this.firstName} ${this.lastName}`;
    //     },
    //     set(value) {
    //         throw new Error('Do not try to set the `fullName` value!');
    //     }
    // },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    mobile: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otpCreatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
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
    emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emergencyContactPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    experienceLevel: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'delete'),
        defaultValue: 'active',
        allowNull: true
    }
});

dbConnection.sync({
    // alter: true
}).then(() => {
    console.log('User Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

module.exports = {
    User
};