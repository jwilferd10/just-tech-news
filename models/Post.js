const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Create fields/columns for Post model
Post.init(
    {
        // We've identified the id column as the primary key and set it to auto-increment.
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // We define the title column as a String value.
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // also defined as a String
        // we ensure that this url is a verified link by setting the isURL property to true.
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        // Using the references property, we establish the relationship between this post and the user by creating a reference to the User model,
        // specifically to the id column that is defined by the key property, which is the primary key
        // The user_id is conversely defined as the foreign key and will be the matching link.
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // configure the metadata, including the naming conventions.
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;