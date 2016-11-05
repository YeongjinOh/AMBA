/**
 * Created by JiSoo on 2016-10-28.
 */

var express = require('express');
var router = express.Router();
var crypto = require('./amba_crypto');
var db = require('../db');

router.get('/put', function(req, res, next) {
    var param = req.query;
    var aauth = JSON.parse(crypto.decrypt(param.token));
    param.hashkey = aauth.uid;
    db.query("INSERT INTO hash_store (cid, hashkey, akey, value) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE value = ?;",
        [param.cid, param.hashkey, param.key, param.value, param.value])
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
    var param = req.query;
    if (!param.hashkey) {
        var aauth = JSON.parse(crypto.decrypt(param.token));
        param.hashkey = aauth.uid;
    }

    db.query("SELECT value FROM hash_store WHERE cid = ? AND hashkey = ? AND akey = ?;", [param.cid, param.hashkey, param.key])
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
    db.query("DELETE FROM hash_store WHERE cid = ? AND hashkey = ? AND akey = ?;", [req.query.cid, req.query.hashkey, req.query.key])
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
    db.query("SELECT hashkey, akey, value FROM hash_store WHERE cid = ?;", [req.query.cid])
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

router.get('/hashs', function(req, res, next) {
    db.query("SELECT hashkey FROM hash_store WHERE cid = ?;", [req.query.cid])
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
    db.query("SELECT akey FROM hash_store WHERE cid = ?;", [req.query.cid])
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


router.get('/key_list', function(req, res, next) {
    db.query("SELECT hashkey, akey FROM hash_store WHERE cid = ?;", [req.query.cid])
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