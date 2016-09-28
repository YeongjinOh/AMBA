/**
 * Created by JiSoo on 2016-09-28.
 */

//Todo: 1. client에게 오류에 대해서 좀 더 자세하게 알려주기, 2. autho 모듈화 시키기, 3. 회원가입 정보 다양하게 구성하기, 4. redirect 구현하기, 5. nodemailer 추가하기

var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var db = require('../db');

var autho = {
    username: undefined,
    password: undefined,
    signature: undefined,
    token: undefined,
    key: 'amba_secret'
};

/* POST signup server. */
router.post('/', function(req, res) {
    db.one("select * from users_tb where username_cd = $1;", [req.body.username])
        .then(function (err) {
            res.send( {
                type: false,
                data: 'Error occured: ' + err
            });
        })
        .catch(function () {
            autho.username = new Buffer(req.body.username).toString('base64');
            autho.password = new Buffer(req.body.password).toString('base64');
            autho.signature = crypto.createHmac('sha256', autho.key).update(autho.username + '.' + autho.password).digest('base64');

            autho.token = autho.username + '.' + autho.password + '.' + autho.signature;

            db.none("insert into users_tb(token_nm, username_cd, password_nm) values($1, $2, $3);", [autho.token, req.body.username, req.body.password])
                .then(function() {
                    res.send({
                        type: true,
                        data: autho.token
                    });
                })
                .catch(function(err) {
                    res.send({
                        type: false,
                        data: 'Error occured: ' + err
                    })
                });
        });
});

module.exports = router;
