const Sequelize = require('sequelize');

//if using heroku posgres as your db, you will have access to environment variable DATABASE_URL
//initialize db here
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate', { logging: false })

module.exports = db;
