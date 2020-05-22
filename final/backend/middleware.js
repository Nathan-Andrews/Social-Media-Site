const db = require('./db').connection
const User = require('./model/users')

const validateUser = (req, res, next) => {
    if (!req.cookies.sessionId) {
        console.log('failure')
        console.log(req.cookies)
        next()
        return
    }
    console.log(req.cookies.sessionId)
    User.findOne({sessionId:req.cookies.sessionId}).exec().then(foundUser => {
            req.user=foundUser;
            next()
            return
        }
    ).catch(err => {
        res.status(400)
        res.send(err)
    })
}

module.exports = validateUser