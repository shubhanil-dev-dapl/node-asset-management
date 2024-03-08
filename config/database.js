const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'demo_project',
    process.env.DB_USERNAME || 'root',
    process.env.DB_PASSWORD || 'admin#123',
    {
        host: process.env.DB_HOST || '0.0.0.0',
        dialect: process.env.DB_DRIVER || 'mysql'
    }
);

module.exports = {
    sequelize
};