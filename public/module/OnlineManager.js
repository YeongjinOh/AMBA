/**
 * Created by Lightsoo on 2016. 10. 28..
 */


define(['primus'], function (Primus) {

    var Module = {};
    var primus;
    var ainfo = JSON.parse(localStorage.getItem('ainfo'));
    var roomid = AB.random(999999);
    console.log('ainfo : ', ainfo);

    Module.connect = function () {
        primus = Primus.connect();
        return this
    };

    Module.join = function (rid, fn) {
        //console.log('join : ', rid);
        if(rid===undefined){
            primus.write({
                action: 'join',
                message: {
                    roomid : 'ABMATA_'+roomid,
                    msg: 'join the channel'
                }
            });
        }else{
            primus.write({
                action: 'join',
                message: {
                    username : ainfo.username,
                    roomid : rid,
                    msg: 'join the channel'
                }
            });
        }
        return this
    };
    Module.userList = function (rid) {
        primus.write({
            action: 'userList',
            message: {
            //    username : ainfo.username,
                roomid : rid
            //    msg: 'join the channel'
            }
        });
        return this;
    };

    Module.sendMessage = function (msg) {
        primus.write({
            action: 'sendMessage',
            message : msg
        });
        return this
    };

    Module.onRecieve = function (fn) {
        primus.on('data', function (data) {
            if(fn)
                fn(data);
        });
        return this
    };

    Module.close = function(){
        primus.end();
        return this
    };

    return Module;

});