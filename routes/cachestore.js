/**
 * Created by Lightsoo on 2016. 10. 5..
 */

var express = require('express');
var router = express.Router();

/**
 *
 cachestore
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
    var cid = 'test';
    var key = body.key;
    var value = body.value;
    console.log('body : ', body);

    req.cache.set(key,value, function (err, result) {
       if(err){
           console.log(err);
           var data = {
               'resultCode' : -1,
               'msg' : '키 저장 실패'
           }
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
router.get('/get', function (req, res) {
    //var page_number = req.query.page;
    //var cid = req.param.cid;
    res.json('test');
});

module.exports = router;