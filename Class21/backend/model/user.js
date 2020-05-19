const mongoose = require('../db');
const userSchema = { 
    username: String, 
    password: String,
    sessionId: String
}
const User = mongoose.model('User', userSchema);

module.exports = User;