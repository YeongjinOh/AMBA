/**
 * Created by JiSoo on 2016-10-04.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/put', function(req, res, next) {
    db.query("INSERT INTO data_store VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE value = ?;",
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
    db.query("SELECT value FROM data_store WHERE cid = ? AND akey = ?;", [req.query.cid, req.query.key])
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
    db.query("DELETE FROM data_store WHERE cid = ? AND akey = ?;", [req.query.cid, req.query.key])
        .then(function () {
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
    db.query("SELECT akey, value FROM data_store WHERE cid = ?;", [req.query.cid])
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
    db.query("SELECT akey FROM data_store WHERE cid = ?;", [req.query.cid])
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