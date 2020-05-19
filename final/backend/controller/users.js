const { v4: uuidv4} = require('uuid')
const User = require('../model/users')
const md5 = require('md5');
const db = require('../db').connection

const createUUID = () => {
    return uuidv4()
}
const signup = (req,res) => {
    //console.log(req.body)
    const {username, email, password, description} = req.body
    const userCollection = db.collection('users')
    //res.send('sent')
    userCollection.countDocuments({$or: [{username}, {email}]}, (err,userCount) => {
      if (userCount > 0) {
        res.status(400);
        res.json({error:'username or email taken'})
        return
      }
      const sessionId = createUUID();
      const newPassword = md5(password)
      const user = new User({
          username: username,
          email: email,
          password: newPassword,
          description:description,
          sessionId
      });
      user.save(function (err, user) {
          if (err) {
            console.error(err)
            res.send(err)
            return
          }
          res.cookie('sessionId', sessionId)
          res.send('success')
      });
    })
}
const login = (req,res) => {
    console.log(req.body)
    const {email, password} = req.body
    const userCollection = db.collection('users');
    const newPassword = md5(password)
    if (!req.body) {
        res.status(400)
        res.send('no request found')
        return
    } else {
        userCollection.find({email : email}).toArray((err, result) => {
            const user = result[0]
            if(user && email === user.email && newPassword === user.password) {
                res.status(200)
                res.json({user: user})
            }else {
                res.status(400)
                res.json({error:"incorrect creditials"})
            }
        })
    }
}

module.exports = {signup, login}