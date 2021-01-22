// All this file is responsible for right now is importing the User model and exporting an object with it as a property
const User = require('./User');
const Post = require('./Post');

// This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.
// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// we are defining the relationship of the Post model to the User
// The constraint we impose here is that a post can belong to one user, but not many users.
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };
