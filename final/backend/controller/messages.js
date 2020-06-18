const mongoose = require('mongoose');
const messagesCollection = require('../model/messages')

const getMessages = (req, res) => {
    const currentUser = req.user._id
    const fromUser = mongoose.Types.ObjectId(req.params.userId);
    const userArray = [currentUser, fromUser]
    messagesCollection.findOne({users:{$all:userArray}}, {messages:1}).then(messages => {
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
        const messageItem = {
            recipient:friendId,
            sender:id,
            body:message,
            dateSent:new Date()
        }
        if (messages) {
            const newMessages = messages.messages
            newMessages.push(messageItem)
            messagesCollection.updateOne({users:{$all: [friendId,id]}}, {$set:{messages:newMessages}}).then(()=> {
                res.status(200)
                res.json({message:messageItem})
                return
            }).catch(err => {
                console.log(err)
                res.status(400)
                res.json({error:err.message})
                return
            })
            return
        }
        const messageObj = new messagesCollection({
            users:[id, friendId],
            messages: [messageItem]
        })
        messageObj.save(function (err, user) {
            if (err) {
                console.log(err)
                res.status(400)
                res.send(err)
                return
            }
            res.status(200)
            res.json({message:messageItem})
        })
    }).catch(err => {
        console.log('error',err)
        res.status(400)
        res.send(err)
        return
    })
}

module.exports = {getMessages,sendMessage}