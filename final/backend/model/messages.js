const mongoose = require('../db');
const messagesSchema = { 
    username: String, 
    email: String,
    fullname: String,
    password: String,
    friends: Array,
    feed: Array,
}
const Message = mongoose.model('messages', messagesSchema);

module.exports = Message;