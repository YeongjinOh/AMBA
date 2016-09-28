/**
 * Created by JiSoo on 2016-09-27.
 */
var express = require('express');
var router = express.Router();

var crypto = require('crypto');
// var db = require('pg-promise');

var pgp = require('pg-promise')();
pgp.pg.defaults.poolSize = 10;
pgp.pg.defaults.ssl = true;
var db = pgp('postgres://eynernjlrihgzw:2cSSchyFA0jNj0etElZ574Y0z2@ec2-54-243-54-21.compute-1.amazonaws.com:5432/d1o7q84tkif5t0');


// var pg = require('pg');

var token = {
    username: undefined,
    password: undefined,
    signature: undefined,
    authoToken: undefined,
    key: 'amba_secret'
};

//todo: error handling
router.post('/', function(req, res) {
    db.one("select * from users_tb where username_cd = $1 and password_nm = $2;", [req.body.username, req.body.password])
        .then(function (data) {
            token.username = new Buffer(req.body.username).toString('base64');
            token.password = new Buffer(req.body.password).toString('base64');
            token.signature = crypto.createHmac('sha256', token.key).update(token.username + '.' + token.password).digest('base64');

            token.authoToken = token.username + '.' + token.password + '.' + token.signature;

            if (data.token_nm === null)
                db.none("insert into users_tb(token_nm) values($1) where username_cd = $2;", [token.authoToken, req.body.username]);
        })
        .catch(function (error) {
            res.send(error);
        });

    res.send(token.authoToken);
});

module.exports = router;