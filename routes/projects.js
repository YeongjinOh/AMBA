var express = require('express');
var router = express.Router();

var strformat = require('strformat');
var jsonfile = require('jsonfile');
var path = './datas/{username}/';
var projectDir = path + 'project{pid}/';
var fs = require('fs-promise');


/*


 * GET /projects
 @param username
 @desc project의 pid, 이름, 코드 수를 project.json로 부터 읽어 온다.
 @return [ {pid:1, title:"amba", numOfCodes:3}, {pid:2, title:"project2", numOfCodes:1}, ... ]

 * GET /projects/:pid
 @param username
 @desc 해당 pid의 project의 제목과 코드 수를 읽어 온다.
 @return {pid:1, title:"amba", numOfCodes:3}

 * POST /projects
 @param username, project
 @desc 새로운 project 생성
 @return statusCode

 * PUT /projects/:pid
 @param username, project
 @desc project의 이름 변경 (혹은 추가적인 정보 수정)
 @return statusCode

 * DELETE /projects/:pid
 @param username
 @desc 해당 id의 프로젝트 삭제
 @return statusCode


 * GET projects/:pid/codes
 @param username
 @desc 해당 pid project의 하위 코드들의 title, time, description들을 읽어온다.
 @return [ {title:"code 1", time:"16/03/02 12:33:22", desc:"first code"}, ... ]

 * GET projects/:pid/codes/:cid
 @param username
 @desc 해당 pid project, cid code의 title, time, description, code를 읽어온다.
 @return {title:"code 1", time:"16/03/02 12:33:22", desc:"first code", code:"var a=1;"}

 * POST projects/:pid/codes
 @param username, code
 @desc 해당 프로젝트에 새로은 코드를 생성
 @return statusCode

 * PUT projects/:pid/codes/:cid
 @param username, code
 @desc code의 내용 수정
 @return statusCode

 * DELETE projects/:pid/codes/:cid
 @param username
 @desc code 삭제
 @return statusCode

 */

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

// delete folder recursively
var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


/**
 * GET /projects
 * @param username
 * @desc project의 pid, 이름, 코드 수를 project.json로 부터 읽어 온다.
 * @return [ {pid:1, title:"amba", numOfCodes:3}, {pid:2, title:"project2", numOfCodes:1}, ... ]
 */

router.route('').get(function (req, res) {
    var params = getParams(req.url);
    // create directory of username if doesn't exist
    var userDir = strformat(path, params);
    var file = strformat(path + 'projects.json', params);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
        jsonfile.writeFile(file, []);
    }
    jsonfile.readFile(file, function (err, obj) {
        if (err) {
            console.error(err);
        } else {
            // console.dir(obj);
            res.send(obj);
        }
    });

});

/**
 * GET /projects/:pid
 * @param username
 * @desc 해당 pid의 project의 제목과 코드 수를 읽어 온다.
 * @return {pid:1, title:"amba", numOfCodes:3}
 */
// router.route('/:pid').get(function(req, res) {
//
// });

/**
 * POST /projects
 * @param username, project
 * @desc 새로운 project 생성
 * @return statusCode
 */
router.route('').post(function (req, res) {
    var params = req.body;
    var file = strformat(path + 'projects.json', params);
    fs.readJson(file)
        .then(function (obj) {
            obj.push(params)
            fs.writeJson(file, obj);
        })
        .then(function () {
            var dir = strformat(projectDir, params);
            fs.mkdirSync(dir);
            return dir;
        })
        .then(function (dir) {
            var file = dir + 'project.json';
            fs.writeJson(file, []);
            res.sendStatus(0);
        });
});

/**
 * PUT /projects/:pid
 * @param username, project
 * @desc project의 이름 변경 (혹은 추가적인 정보 수정)
 * @return statusCode
 */
// router.route('/:pid/update').post(function (req, res) {
//
// });

/**
 * DELETE /projects/:pid
 * @param username
 * @desc 해당 id의 프로젝트 삭제
 * @return statusCode
 */
