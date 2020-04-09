const server =  require('./server');
const config = require('./config');
const kittyControler = require('./controler/kitties')
const db = require('./db');
db.once('open', function() {
    server.listen(config.port, () => {
        console.log(`server is running on port ${config.port}`)
        server.get('/kitties', kittyControler.getKitties)
    })
});