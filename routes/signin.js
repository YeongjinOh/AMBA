/**
 * Created by JiSoo on 2016-09-27.
 */
var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/', function(req, res) {
    db.one("select * from users_tb where username_cd = $1 and password_nm = $2;", [req.body.username, req.body.password])
        .then(function (data) {
            res.send({
                type: true,
                data: data.token_nm
            });
        })
        .catch(function (error) {
            res.send(error);
        });
});

module.exports = router;