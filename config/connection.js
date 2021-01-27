// All we're doing here is importing the base Sequelize class and using it to create a new connection to the database.

// Import the sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

// create connection to our db
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;