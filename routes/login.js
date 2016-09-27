/**
 * Created by JiSoo on 2016-09-27.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('hello login');
});

module.exports = router;