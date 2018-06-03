const Sequelize = require('sequelize');
const db = require('../__db.js');


//define model(s) here
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false       
    }
})

module.exports = User;
