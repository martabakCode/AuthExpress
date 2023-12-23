// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gdsc', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
});

module.exports = sequelize;
