const mongoose = require('../db');
const usersSchema = { 
    username: String, 
    email: String,
    password: String,
    description: String,
    friends: Array,
    feed: Array,
    sessionId: String
}
const User = mongoose.model('users', usersSchema);

module.exports = User;