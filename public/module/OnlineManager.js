/**
 * Created by Lightsoo on 2016. 10. 28..
 */


define(['primus'], function (Primus) {

    var Module = {};
    var primus;
    var ainfo = JSON.parse(localStorage.getItem('ainfo'));

    Module.connect = function () {
        primus = Primus.connect();
        return this
    };

    Module.join = function (rid) {
        console.log('join the ' ,rid);
            primus.write({
                action: 'join',
                message: {
                    username : ainfo.username,
                    roomid : rid,
                    msg: 'join the channel'
                }
            });
        return this
    };

    Module.sendMessage = function (msg) {
        console.log('sendMessage : ', msg);
        primus.write({
            action: 'sendMessage',
            message : msg
        });
        return this
    };

    Module.onRecieve = function (fn) {
        primus.on('data', function (data) {
            console.log('recieved msg : ', data);
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