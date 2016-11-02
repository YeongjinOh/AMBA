/**
 * Created by JiSoo on 2016-09-29.
 */

var express = require('express');
var router = express.Router();
var crypto = require('./amba_crypto');
var db = require('../db');

/* 사용자의 새로운 토큰을 생성한다. */
router.post('/login', function (req, res, next) {
    db.query("SELECT * FROM users WHERE email = ?;", [req.body.email])
        .then(function (data) {
            var password = crypto.encrypt(req.body.password);

            if (data[0].password === password) {
                var aauth = {
                    uid: data[0].uid,
                    status: data[0].status
                };

                aauth = crypto.encrypt(JSON.stringify(aauth));
                res.json({
                    resultCode: 0,
                    aauth: aauth,
                    ainfo: {
                        username: data[0].username
                    }
                });
            } else {
                res.json({
                    resultCode: -1,
                    msg: 'Password가 일치하지 않습니다.'
                });
            }
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: 'Token생성에 실패했습니다.'
            });
        });
});

/* 새로운 사용자를 생성한다. */
router.post('/regist', function(req, res, next) {
    var password = crypto.encrypt(req.body.password);

    db.query("INSERT INTO users(email, password, username, ipt_date, upt_date) VALUES(?, ?, ?, now(), now());", [req.body.email, password, req.body.username])
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

/*사용자 목록을 리턴*/
router.get('/', function (req, res, next) {
    db.query("SELECT username FROM users", [])
        .then(function (results) {
            //console.log('users : ', results);
            res.json({
                resultCode: 0,
                data : results
            });
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: '사용자 검색에 실패했습니다.'
            });
        });
});

module.exports = router;
