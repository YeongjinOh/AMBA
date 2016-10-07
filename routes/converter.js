/**
 * Created by JiSoo on 2016-10-06.
 */

var express = require('express');
var router = express.Router();

router.get('/markdown', function (req, res, next) {
    var showdown = require('showdown');

    var converter = new showdown.Converter();
    res.json({
        markdown: converter.makeHtml(req.query.text)
    });
});

module.exports = router;
