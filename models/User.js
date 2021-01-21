const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.
// create our User model
class User extends Model {}

// Once we create the User class, we use the .init() method to initialize the model's data and configuration, passing in two objects as arguments.
// The first object will define the columns and data types for those columns. The second object it accepts configures certain options for the table.
// Define table columns and configuration
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );
  
  module.exports = User;