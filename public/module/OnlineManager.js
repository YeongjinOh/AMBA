/**
 * Created by Lightsoo on 2016. 10. 28..
 * 내생각에 send, engrance의 파라미터에 콜백함수가 왜 필요한지 모르겠어
 * 필요하면 어떤데이터를 넘겨줘야 되는건가...
 * onRecieve함수에서는 메시지를 넘겨주면 될것 같다.
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

    //entrance the room,방번호를 받을때, 자동생성해서 만들거나 유저에게 받아서 접속한다.
    Module.join = function (rid, fn) {
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
                    roomid : rid,
                    msg: 'join the channel'
                }
            });
        }
        return this
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