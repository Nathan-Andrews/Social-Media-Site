const User = require('../model/user')

const signup = (req,res) => {
    console.log(req.body)
    if (!req.body.password || !req.body.username) {
        res.status(400)
        res.send('username and password is required')
        return
    }
    const user = new User({ username: req.body.username, password: req.body.password });
    user.save(function (err, user) {
        if (err) return console.error(err);
        res.send(user)
    });
    return
}

module.exports = {signup}