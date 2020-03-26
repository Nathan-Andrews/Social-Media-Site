const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser')
const ObjectID = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'socialMedia';


const PORT = 1928;
const app = express();

const corsOptions ={
    origin: true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

MongoClient.connect(url, { useUnifiedTopology: true }, function(err,client) {
    if (err) {
        throw new Error(err);
    }

    const db = client.db(dbName);
    const userCollection = db.collection('users');
    const messagesCollection = db.collection('messages');

    app.post('/login', (req,res) => {
        //const {username, password} = req.body
        userCollection.find({username : req.body.username}).toArray((err, result) => {
            const user = result[0]

            if(user && req.body.username === user.username &&req.body.password === user.password) {
                res.status(200)
                res.json('sucess')
            }else {
                res.status(400)
                res.json({error:"some error"})
            }
        })
    });
    app.post('/signup', (req,res) => {
        const {username, password, confirmPassword, email, shortDescription} =  req.body;
        if (!username) {
            res.status(400);
            res.json({error:'username required'});
            return;
        }
        userCollection.countDocuments({$or: [{username}, {email}]}, (err,userCount) => {
            if (userCount > 0) {
                res.status(400);
                res.json({error:'username or email taken'})
                return;
            }else {
                userCollection.insertOne({username, password, confirmPassword, email, shortDescription}, (err,result) => {
                    res.json({
                        username, password, confirmPassword, email, shortDescription
                    })
                })
                res.status(200);
            }
        })
    });
    app.get('/messages', (req,res) => {
        /*const {username} = req.query
        //console.log(username);
        userCollection.find({username : username}).toArray((err, result) => {
            const message = result.toMessage
            if (err) {
                res.status(400)
                console.log(err)
                return
            }
            if (!message) {
                res.status(200)
                res.json('no messages')
                return
            }
            //console.log(message.user.toMessage)
        })*/
    });
    app.get('/loggedInUser', (req,res) => {
        //console.log(req.query.username);
        const username = req.query.username
        const password = req.query.password
        userCollection.find({username : username}).toArray((err, result) => {
            const user = result[0]
            //console.log(user)
            if (!user) {
                res.json({})
                return
            }
            if (username === user.username && password === user.password) {
                res.status(200)
                res.json({user: user})
            }else {
                res.status(400)
                res.json({error:"some error"})
            }
        })
    });
    app.post('/message', (req,res) => {
        const {username, password, _id, messageText} = req.body
        //console.log(messageText)
        console.log(_id)
        userCollection.find({username : username}).toArray((err, result) => {
            const user = result[0]
            if (!user) {
                res.json({})
                return
            }
            if (username === user.username && password === user.password) {
                userCollection.updateOne({_id: ObjectID(_id)}, {$push: {fromMessage: {messageText, _id}}}, (err, results) => {
                    console.log(err)
                    console.log(results)
                })
                userCollection.updateOne({username: username}, {$push: {toMessage: {messageText, _id}}})

                res.status(200)
                res.json('sent')
            }else {
                res.status(400)
                res.json({error:"some error"})
            }
        })
    });
    app.get('/users', (req,res) => {
        if (!req.query || !req.query.user) {
            res.status(400);
            res.json({error:'user is a required query peramiter'});
            return;
        }
        //console.log(req.query)
        userCollection.find({username:{$ne:req.query.user}}, {projection:{username:1, shortDescription:1}}).toArray((err, result) => {
            const users = result
            if(!err) {
                res.status(200)
                res.json({users: users})
                //console.log(users)
            }else {
                res.status(400)
                res.json({error:err})
            }
        })
    });
    app.post('/addFriend', (req,res) => {
        
    });

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })

});