const db = require('./db').connection

const authenticateUser = (req, res, next) => {
    if (!req.cookies.sessionId) {
        console.log(fail)
        console.log(req.cookie)
        next()
        return
    }
    console.log(req.cookies.sessionId)
    db.users.find({sessionId:req.cookie.sessionId}, (err, foundUser) => {
        //console.log(err, foundUser)
        req.user=foundUser;
        next()
        return
    })
    db.users.find({sessionId:req.cookie.sessionId}).exec().then(
        foundUser => {
            //console.log(err, foundUser)
            req.user=foundUser;
            next()
            return
        }
    ).catch(err => {
        res.status(400)
        res.send(err)
    })
}

module.exports = authenticateUser