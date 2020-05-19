const { v4: uuidv4 } = require('uuid');
const User = require('../model/user')

const createUUID = () => {
    return uuidv4()
}
const signup = (req,res) => {
    console.log(req.hello)
    if (!req.body.password || !req.body.username) {
        res.status(400)
        res.send('username and password is required')
        return
    }
    const sessionId = createUUID();
    const user = new User({
        username: req.body.username,
        password: req.body.password,
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
    return
}
const getUser = (req,res) => {
    if (!req.user) {
        res.send('success: false')
        return
    }
    console.log(req.cookies)
    res.json({user:res.user})
}

module.exports = {signup, getUser}