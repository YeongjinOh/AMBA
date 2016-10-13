var express = require('express');
var router = express.Router();
var crypto = require('./amba_crypto');
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
function getUid(token) {
    var aauth = JSON.parse(crypto.decrypt(token));
    return aauth.uid;
}

/**
 * pid와 title을 이용하여 cid를 encrypt 합니다.
 */
function getCid(pid, title) {
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
                resultCode: 0,
                projects: data
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
                resultCode: 0,
                pid: data.pid
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);

            if (error.code == 23505) {
                res.json({
                    resultCode: -2,
                    msg: '프로젝트명이 중복됩니다.\n다른 이름으로 시도하여 주세요.'
                });
            } else if (error.code == 23502) {
                res.json({
                    resultCode: -3,
                    msg: '올바른 프로젝트 명을 입력해주세요.'
                });
            } else {
                res.json({
                    resultCode: -1,
                    msg: "프로젝트 생성에 실패하였습니다.\n다시 시도하여 주세요."
                });
            }
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
                resultCode: 0
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            if (error.code == 23505) {
                res.json({
                    resultCode: -2,
                    msg: '프로젝트명이 중복됩니다.\n다른 이름으로 시도하여 주세요.'
                });
            } else {
                res.json({
                    resultCode: -1,
                    msg: '프로젝트를 저장할 수 없습니다.\n다시 시도하여 주세요.'
                });
            }
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
                resultCode: 0
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
    db.any("SELECT cid, pid, title, mstatus, description, upt_date FROM code_store WHERE pid=${pid}", params)
        .then(function (data) {
            res.json({
                resultCode: 0,
                codes: data
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
 * GET projects/codes/code
 * @param cid
 * @return resultCode, code
 */
router.get('/codes/code', function (req, res) {
    var params = getParams(req.url);
    db.one("SELECT title, ctext, mstatus, deps, description, upt_date FROM code_store WHERE cid=${cid}", params)
        .then(function (data) {
            res.json({
                resultCode: 0,
                code: data
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
    var cid = getCid(code.pid, code.title);
    code.cid = cid;
    code.uid = getUid(params.token);
    code.deps = '[]';
    var query = "INSERT INTO code_store(cid, uid, pid, title, ctext, deps, description, ipt_date, upt_date) " +
        "VALUES (${cid}, ${uid}, ${pid}, ${title}, ${ctext}, ${deps}, ${description}, now(), now())";
    db.none(query, code)
        .then(function () {
            res.json({
                resultCode: 0,
                cid: cid
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            if (error.code == 23505) {
                res.json({
                    resultCode: -2,
                    msg: '프로젝트명이 중복됩니다.\n다른 이름으로 시도하여 주세요.'
                });
            } else {
                res.json({
                    resultCode: -1,
                    msg: generalErrMsg
                });
            }
        });
});


/**
 * POST projects/codes/update
 * @param code {cid, title, ctext, description,}
 * @return resultCode
 */
router.post('/codes/update', function (req, res) {
    var params = req.body;
    var newCid = getCid(params.pid, params.title);
    params.newCid = newCid;

    var query = "UPDATE code_store SET (cid, title, ctext, mstatus, description, upt_date) " +
        "= (${newCid}, ${title}, ${ctext}, ${mstatus}, ${description}, now()) WHERE cid=${cid}";
    db.none(query, params)
        .then(function () {
            res.json({
                resultCode: 0,
                newCid: newCid
            })
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            if (error.code == 23505) {
                res.json({
                    resultCode: -2,
                    msg: '코드명이 중복됩니다.\n다른 이름으로 시도하여 주세요.'
                });
            } else {
                res.json({
                    resultCode: -1,
                    msg: '코드를 저장할 수 없습니다.\n다시 시도하여 주세요.'
                });
            }
        });
});


/**
 * POST projects/codes/mstatus/update
 * @param code {cid, title, mstatus}
 * @return resultCode
 */
router.post('/codes/mstatus/update', function (req, res) {
    var params = req.body;

    var updateMstatus = function () {
        db.none("UPDATE code_store SET (mstatus, upt_date) = (${mstatus}, now()) WHERE cid=${cid}", params)
            .then(function () {
                res.json({
                    resultCode: 0
                })
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error);
                {
                    res.json({
                        resultCode: -1,
                        msg: '모듈화에 실패하였습니다.\n다시 시도하여 주세요.'
                    });
                }
            });
    };

    if (params.mstatus == 0) {
        // off module
        updateMstatus();
    } else {
        // on module, check duplicate title
        db.any("SELECT * FROM code_store WHERE mstatus=1 AND title=${title}", params)
            .then(function (data) {

                // on conflict
                if (data.length > 0) {
                    res.json({
                        resultCode: -2,
                        msg: "모듈명이 중복됩니다.\n다른 이름으로 저장하여 주세요."
                    })
                } else {
                    updateMstatus();
                }
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error);
                res.json({
                    resultCode: -1,
                    msg: generalErrMsg
                });
            });
    }
});

/**
 * POST projects/codes/deps/update
 * @param deps
 * @return resultCode
 */
router.post('/codes/deps/update', function (req, res) {
    var params = req.body;
    db.none("UPDATE code_store SET (deps, upt_date) = (${deps}, now()) WHERE cid=${cid}", params)
        .then(function () {
            res.json({
                resultCode: 0
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
                resultCode: 0
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
