/**
 * Created by Lightsoo on 2016. 11. 10..
 */

//var server = require('../bin/www');
var redis = require('redis');
var Primus = require('primus');
var Rooms = require('primus-rooms');
var options = {
    transformer: "engine.io"
};

module.exports = function (server) {
    var primus = new Primus(server, options);
    // add rooms to Primus
    //primus.use('rooms', Rooms);
    primus.plugin('rooms', Rooms);

    primus.on('connection',function(spark){

        console.log('connected!');
        //client로 부터 요청이 오면 이벤트 'data'이벤트 발생
        spark.on('data', function(data) {
            data = data || {};
            var action = data.action;
            var message = data.message;

            var username = message.username;
            var room = message.roomid;
            var msg = message.msg;

            // join a room
            if ('join' === action) {
                //조인할때 사용자의 이름을 spark에 저장
                spark.username = username;
                spark.join(room, function () {
                    // send message to this client
                    //spark.write('you joined room ' + room);
                    // send message to all clients except this one
                    //spark.room(room).except(spark.id).write(spark.id + ' joined room ' + room);
                    spark.room(room).except(spark.id).write(spark.username + ' joined room ' + room);
                });
            }

            // leave a room
            if ('leave' === action) {
                spark.leave(room, function () {
                    // send message to this client
                    spark.write('you left room ' + room);
                });
            }

            if('sendMessage' === action){
                //spark별로 현재 join한 room을 리턴해준다.
                //console.log('spark.rooms() : ', spark.rooms());

                //spark객체가 조인한 room중에서 특정 room을 포함하고 있으면 0리턴
                if (~spark.rooms().indexOf(room)) {
                    send();
                } else {
                    // join the room
                    spark.join(room, function(){
                        send();
                    });
                }

                // send to all clients in the room
                function send() {
                    /*var clients = primus.room(room).clients();
                    //spark의 id값을 리턴한다
                    console.log('send, spark.room(room).client() : ', spark.room(room).clients());
                    console.log('send, primus.room(room).client() : ', clients);

                    spark.room(room).clients(function (data) {
                        console.log(spark.id);
                        console.log(data);
                    });

                    primus.clients(room, function (data) {
                       console.log(data)
                    });*/

                    //id를 통해 본인을 제외하고 room(room)에 접속한 spark에 메시지를 전송
                    spark.room(room).except(spark.id).write({
                        action : 'broadcast_msg',
                        message : {
                            username : spark.username,
                            msg : msg
                        }
                    });
                }

            }
        });
    });

    primus.on('disconnection', function (spark) {
        console.log('disconnection');
        spark.end();
    });
};



/*module.exports = function (server) {
    var options = {
        transformer: "engine.io"
    };

    primus = new Primus(server,options);





    var sub = redis.createClient();
    var pub = redis.createClient();
    var userList = {};
    primus.on('connection',function(spark){

        console.log('connected!');
        spark.write({
            action : 'new',
            message : {
                msg : 'welcome'
            }
        });

        //채널 갯수,
        sub.on('subscribe', function (channel, count) {
            console.log('Subscribed on channel:', channel, ', count:', count);
        });

        //client로 부터 요청이 오면 이벤트 'data'이벤트 발생
        spark.on('data', function(data){
            var action = data.action;
            var message = data.message;

            if('join' == action){
                sub.subscribe(message.roomid);
            }

            //메시지를 전송!!
            if('sendMessage' == action){
                var roomid = message.roomid;
                var msg = message.msg;
                var username = message.username;
                //메시지를 보낸사람
                var reply = JSON.stringify({
                    username : username,
                    msg: msg,
                    roomid : roomid
                });
                pub.publish(roomid, reply);
            }
        });

        //pub.publish()를 호출하면 여기로 넘어간다
        sub.on('message', function (channel, message) {//메시지를 수신하면 발생하는 이벤트
            console.log("sub channel " + channel + " : " + message);
            var temp = JSON.parse(message);
            if(channel == temp.roomid){//같은 채널에만 메시지를 보낸다.
                var msg = temp.msg;
                var username = temp.username;
                //console.log("msg : " + msg + ", username : ", username);

                if(spark.myname != username){//보낸이를 제외하고 보낸다
                    spark.write({
                        action : 'broadcast_msg',
                        message : {
                            roomid : channel,
                            username : username,
                            msg : msg
                        }
                    });
                }

            }
        });
    });

    primus.on('disconnection', function (spark) {
        console.log('disconnection');
        spark.end();
    });
};*/