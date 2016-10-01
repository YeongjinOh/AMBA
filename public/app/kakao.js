/**
 * Created by Lightsoo on 2016. 9. 27..
 */
var primus = Primus.connect();
//처음 접속시 채널에 가입한다
primus.write({
    action : 'join',
    message : {
        msg : 'join the channel'
    }
});

var username = '';

//var parent = div().append().size('100%','100%');
//width를 100%주면 display : block이 아니라 inline-block이라도 다음 박스가 밑으로 연결된다!
var topDiv = div().append().size('100%','10%').color('#d9d9d9'); //.displayBlock();
var chatListView = div().append().size('100%','70%').overflow('scroll').color('#80bfff');

var bottomFunc = div().append().size('100%', '5%').color('gray')
//var func1 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func2 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');
//var func3 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func4 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');


var bottomDiv = div().append().size('100%', '15%');
var bottomDiv1 = div().appendTo(bottomDiv).size('80%', '100%').color('red').editable(true).color('white');
//var inputDiv = div().appendTo(bottomDiv1).size('100%', '100%').color('red').padding(10);

var bottomDiv2 = div().appendTo(bottomDiv).size('20%','100%').color('green').text('전송버튼').fontSize(25)
    .click(function () {
        var msg = bottomDiv1.text();
        bottomDiv1.text('');
        primus.write({
            action : 'send_msg',
            message : {
                //username : username,
                username: topDiv.text(),
                msg : msg
            }
        });
        var myMsg = div().size('100%', 'auto').minHeight(70)
        var background = div().appendTo(myMsg).size('auto','auto');
        var txt = div().appendTo(myMsg).floatRight().text(msg).size('auto','70').color('#ffff4d');
        myMsg.appendTo(chatListView);

    });

primus.on('data', function (data){
    var action = data.action;
    //처음 접속했을때, 이름을 할당받는다.
    if('new' === action){
        username = data.message.nickname;
        topDiv.text(username);
        //$('#nickname').val(data.message.nickname);
    }

    if('broadcast_msg' == action) {
        var msg = data.message.msg;
        var username = data.message.username;

        var receivedMsg = div().size('100%', 'auto').minHeight(70);
        //parent의 height를 'auto'로 설정했을때 min값을 설정해서 profile이 출력되게 하였다
        var profile = div().appendTo(receivedMsg).size('70','70').color('blue');
        var txt = div().appendTo(receivedMsg).size('500','100%').color('gray');
        var name = div().appendTo(txt).size('100','100%').color('red').text(username).displayBlock();
        var msg = div().appendTo(txt).size('auto','auto').color('purple').text(msg).whiteSpace('normal');
        receivedMsg.appendTo(chatListView);

        //var recievedMsg = div().size('100%', '60').text(msg).border(1).borderColor('black');
        //recievedMsg.appendTo(chatList);

    }
});
/**
 * redis의 h-set, 레디스 개념 ZADD를 사용한 랭킹구현,
 * 처음생성할때는 display를 none으로 하고 span사이즈르 auto;
 */

//var submitDiv = div().appendTo(bottomDiv2).size('100%', '100%').color('red').padding(10);


