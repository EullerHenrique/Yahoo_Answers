const Sequelize = require('sequelize');
const connection = require('./db');

const Answer = connection.define("answerks", {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


Answer.sync({force: false});

module.exports = Answer;
