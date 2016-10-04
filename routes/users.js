/**
 * Created by JiSoo on 2016-09-29.
 */
var express = require('express');
var router = express.Router();
var crypto = require('./amba_crypto');
var db = require('../db');

/* 사용자의 새로운 토큰을 생성한다. */
router.post('/login', function (req, res, next) {
    db.one("select * from users where email = $1;", [req.body.email])
        .then(function (data) {
            var password = crypto.encrypt(req.body.password);

            if (data.password === password) {
                var aauth = {
                    uid: data.uid,
                    status: data.status
                };

                aauth = crypto.encrypt(JSON.stringify(aauth));
                res.json({
                    resultCode: 0,
                    aauth: aauth,
                    ainfo: {
                        username: data.username
                    }
                });
            }
            res.json({
                resultCode: -1,
                msg: 'Password가 일치하지 않습니다.'
            });
        })
        .catch(function () {
            res.json({
                resultCode: -1,
                msg: 'Token생성에 실패했습니다.'
            });
        });
});

/* 새로운 사용자를 생성한다. */
router.post('/regist', function(req, res, next) {
    var password = crypto.encrypt(req.body.password);

    db.none("insert into users(email, password, username, ipt_date, upt_date) values($1, $2, $3, now(), now());", [req.body.email, password, req.body.username])
        .then(function () {
            res.json({
                resultCode: 0
            });
        })
        .catch(function () {
            res.json({
                resultCode: -1,
                msg: '이미 존재하는 Email입니다.'
            });
        });
});

module.exports = router;
