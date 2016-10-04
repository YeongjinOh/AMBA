/**
 * Created by JiSoo on 2016-10-04.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');


/*
    JSON Array Parsing하기.
    duplicate on 문제 해결하기
 */

router.get('/put', function(req, res, next) {
    // cid, key, value
    db.none("insert into data_store(cid, key, value) values($1, $2, $3) on duplicate key update cid = $4, key = $5, value = $6;",
            [req.query.cid, req.query.key, req.query.value, req.query.cid, req.query.key, req.query.value])
        .then(function () {
            res.json({
                resultCode: 0
            });
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            });
        });
});

router.get('/get', function(req, res, next) {
    db.many("select value from data_store where cid = $1 and key = $2;", [req.query.cid, req.query.key])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/delete', function(req, res, next) {
    db.none("delete from data_store where cid = $1 and key = $2;", [req.query.cid, req.query.key])
        .then(function (data) {
            res.json({
                resultCode: 0
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/keys', function(req, res, next) {
    // [{"value":"value1"}]
    db.many("select key, value from data_store where cid = $1;", [req.query.cid])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

module.exports = router;
