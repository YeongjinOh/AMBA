/**
 * Created by Lightsoo on 2016. 10. 5..
 */

var express = require('express');
var router = express.Router();

/**
 *cachestore
 -put(cid, key, value)
 -get(cid, key)
 -keys(cid) //keys() : 키 리턴
 -list(cid)
 */


/**
 * url : /cachestore/put
 * body : {
 * cid, key, value
 * }
 * return : statusCode, ResultCode, msg
 */
router.post('/put', function (req, res,next) {

    var body = req.body;
    var cid = body.cid;
    var key = body.key;
    var value = body.value;
    console.log('body : ', body);

    req.cache.hset(cid, key, value, function (err, result) {
        console.log('result : ', result);
       if(err){
           console.log(err);
           var data = {
               'resultCode' : -1,
               'msg' : '키 저장 실패'
           };
           res.status(200).json(data);
           next(err);
           //return;
       }
        var data = {
            'resultCode' : 0,
            'msg' : '키 저장 성공'
        };

       res.status(200).json(data);
    });
});

/**
 * url : /cachestore/get
 * query : cid, key
 */
router.get('/get', function (req, res,next) {
    var cid = req.query.cid;
    var key = req.query.key;
    console.log('cid : ' + cid + ', key : ' + key);
    req.cache.hget(cid, key, function (err, result) {
        console.log('result : ', result);
        if(err){
            console.log(err);
            var data = {
                'resultCode' : -1,
                'msg' : '요청 실패'
            };
            res.status(200).json(data);
            next(err);
        }
        console.log('requested!!!');
        //res.setHeader('Content-Type', 'text/javascript');

        //res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.status(200).send(result);

        //res.status(200).json(result)
    });
});


//cid에 들어있는 key값들을 리턴
router.get('/keys', function (req, res, next) {
    var cid = req.query.cid;
    console.log('cid : ' + cid);
    req.cache.hkeys(cid, function (err, result) {
        console.log('result : ', result);
        if(err){
            console.log(err);
            var data = {
                'resultCode' : -1,
                'msg' : '키 요청 실패'
            };
            res.status(200).json(data);
            next(err);
        }
        res.status(200).json(result);
    });
});

router.get('/list', function (req, res, next) {
    var cid = req.query.cid;
    console.log('cid : ' + cid);
    req.cache.hvals(cid, function (err, result) {
        console.log('result : ', result);
        if(err){
            console.log(err);
            var data = {
                'resultCode' : -1,
                'msg' : '요청 실패'
            };
            res.status(200).json(data);
            next(err);
        }
        res.status(200).json(result);
    });
});




module.exports = router;