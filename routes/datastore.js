/**
 * Created by JiSoo on 2016-10-04.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/put', function(req, res, next) {
    // cid, key, value
    res.send('put');
});

router.get('/get', function(req, res, next) {
    // cid, key
    res.send('get');
});

router.get('/delete', function(req, res, next) {
    // cid, key
    res.send('delete');
});

router.get('/keys', function(req, res, next) {
    // cid
    res.send('keys');
});

module.exports = router;
