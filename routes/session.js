/**
 * Created by JiSoo on 2016-09-29.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var db = require('../db');
var config = require('../config');

router.post('/', function(req, res, next) {
    db.one("select * from users_tb where username_cd = $1;", [req.body.username])
        .then( function(data) {
            if (data.password_nm === req.body.password) {
                var token = jwt.encode({username: req.body.username}, config.secret);
                res.send(token);
            }
        })
        .catch( function(err) {
            res.send(err);
        });
});

module.exports = router;
