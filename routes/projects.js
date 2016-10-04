var express = require('express');
var router = express.Router();

var strformat = require('strformat');
// var jsonfile = require('jsonfile');
// var fs = require('fs-promise');
var db = require('../db');
var generalErrMsg = "일시적인 오류입니다."

// get parameters from given url
function getParams(url) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params;
}

/**
 * GET /projects
 * @param uid
 * @return resultCode, projects
 */
router.get('', function (req, res) {
    var params = getParams(req.url);
    db.any("select * from project where uid=${uid}", params)
        .then(function (data) {
            res.json({
                resultCode:0,
                projects:data
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

/**
 * POST /projects
 * @param project {pid, uid, title, main_cid, description, ipt_date, upt_date}
 * @return resultCode, pid
 */
router.post('', function (req, res) {
    var params = req.body;
    var query = "insert into project(uid, title, description, ipt_date, upt_date) " +
        "values (${uid}, ${title}, ${description}, now(), now()) returning pid";
    db.one(query, params)
        .then(function (data) {
            res.json({
                resultCode:0,
                pid:data.pid
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: generalErrMsg
            });
        });
});

/**
 * POST projects/update
 * @param project {pid, uid, title, main_cid, description, ipt_date, upt_date}
 * @return resultCode
 */
router.post('/update', function (req, res) {
    var params = req.body;
    var query = "update project set (title, main_cid, description, upt_date) " +
        "= (${title}, ${main_cid}, ${description}, now()) where pid=${pid}";
    db.none(query, params)
        .then(function () {
            res.json({
                resultCode:0
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: '프로젝트를 저장할 수 없습니다.\n다시 시도하여 주세요.'
            });
        });
});


/**
 * POST /projects/delete
 * @param pid
 * @return resultCode
 */
router.post('/delete', function (req, res) {
    var params = req.body;
    db.none("delete from project where pid = ${pid}", params)
        .then(function () {
            res.json({
                resultCode:0
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: '프로젝트를 삭제할 수 없습니다.\n다시 시도해 주세요.'
            });
        });

});


/**
 * GET projects/codes
 * @param pid
 * @return resultCode, codes
 */
router.get('/codes', function (req, res) {
    var params = getParams(req.url);
    db.any("select * from code_store where pid=${pid}", params)
        .then(function (data) {
            res.json({
                resultCode:0,
                codes:data
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: generalErrMsg
            });
        });

});

/**
 * POST projects/codes
 * @param code {uid, pid, title, ctext, description, ipt_date, upt_date}
 * @return resultCode, cid
 */
router.post('/codes', function (req, res) {
    var params = req.body;

    // TODO : encrypt cid
    var cid = params.pid + params.title;
    params.cid = cid;
    var query = "insert into code_store(cid, uid, pid, title, ctext, description, ipt_date, upt_date) " +
        "values (${cid}, ${uid}, ${pid}, ${title}, ${ctext}, ${description}, now(), now())";
    db.none(query, params)
        .then(function () {
            res.json({
                resultCode:0,
                cid:cid
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: generalErrMsg
            });
        });
});


/**
 * POST projects/codes/update
 * @param code {cid, uid, pid, title, ctext, description, ipt_date, upt_date}
 * @return resultCode
 */
router.post('/codes/update', function (req, res) {
    var params = req.body;
    console.log(params);
    var query = "update code_store set (title, ctext, description, upt_date) " +
        "= (${title}, ${ctext}, ${description}, now()) where cid=${cid}";
    db.none(query, params)
        .then(function () {
            res.json({
                resultCode:0
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: '코드를 저장할 수 없습니다.\n다시 시도하여 주세요.'
            });
        });
});


/**
 * POST /projects/codes/delete
 * @param cid
 * @return resultCode
 */
router.post('/codes/delete', function (req, res) {
    var params = req.body;
    db.none("delete from code_store where cid = ${cid}", params)
        .then(function () {
            res.json({
                resultCode:0
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: '코드를 삭제할 수 없습니다.\n다시 시도해 주세요.'
            });
        });

});

module.exports = router;
