const mongoose = require('../db');
const usersSchema = { 
    username: String, 
    email: String,
    fullname: String,
    password: String,
    description: String,
    friends: Array,
    feed: Array,
}
const User = mongoose.model('users', usersSchema);

module.exports = User;