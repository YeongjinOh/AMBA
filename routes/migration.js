/**
 * Created by JiSoo on 2016-10-25.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');
var dbpg = require('../db_postgre');

router.get('/users', function(req, res, next) {
    dbpg.any("SELECT * FROM users;")
        .then(function(data) {
            res.json({
                info: data
            })
        })
        .catch(function(err) {
            console.log(err);
        });
});

router.get('/project', function(req, res, next) {
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

router.get('/codestore', function(req, res, next) {
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

router.get('/datastore', function(req, res, next) {
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