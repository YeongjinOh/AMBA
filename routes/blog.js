/**
 * Created by Lightsoo on 2016. 10. 26..
 */


var express = require('express');
var router = express.Router();
var db = require('../db');
var crypto = require('./amba_crypto');


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

router.post('/', function(req, res, next) {

    console.log(req.body);
    var cid = req.body.cid;
    var hashkey = getUid(req.body.hashkey);
    var akey = req.body.akey;
    var value = req.body.value;
    var sql = "INSERT INTO hash_store(cid, hashkey, akey, value) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE value = ?";

    var arr =[cid, hashkey, akey, value, value];

    db.query(sql, arr)
        .then(function (data) {
            console.log(data);
            res.json({
                resultCode: 0
            });
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            });
        });
});



router.get('/', function(req, res, next) {

    var currentPage = parseInt(req.query.page) || 1;
    // 페이지 당 출력 개수, 클라이언트에서도 해줘야한다..
    var itemNumInPage = 3;
    var cid = req.query.cid;
    //var akey = req.query.akey;
    var sql1 = 'SELECT value FROM hash_store WHERE cid = ? ORDER BY seq DESC';
    //var arr1 = [cid];
    var arr1 = ['aa'];
    db.query(sql1, arr1)
        .then(function (results) {
            // 전체 아이템 개수,
            var totalItem = parseInt(results.length);
            // 전체 페이지
            var maxPage = Math.floor(totalItem / itemNumInPage);
            var temp = 1;
            if(totalItem/itemNumInPage ===Math.floor(totalItem/itemNumInPage))
                temp = 0;

            // Skip할 개수 계산. page는 1부터 시작
            var skip = itemNumInPage * (currentPage-1);
            var sql2 = 'SELECT value FROM hash_store WHERE cid = ? LIMIT ?, ?';
            var arr2 = [cid, skip, itemNumInPage];
            db.query(sql2, arr2)
                .then(function (results) {
                    res.json({
                        resultCode : 0,
                        maxPage: maxPage + temp,
                        value: results
                    });
                })
                .catch(function () {
                    res.json({
                        resultCode: -1,
                        msg: err
                    })
                });
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});



//router.get('/', function(req, res, next) {
//
//    var currentPage = parseInt(req.query.page) || 1;
//    // 페이지 당 출력 개수, 클라이언트에서도 해줘야한다..
//    var itemNumInPage = 3;
//    var cid = req.query.cid;
//    //var akey = req.query.akey;
//    var sql1 = 'SELECT value FROM data_store WHERE cid = ? ORDER BY seq DESC';
//    var arr1 = [cid];
//    db.query(sql1, arr1)
//        .then(function (results) {
//            // 전체 아이템 개수,
//            var totalItem = parseInt(results.length);
//            // 전체 페이지
//            var maxPage = Math.floor(totalItem / itemNumInPage);
//            var temp = 1;
//            if(totalItem/itemNumInPage ===Math.floor(totalItem/itemNumInPage))
//                temp = 0;
//
//            // Skip할 개수 계산. page는 1부터 시작
//            var skip = itemNumInPage * (currentPage-1);
//            var sql2 = 'SELECT value FROM data_store WHERE cid = ? LIMIT ?, ?';
//            var arr2 = [cid, skip, itemNumInPage];
//            db.query(sql2, arr2)
//                .then(function (results) {
//                    res.json({
//                        resultCode : 0,
//                        maxPage: maxPage + temp,
//                        value: results
//                    });
//                })
//                .catch(function () {
//                    res.json({
//                        resultCode: -1,
//                        msg: err
//                    })
//                });
//        })
//        .catch(function (err) {
//            res.json({
//                resultCode: -1,
//                msg: err
//            })
//        });
//});


router.get('/test', function (req, res, next) {
    var sql = 'SELECT * FROM data_store where cid = ?';
    var arr = ['kks'];

    db.query(sql, arr)
        .then(function (results) {
            res.json(results);
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

module.exports = router;