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

var sub = redis.createClient();
var pub = redis.createClient();

module.exports = function (server) {
    var primus = new Primus(server, options);
    primus.plugin('rooms', Rooms);

    primus.on('connection',function(spark){
        console.log('connected!');
        //client로 부터 요청이 오면 이벤트 'data'이벤트 발생
        spark.on('data', function(data) {
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
                    //메시지 전송
                    spark.room(room).except(spark.id).write(spark.username + ' joined room ' + room);
                });
                //채널(채팅방)등록
                sub.subscribe(room);
            }

            if('sendMessage' === action){
                //spark별로 현재 join한 room을 리턴해준다.
                console.log('spark.rooms() : ', spark.rooms());

                //spark객체가 조인한 room중에서 특정 room을 포함하고 있으면 0리턴
                if (~spark.rooms().indexOf(room)) {
                    pub.publish(room, msg);
                } else {
                    // join the room
                    spark.join(room, function(){
                        pub.publish(room,msg);
                        /*//id를 통해 본인을 제외하고 room(room)에 접속한 spark에 메시지를 전송
                        spark.room(room).except(spark.id).write({
                            action : 'broadcast_msg',
                            message : {
                                username : spark.username,
                                msg : msg
                            }
                        });*/
                    });
                }
            }
        });

        //pub.publish()를 호출하면 여기로 넘어간다
        sub.on('message', function (channel, message) {//메시지를 수신하면 발생하는 이벤트
            console.log("sub channel " + channel + " : " + message);
            //spark별로 현재 join한 room을 리턴해준다.
		console.log('spark : ', spark);
console.log(spark.rooms);
console.log(spark.room);
            //console.log('spark.rooms() : ', spark.rooms());
            if(spark !==undefined) {
                spark.room(channel).except(spark.id).write({
                    action: 'broadcast_msg',
                    message: {
                        username: spark.username,
                        msg: message
                    }
                });
            }
        });
    });

    primus.on('disconnection', function (spark) {
        console.log('disconnection');
        spark.end();
    });
};
