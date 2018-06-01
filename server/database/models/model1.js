const Sequelize = require('sequelize');
const db = require('../__db.js');


//define model(s) here
const model1 = db.define('model1', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = model1;