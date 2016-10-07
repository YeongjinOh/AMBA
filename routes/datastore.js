/**
 * Created by JiSoo on 2016-10-04.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');


/*
    JSON Array Parsing하기
 */

router.get('/put', function(req, res, next) {
    // cid, key, value
    db.none("INSERT INTO data_store VALUES($1, $2, $3) ON CONFLICT (cid, key) DO UPDATE SET VALUE = $4;",
            [req.query.cid, req.query.key, req.query.value, req.query.value])
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
    db.many("SELECT value FROM data_store WHERE cid = $1 AND key = $2;", [req.query.cid, req.query.key])
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
    db.none("DELETE FROM data_store WHERE cid = $1 AND key = $2;", [req.query.cid, req.query.key])
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
    db.many("SELECT key, value FROM data_store WHERE cid = $1;", [req.query.cid])
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
