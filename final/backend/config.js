const port = process.env.PORT || 1928;
const mongouri = process.env.MONGOURI || 'mongodb://localhost:27017/socialMedia';

module.exports = {port, mongouri}