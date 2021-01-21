// All we're doing here is importing the base Sequelize class and using it to create a new connection to the database.

// Import the sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// The new Sequelize() function accepts the database name, MySQL username, and MySQL password (respectively) as parameters, 
// Then we also pass configuration settings. Once we're done, we simply export the connection.

// create connection to our db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
  
module.exports = sequelize;