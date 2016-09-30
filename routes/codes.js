var express = require('express');
var router = express.Router();

var strformat = require('strformat');
var jsonfile = require('jsonfile');
var path = './datas/{username}/';
var fs = require('fs');




// get parameters from given url
function getParams(url){
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params;
}

router.get('/index/get', function (req, res, next) {
    var params =  getParams(req.url);
    var file = strformat(path+'index.json', params);
    jsonfile.readFile(file, function(err, obj) {
        if (err) {
            console.log("can not find " + file);
        } else {
            // console.dir(obj);
            res.send(obj);
        }
    });

});

router.post('/index/update', function(req, res, next) {
    var file = strformat(path+'index.json', req.body);

    jsonfile.writeFile(file, req.body, function (err) {
        if (err)
            console.error(err);
    });

    // TODO:error handling
    res.send();
});

router.get('/code/get', function (req, res, next) {
    var params =  getParams(req.url);
    var file = strformat(path+'data{id}.json', params);
    jsonfile.readFile(file, function(err, obj) {
        if (err) {
            console.log("can not find " + file);
        } else {
            // console.dir(obj);
            res.send(obj);
        }
    });

});

router.post('/code/update', function(req, res, next) {
    var file = strformat(path+'data{id}.json', req.body);
    jsonfile.writeFile(file, req.body, function (err) {
        if (err)
            console.error(err);
    });

    // TODO:error handling
    res.send();
});


router.post('/code/delete', function(req, res, next) {
    var file = strformat(path+'data{id}.json', req.body);
    fs.unlinkSync(file);

    // TODO:error handling
    res.send();
});


module.exports = router;
