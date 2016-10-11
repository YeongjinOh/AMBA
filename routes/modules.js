var express = require('express');
var router = express.Router();
var crypto = require('./amba_crypto');
var db = require('../db');
var generalErrMsg = "일시적인 오류입니다.";

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

var Module = function (module) {
    this.author = module.username;
    this.title = module.title;
    this.description = module.description;
    this.upt_date = module.upt_date;
};

var buildModule = function (obj) {
    return new Module(obj);
};

/**
 * GET /modules
 * @param uid
 * @return resultCode, modules
 */
router.get('', function (req, res) {
    // TODO authentication
    // var params = getParams(req.url);
    db.any("SELECT A.username, B.title, B.description, B.upt_date " +
        "FROM users A JOIN code_store B USING (uid) WHERE mstatus=1")
        .then(function (data) {
            res.json({
                resultCode: 0,
                modules: data.map(buildModule)
            })
        })
        // TODO error handling
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: generalErrMsg
            });
        });
});


module.exports = router;


