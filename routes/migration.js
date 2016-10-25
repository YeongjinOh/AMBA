/**
 * Created by JiSoo on 2016-10-25.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');
var dbpg = require('../db_postgre');

router.get('/users', function(req, res, next) {
    var users;
    var i;
    dbpg.any("SELECT * FROM users;")
        .then(function(data) {
            users = data;
            for(i=0; i<users.length; i++) {
                db.query("INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
                [data[i].uid, data[i].email, data[i].password, data[i].username, data[i].status, data[i].description, data[i].ipt_date, data[i].upt_date])
                    .then(function() {
                        res.json({
                            resultCode: 0
                        })
                    })
                    .catch(function() {
                        res.json({
                            resultCode: -1
                        })
                    })
            }
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/project', function(req, res, next) {
    var project;
    var i;
    dbpg.any("SELECT * FROM project;")
        .then(function(data) {
            project = data;
            for(i=0; i<project.length; i++) {
                db.query("INSERT INTO project VALUES(?, ?, ?, ?, ?, ?, ?);",
                    [data[i].pid, data[i].uid, data[i].title, data[i].main_cid, data[i].description, data[i].ipt_date, data[i].upt_date])
                    .then(function() {
                        res.json({
                            resultCode: 0
                        })
                    })
                    .catch(function() {
                        res.json({
                            resultCode: -1
                        })
                    })
            }
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/codestore', function(req, res, next) {
    var codestore;
    var i;
    dbpg.any("SELECT * FROM code_store;")
        .then(function(data) {
            codestore = data;
            for(i=0; i<codestore.length; i++) {
                db.query("INSERT INTO code_store VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [data[i].cid, data[i].uid, data[i].pid, data[i].title, data[i].ctext, data[i].mstatus, data[i].deps, data[i].description, data[i].ipt_date, data[i].upt_date])
                    .then(function() {
                        res.json({
                            resultCode: 0
                        })
                    })
                    .catch(function() {
                        res.json({
                            resultCode: -1
                        })
                    })
            }
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/datastore', function(req, res, next) {
    var datastore;
    var i;
    dbpg.any("SELECT * FROM data_store;")
        .then(function(data) {
            datastore = data;
            for(i=0; i<datastore.length; i++) {
                db.query("INSERT INTO data_store VALUES(?, ?, ?);",
                    [data[i].cid, data[i].key, data[i].value])
                    .then(function() {
                        res.json({
                            resultCode: 0
                        })
                    })
                    .catch(function() {
                        res.json({
                            resultCode: -1
                        })
                    })
            }
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

module.exports = router;