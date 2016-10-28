/**
 * Created by Lightsoo on 2016. 10. 28..
 */
define(['primus'], function (primus) {

    var Module = {};
    Module.connect = function () {
        var primus = Primus.connect();

        //처음 접속시 채널에 가입한다
        primus.write({
            action: 'join',
            message: {
                msg: 'join the channel'
            }
        });
        return this
    };

    //채널에 가입
    Module.subscribe = function () {

    };

    Module.sendMsg = function () {

    };

    Module.recieveMsg = function () {

    };
    return Module;

});