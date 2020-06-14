const mongoose = require('mongoose');
const messagesCollection = require('../model/messages')

const getMessages = (req, res) => {
    //console.log(req.params)
    //console.log('req.user', req.user)
    const currentUser = req.user._id
    const fromUser = mongoose.Types.ObjectId(req.params.userId);
    const userArray = [currentUser, fromUser]
    console.log(userArray)
    messagesCollection.find({users:{$all:userArray}}, {messages:1}).then(messages => {
        //console.log(messages)
        res.json({messages:messages})
    }).catch(err => {
        res.status(400)
        res.json({error:err})
    })
    //res.json({currentUser, fromUser})
}
const sendMessage = (req,res) => {
    if (!req.user) {
        res.status(400)
        res.json({error:'middleware failed; no cookie found'})
        return
    }
    const {message, friend} = req.body
    const id = req.user._id
    const friendId = mongoose.Types.ObjectId(friend);

    messagesCollection.findOne({users:{$all: [friendId, id]}}).then((messages) => {
        if (messages) {
            const newMessages = messages.messages
            newMessages.push({
                recipient: friendId,
                sender: id,
                body:message,
            })
            messagesCollection.updateOne({users:{$all: [friendId,id]}}, {$set:{messages:newMessages}}).then(()=> {
                res.status(200)
                res.json({message:'updated messages'})
            return
            }).catch(err => {
                console.log(err)
                res.status(400)
                res.json({error:err.message})
            })
            
        }
        const messageObj = new messagesCollection({
            users:[id, friendId],
            messages: [{
                recipient:friendId,
                sender:id,
                body:message
            }]
        })
        messageObj.save(function (err, user) {
            if (err) {
                console.log(err)
                res.status(400)
                res.send(err)
                return
            }
            res.status(200)
            res.send('success')
        })
    }).catch(err => {
        console.log('error',err)
        res.status(400)
        res.send(err)
    })
}

module.exports = {getMessages,sendMessage}