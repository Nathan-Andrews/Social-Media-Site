const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');
const db = require('./db').connection;
const bodyParser = require('body-parser');

const config = require('./config');
const {port, mongouri} = config
const userController = require('./controller/users')
const signup = userController.signup;
const login = userController.login
const sendValidatedUser = userController.sendValidatedUser
//const logoutUser = userController.logoutUser
const validateUser = require('./middleware')

const whitelist = ['http://localhost:3000', '*']
const corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true)
    /*if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }*/
  },
  //origin: '*',
  credentials:true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json())


app.post('/login', login);
//app.post('/logout', validateUser, logoutUser);
app.post('/signup', signup);
//app.get('/messages');
app.get('/loggedInUser', validateUser, sendValidatedUser);
//app.post('/message');
app.get('/users', validateUser);
//app.post('/addFriend');
app.get('/feed/:userId', (req,res) => {
    res.send(req.params.userId)
})

app.use(express.static('*'))

db.once('open', function() {
    app.listen(port, (err)=>{ 
        if(err) 
        throw err; 
        console.log(`listening on port ${port}`);
    }); 
});