// All this file is responsible for right now is importing the User model and exporting an object with it as a property
const Vote = require('./Vote');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

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


// We instruct the application that the User and Post models will be connected, but in this case through the Vote model. 
// We state what we want the foreign key to be in Vote, which aligns with the fields we set up in the model. 
// We also stipulate that the name of the Vote model should be displayed as voted_posts when queried on, making it a little more informative.
// associate User and Post to one another in a way that when we query Post, we can see a total of how many votes a user creates; 
// and when we query a User, we can see all of the posts they've voted on.
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});
  
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});
  
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };
