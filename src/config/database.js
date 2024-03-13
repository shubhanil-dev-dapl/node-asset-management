const { Sequelize } = require('sequelize');

try {
    // await sequelize.authenticate();
    const sequelize = new Sequelize(
        process.env.DB_DATABASE || 'demo_project',
        process.env.DB_USERNAME || 'root',
        process.env.DB_PASSWORD || 'admin#123',
        {
            host: process.env.DB_HOST || '127.0.0.1',
            dialect: process.env.DB_DRIVER || 'mysql'
        }
    );

    module.exports = {
        sequelize
    };
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}