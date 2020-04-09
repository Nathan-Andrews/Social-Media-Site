const mongoose = require('mongoose');
const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);
const fluffy = new Kitten({ name: 'fluffy' });
/*return
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
});*/
module.exports = Kitten