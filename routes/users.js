/**
 * Created by JiSoo on 2016-09-29.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var db = require('../db');
var config = require('../config');

/* 기존 사용자 정보를 얻는다. */
// router.get('/login', function (req, res, next) {
//     if (!req.query.token)
//         return res.json({
//             resultCode: -1,
//             msg:
//         });
//
//     var token = jwt.decode(req.query.token, config.secret);
//     db.one("select * from users_tb where username_cd = $1;", [token.username])
//         .then(function () {
//             res.json({
//                 resultCode: 0
//             });
//         })
//         .catch(function () {
//             res.json({
//                 resultCode: -1,
//                 msg: '인증에 실패했습니다.'
//             });
//         });
// });

/* 사용자의 새로운 토큰을 생성한다. */
router.post('/login', function (req, res, next) {
    db.one("select * from users_tb where username_cd = $1;", [req.body.username])
        .then(function (data) {
            if (data.password_nm === req.body.password) {
                var token = jwt.encode({username: req.body.username}, config.secret);
                res.json({
                    resultCode: 0,
                    aauth: token,
                    ainfo: {
                        aname: data.name
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
    db.none("insert into users(email, password, name, ipt_date, upt_date) values($1, $2, $3, now(), now());", [req.body.email, req.body.password], req.body.name)
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
