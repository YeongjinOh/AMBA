var express = require('express');
var router = express.Router();
var crypto = require('./amba_crypto');
var strformat = require('strformat');
var db = require('../db');
var generalErrMsg = "일시적인 오류입니다."

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

// get uid from token
function getUid (token) {
    var aauth = JSON.parse(crypto.decrypt(token));
    return aauth.uid;
}

/**
 * pid와 title을 이용하여 cid를 encrypt 합니다.
 */
function getCid (pid, title) {
    return crypto.encrypt(pid + '.' + title);
}

/**
 * GET /projects
 * @param uid
 * @return resultCode, projects
 */
router.get('', function (req, res) {
    var params = getParams(req.url);
    var uid = getUid(params.token);
    db.any("SELECT * FROM project WHERE uid=$1", [uid])
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
    var project = JSON.parse(params.project) || {};
    project.uid = getUid(params.token);
    var query = "INSERT INTO project(uid, title, description, ipt_date, upt_date) " +
        "VALUES (${uid}, ${title}, ${description}, now(), now()) RETURNING pid";
    db.one(query, project)
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
                msg: "프로젝트 생성에 실패하였습니다. 프로젝트 명이 중복됩니다."
            });
        });
});

/**
 * POST projects/update
 * @param project {pid, uid, title, main_cid, description, ipt_date, upt_date}
 * @return resultCode
 */
// TODO use token
router.post('/update', function (req, res) {
    var params = req.body;
    var query = "UPDATE project SET (title, main_cid, description, upt_date) " +
        "= (${title}, ${main_cid}, ${description}, now()) WHERE pid=${pid}";
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
// TODO use uid
router.post('/delete', function (req, res) {
    var params = req.body;
    params.uid = getUid(params.token);
    db.none("DELETE FROM project WHERE pid = ${pid}", params)
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
    db.any("SELECT * FROM code_store WHERE pid=${pid}", params)
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
 * @param {token, code}
 * @return resultCode, cid
 */
router.post('/codes', function (req, res) {
    var params = req.body;
    var code = JSON.parse(params.code) || {};
    var cid =  getCid(code.pid, code.title);
    code.cid = cid;
    code.uid =  getUid(params.token);
    var query = "INSERT INTO code_store(cid, uid, pid, title, ctext, description, ipt_date, upt_date) " +
        "VALUES (${cid}, ${uid}, ${pid}, ${title}, ${ctext}, ${description}, now(), now())";
    db.none(query, code)
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
    var newCid = getCid(params.pid, params.title);
    params.newCid = newCid;
    var query = "UPDATE code_store SET (cid, title, ctext, description, upt_date) " +
        "= (${newCid}, ${title}, ${ctext}, ${description}, now()) WHERE cid=${cid}";
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
    db.none("DELETE FROM code_store WHERE cid = ${cid}", params)
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
