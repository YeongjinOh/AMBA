/**
 * Created by Lightsoo on 2016. 10. 26..
 */


var express = require('express');
var router = express.Router();
var pool = require('../db');


router.post('/', function(req, res, next) {

    //
    //pool.getConnection(function (err, connection) {
    //    var sql = "INSERT INTO data_store VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE value = ?";
    //    console.log(req.body);
    //    var cid = req.body.cid;
    //    var akey = req.body.akey;
    //    var value = req.body.value;
    //
    //    var arr =[cid, akey, value, value];
    //    connection.query(sql, arr, function (err, result) {
    //        if(err){
    //            console.log(err);
    //        }
    //        console.log(result);
    //        res.status(200).json(result);
    //        connection.release();
    //    });
    //
    //
    //
    //});

    var sql = "INSERT INTO data_store VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE value = ?";
    console.log(req.body);
    var cid = req.body.cid;
    var akey = req.body.akey;
    var value = req.body.value;

    var arr =[cid, akey, value, value];
    pool.query(sql, arr)
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

router.get('/test', function (req, res, next) {
    var sql = 'SELECT * FROM data_store';
    var arr = [];

    pool.query(sql, arr)
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


router.get('/', function(req, res, next) {

    var currentPage = parseInt(req.query.page) || 1;
    // 페이지 당 출력 개수
    var itemNumInPage = 5;

    var cid = req.query.cid;
    var akey = req.query.akey;
    //var sql = 'SELECT value FROM data_store WHERE cid = ? AND akey = ?;';
    var sql = 'SELECT * FROM data_store';
    var arr = [];
    //var arr = [cid, akey];

    db.query(sql, arr)
        .then(function (results) {
            // 전체 아이템 개수
            var itemCount = parseInt(results.length);
            console.log('itemCount : ', itemCount);

            // 전체 페이지
            var maxPage = Math.floor(itemCount / itemNumInPage );
            console.log(maxPage);
            // Skip할 개수 계산. page는 1부터 시작
            var skip = itemNumInPage * (currentPage-1);

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