router.route('/:pid/delete').post(function (req, res) {

    var pid = req.params.pid;
    var params = req.body

    var file = strformat(path + 'projects.json', params);
    fs.readJson(file)
        .then(function (projects) {
            // modify projects.json
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].pid == pid) {
                    projects.splice(i, 1);
                    break;
                }
            }
            fs.writeJson(file, projects);
        })
        .then(function () {
            var dir = strformat(path + 'project' + pid, params);
            deleteFolderRecursive(dir);
            res.sendStatus(0);
        });
});


/**
 * GET projects/:pid/codes
 * @param username
 * @desc 해당 pid project의 하위 코드들의 cid, title, time, description들을 읽어온다.
 * @return [ {cid:1, title:"code 1", time:"16/03/02 12:33:22", desc:"first code"}, ... ]

 */
router.route('/:pid/codes').get(function (req, res) {

    var pid = req.params.pid;
    var params = getParams(req.url);

    // create directory of username if doesn't exist
    var dir = strformat(path + 'project' + pid, params);
    var file = strformat(dir + '/project.json', params);
    jsonfile.readFile(file, function (err, obj) {
        if (err) {
            console.error(err);
        } else {
            res.send(obj);
        }
    });

});

/**
 * GET projects/:pid/codes/:cid
 * @param username
 * @desc 해당 pid project, cid code의 cid, title, time, description을 읽어온다.
 * @return {cid:1, title:"code 1", time:"16/03/02 12:33:22", desc:"first code"}
 */

router.route('/:pid/codes/:cid').get(function (req, res) {

    var params = getParams(req.url);
    params.pid = req.params.pid;
    params.cid = req.params.pid;

    var file = strformat(projectDir + 'code{cid}.json', params);
    jsonfile.readFile(file, function (err, obj) {
        if (err) {
            console.error(err);
        } else {
            res.send(obj);
        }
    });

});


/**
 * POST projects/:pid/codes
 * @param username, code
 * @desc 해당 프로젝트에 새로은 코드를 생성
 * @return statusCode
 */
router.route('/:pid/codes').post(function (req, res) {

    // var pid = req.params.pid;
    var params = req.body;

    var codeFile = strformat(projectDir + 'code{cid}.json', params);
    fs.writeJson(codeFile, params).then(function () {
        res.sendStatus(0);
    });

    var projectFile = strformat(projectDir + 'project.json', params);
    fs.readJson(projectFile)
        .then(function (data) {
            data.push({
                cid: params.cid,
                title: params.title,
                desc: params.desc,
                uptDate: params.uptDate
            });
            return data;
        })
        .then(function (data) {
            fs.writeJson(projectFile, data);
        })
        .then(function () {
            res.sendStatus(0);
        })
});


/**
 * POST projects/:pid/codes/:cid/update
 * @param username, code
 * @desc code의 내용 수정
 * @return statusCode
 */
router.route('/:pid/codes/:cid/update').post(function (req, res) {

    // var pid = req.params.pid;
    // var cid = req.params.cid;
    var params = req.body;
    var codeFile = strformat(projectDir + 'code{cid}.json', params);
    var projectFile = strformat(projectDir + 'project.json', params);
    fs.writeJson(codeFile, params)
        .then(function () {
            return fs.readJson(projectFile);
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].cid == params.cid) {
                    data[i] = {
                        cid: params.cid,
                        title: params.title,
                        desc: params.desc,
                        uptDate: params.uptDate
                    }
                    break;
                }
            }
            return data;
        })
        .then(function (data) {
            fs.writeJson(projectFile, data);
        })
        .then(function () {
            res.sendStatus(0);
        });


});


/**
 * POST projects/:pid/codes/:cid/delete
 * @param username
 * @desc code 삭제
 * @return statusCode
 */
router.route('/:pid/codes/:cid/delete').post(function (req, res) {

    var params = req.body;
    params.pid = req.params.pid;
    params.cid = req.params.cid;

    var file = strformat(projectDir + 'code{cid}.json', params);
    fs.unlink(file)
        .then(function () {
            res.sendStatus(0);
        })
});


module.exports = router;
