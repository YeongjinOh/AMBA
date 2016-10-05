/**
 * Created by JiSoo on 2016-10-05.
 */

var express = require('express');
var router = express.Router();
var showdown = require('showdown');

router.get('/md', function(req, res, next) {
    var converter = new showdown.Converter();
    res.json({
        markdown: converter.makeHtml(req.query.text)
    });
});