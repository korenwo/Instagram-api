const md5 = require('md5');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/environment/index');

class UsersController {

    static create (req, res) {
        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        user.save()
            .then(newUser => res.status(201).send(newUser))
            .catch(err => {
                if (11000 === err.code || 11001 === err.code) {
                    const ret = {message: 'Duplicate username or email.'};
                    res.status(400).send(ret);
                }
                console.log(err);
                res.status(400).send(err);
            });
    }

    static login (req, res) {
        User.findOne({
            username: req.body.username,
            password: md5(req.body.password)
        })
            .then(user => {
                if (!user) {
                    res.sendStatus(401);
                    return;
                }
                const payload = {
                    _id:user._id,
                    username:user.username
                };
                const token = jwt.sign(payload, 'Koren@123');
                res.send({ token });
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    }

    static me (req, res) {
        try {
            const payload = jwt.verify(req.body.token, 'jwtSecret');
            user.findById(payload._id)
                .then(user=> {
                    if(!user) {
                        res.sendStatus(401);
                        return;
                    }
                    delete user.password;
                    res.send(user);
                })
                .catch(err=> {
                    console.log(err);
                    res.sendStatus(500);
                });
        } catch(err) {
            res.sendStatus(401);
        }
    }

}

module.exports = UsersController;