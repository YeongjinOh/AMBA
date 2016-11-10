/**
 * Created by Lightsoo on 2016. 10. 30..
 */

var express = require('express');
var router = express.Router();
var db = require('../db');
var promise = require('promise');


function setRoomid(roomid){
    //console.log(roomid.split(':'));
    return roomid.split(':')[2]
}

//사용자이름으로 방하는데 나중에 아이디로 바꿔줘야한다.
router.get('/rooms', function (req, res, next) {
    var username = req.query.username;
    var key ='AA'+':'+username;
    req.cache.lrange(key, 0, -1, function (err, results) {
        if(err){
            console.log(err);
            var data = {
                'resultCode' : -1,
                'msg' : 'fail to getting msg'
            };
            res.status(200).json(data);
            next(err);
        }
        var data = {
            'resultCode' : 0,
            'msg' : 'success to getting msg',
            'data' : results
        };
        res.status(200).json(data);
    });
});

//나중에 promise로 바꿔줘야한다
router.post('/rooms', function (req,res,next) {

    console.log('body : ', req.body);
    var roomid = req.body.roomid;
    var userList = req.body['userList[]'];

    for(var i=0; i<userList.length;i++){
        var key = 'AA:' + userList[i];
        req.cache.lpush(key, roomid, function (err, result) {
            if(err){
                console.log(err);
                var data = {
                    'resultCode' : -1,
                    'msg' : 'fail to getting msg'
                };
                res.status(200).json(data);
                next(err);
            }
        })
    }
    var data = {
        'resultCode' : 0,
        'msg' : 'success to make the room'
    };
    res.status(200).json(data);
});

//roomid, username을 받아서
router.get('/msg', function (req, res, next) {
    var roomid = req.query.roomid;
    var key = 'AA' + ':' + roomid ;
    req.cache.lrange(key, 0, -1, function (err, results) {
        if(err){
            console.log(err);
            var data = {
                'resultCode' : -1,
                'msg' : 'fail to getting msg'
            };
            res.status(200).json(data);
            next(err);
        }
        var data = {
            'resultCode' : 0,
            'msg' : 'success to getting msg',
            'data' : results
        };
        res.status(200).json(data);
    });
});

/*for chat*/
//채팅방에 참여하였을때 + 메시지를 보냈을때
//Lists의 LPUSH를 이용해서 순차적으로 넣어준다
//LPUSH KEY VALUE;
router.post('/msg', function (req,res,next) {
    //var score = new Date().getTime();
    var body = req.body;
    var roomid = body.roomid;
    var value = {
        writer : body.username,
        time : body.time,
        message : body.message
    };
    var key ='AA';
    //value = "\""+JSON.stringify(value)+"\"";
    value = JSON.stringify(value);
    key = key + ':' +roomid;
    req.cache.lpush(key, value, function (err, result) {
        if(err){
            console.log(err);
            var data = {
                'resultCode' : -1,
                'msg' : 'fail to send'
            };
            res.status(200).json(data);
            next(err);
        }
        var data = {
            'resultCode' : 0,
            'msg' : 'success to send msg'
        };
        res.status(200).json(data);
    });
});



router.post('/test', function (req, res, next) {

});


module.exports = router;