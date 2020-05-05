const express = require('express'); 
const cookieParser = require('cookie-parser'); 
//setup express app 
const app = express() 
const cors = require('cors');
const db = require('./db').connection
const bodyParser = require('body-parser')
const signup = require('./controller/user').signup
  
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json())


//basic route for homepage 
/*app.get('/', (req, res)=>{ 
res.send('welcome to express app'); 
});*/
app.use(express.static('../frontend/build'))


//JSON object to be added to cookie 
const users = { 
name : "Ritik", 
Age : "18"
}
const port = process.env.PORT || 4000;

app.post('/signup',signup)
  
//Route for adding cookie 
/*app.get('/setuser', (req, res)=>{ 
res.cookie("userData", users);
res.send('user data added to cookie');
});
  
//Iterate users data from cookie 
app.get('/getuser', (req, res)=>{ 
//shows all the cookies 
res.send(req.cookies); 
}); */
  

db.once('open', function() {
    app.listen(port, (err)=>{ 
        if(err) 
        throw err; 
        console.log(`listening on port ${port}`);
    }); 
});
