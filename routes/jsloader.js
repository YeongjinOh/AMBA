var express = require('express');
var router = express.Router();
var db = require('../db');

// get parameters from given url
function getParams(url) {
    var decUrl = decodeURIComponent(url);
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
    while (match = regex.exec(decUrl)) {
        params[match[1]] = match[2];
    }
    return params;
}

router.get('/', function (req, res) {
    res.send('div().size(50,50).border(1).append()');
});


module.exports = router;


