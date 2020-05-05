const mongoose = require('mongoose');
const mongouri = require('./config').mongouri
mongoose.connect(mongouri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;