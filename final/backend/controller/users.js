const { v4: uuidv4} = require('uuid')
const User = require('../model/users')
const md5 = require('md5');
const db = require('../db').connection
const userCollection = require('../model/users')
const ObjectId = require('mongodb').ObjectID;

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
    const {email, password} = req.body
    const userCollection = db.collection('users');
    const newPassword = md5(password)
    const sessionId = createUUID();
    if (!req.body) {
        res.status(400)
        res.send('no request found')
        return
    }
    userCollection.findOne({email : email}).then((user) => {
        console.log(user.save)
        if (!user || newPassword !== user.password) {
            res.status(400)
            res.json({error:"incorrect creditials"})
            return
        }
        user.sessionId = sessionId
        userCollection.update({_id: user._id}, {$set: { sessionId }}).then(() => {
            res.cookie('sessionId', sessionId)
            res.status(200)
            res.json({user: user})
        })
    }).catch((err) => {
        console.error(err)
        res.status(400)
        res.json({error:"incorrect creditials"})
    })
    
}

const sendValidatedUser = (req, res) => {
    res.json({user: req.user})
}

const logoutUser = (req,res) => {
    const userCollection = db.collection('users');
    if (!req.user) {
        res.status(400)
        res.json({error:"no cookie found"})
        return
    }
    userCollection.updateOne({_id: req.user._id}, {$set: { sessionId:null }}).then(() => {
        res.cookie('sessionId', null)
        res.json({msg:'deleated cookie'})
    }).catch((err) => {
        res.json({error:err})
    })

}
const groupUsersByRelationshipStatus = (users, friendIds) => {
    const friends = users.filter((user) => {
        if (friendIds.includes(user._id)) {
            return true
        }
        return false
    })
    const notFriends = users.filter((user) => {
        if (friendIds.includes(user._id)) {
            return false
        }
        return true
    })
    return {friends,notFriends}
}
const getFriends = (req,res) => {
    if (!req.user) {
        res.status(400)
        res.json({error:"no cookie found"})
        return
    }
    User.find({username:{$ne:req.user.username}},{username:1, description:1}).then(userList => {
        const {friends,notFriends} = groupUsersByRelationshipStatus(userList, req.user.friends)
        res.json({friends,notFriends})
    }).catch(err => {
        res.status(400)
        console.log(err)
        res.json({error:err.message})
    })
}
const addFriend = (req,res) => {
    if (!req.user) {
        res.status(400)
        res.json({error:"no cookie found"})
    }
    const friends = req.user.friends || []
    //const userCollection=db.collection('users')
    friends.push(ObjectId(req.body.userId))
    userCollection.updateOne({_id: req.user._id},{$set: {friends}}).then(() => {
        //res.status(200)
        //res.json('updated friends')
        userCollection.find({_id:req.body.userId}).exec().then((user) => {
            const friends2 = user.friends || []
            friends2.push(req.user._id)
            userCollection.updateOne({_id: req.body.userId},{$set: {friends:friends2}}).then(() => {
                res.status(200)
                res.json('added friend')
            }).catch(err => {
                res.status(400)
                res.json({error:err})
            })
        }).catch(err => {
            res.status(400)
            res.json({error:err})
        })
    }).catch(err => {
        console.log(err)
        res.status(400)
        res.json({error:err})
    })
}

module.exports = {signup, login, sendValidatedUser, logoutUser, getFriends, addFriend}