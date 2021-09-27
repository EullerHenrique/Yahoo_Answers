const Sequelize = require('sequelize');

const connection = new Sequelize('ask', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;