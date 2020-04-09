const Kitten = require('../model/Kitty')
const getKitties = (req,res) => {
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        res.json({kittens});
    })
};
module.exports = {getKitties};