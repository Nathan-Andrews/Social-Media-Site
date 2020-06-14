const mongoose = require('../db');
const messagesSchema = { 
    users:Array,
    messages:Array,
}
const Message = mongoose.model('messages', messagesSchema);

module.exports = Message;