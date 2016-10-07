/**
 * Created by JiSoo on 2016-10-04.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/put', function(req, res, next) {
<<<<<<< HEAD
    db.one("insert into data_store values($1, $2, $3) on conflict (cid, key) do update set value = $4;",
=======
    // cid, key, value
    db.none("INSERT INTO data_store VALUES($1, $2, $3) ON CONFLICT (cid, key) DO UPDATE SET VALUE = $4;",
>>>>>>> 2f414a8fbba9c0a6262d6a6a46adcfa13609af5e
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
<<<<<<< HEAD
    db.any("select value from data_store where cid = $1 and key = $2;", [req.query.cid, req.query.key])
=======
    db.many("SELECT value FROM data_store WHERE cid = $1 AND key = $2;", [req.query.cid, req.query.key])
>>>>>>> 2f414a8fbba9c0a6262d6a6a46adcfa13609af5e
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
<<<<<<< HEAD
    db.one("delete from data_store where cid = $1 and key = $2;", [req.query.cid, req.query.key])
=======
    db.none("DELETE FROM data_store WHERE cid = $1 AND key = $2;", [req.query.cid, req.query.key])
>>>>>>> 2f414a8fbba9c0a6262d6a6a46adcfa13609af5e
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

router.get('/list', function(req, res, next) {
    db.any("select key, value from data_store where cid = $1;", [req.query.cid])
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

router.get('/keys', function(req, res, next) {
    db.any("select key from data_store where cid = $1;", [req.query.cid])
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
