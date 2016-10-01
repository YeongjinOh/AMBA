/**
 * Created by Lightsoo on 2016. 9. 28..
 */
var primus = Primus.connect()

div().append().text('Send message').displayBlock();
div().append().text('NAME : ');
var nickname = div().append();
var chatList = div().append().border(1).borderColor('black').size('400', '500').overflow('scroll').displayBlock();
var inputDiv = div().append().border(1).borderColor('black').size('400','100').editable(true).overflow('scroll').displayBlock();
var submitDiv = div().append().border(1).borderColor('black').size('400', '50').color('blue')
    .click(function () {
        primus.write({
           action : 'send_msg',
            message : {
                msg : inputDiv.text(),
                username : nickname.text()
            }
        });
        inputDiv.text('');
    });

primus.on('data', function (data){
    var action = data.action;
    //처음 접속했을때, 이름을 할당받는다.
    if('new' === action){
        var name = data.message.nickname;
        nickname.text(name);
        //$('#nickname').val(data.message.nickname);
    }

    if('broadcast_msg' == action) {
        var msg = data.message.msg;
        //var username = data.message.username;
        var temp = username + msg;
        var recievedMsg = div().size('100%', '60').text(msg).border(1).borderColor('black');
        recievedMsg.appendTo(chatList);
    }
});