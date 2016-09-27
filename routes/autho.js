/**
 * Created by JiSoo on 2016-09-27.
 */
var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var token = {
    username: undefined,
    password: undefined,
    signature: undefined,
    key: 'amba_secret'
};

// router.get('/', function(req, res, next) {
//     token.username = req.username.toString('base64');
//     token.password = req.password.toString('base64');
//     token.signature = token.username + '.' + token.password;
//
//     res.send(crypto.createHmac('sha256', key).update(token.signature).digest('base64'));
// });

router.post('/', function(req, res, next) {
    token.username = req.username.toString('base64');
    token.password = req.password.toString('base64');
    token.signature = token.username + '.' + token.password;

    res.send(crypto.createHmac('sha256', key).update(token.signature).digest('base64'));
});

module.exports = router;