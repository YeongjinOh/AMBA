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

//채팅방에 있는 사람이름과 몇명있는지
//var userName = [];
//var cntUser = 0;
var myName = ''



//var parent = div().append().size('100%','100%');
//width를 100%주면 display : block이 아니라 inline-block이라도 다음 박스가 밑으로 연결된다!
var topDiv = div().append().size('700','70').color('#EEEEEE').displayBlock(); //.displayBlock();


//userImgDiv안에 이미지 div를 넣어 상하좌우 가운데 정렬을 줬다
//부모의 position을 relative를 주고, 자식의 position을 'absolute'를 주고 top,bottom,left,right의 위치를 준다. 각각 마진을 주는셈
//밑에 전송 화면도 그런식으로...
var userImgDiv = div().size('70','70').appendTo(topDiv).position('relative');
div().appendTo(userImgDiv).size(60,60).color('red').borderRadius('50%').margin('auto').position('absolute').top(0).bottom(0).left(0).right(0);
var userNameDiv = div().appendTo(topDiv).size('auto','auto').minHeight(15).marginLeft(5).marginTop(5).color('blue').fontSize(18);


var chatListView = div().append().size('700','600').overflow('scroll').color('#90CAF9').displayBlock();

var bottomFunc = div().append().size('700', '30').color('gray').displayBlock();
//var func1 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func2 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');
//var func3 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func4 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');


var bottomDiv = div().append().size('700', '100');
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
                username: userNameDiv.text(),
                msg : msg
            }
        });
        var myMsg = div().size('100%', 'auto');
        var txt = div().appendTo(myMsg).text(msg).floatRight().marginRight(10).size('auto','auto').color('#ffff4d').fontSize(25).borderOption(4).borderOption('#ffff4d','color').borderRadius('16%');
        myMsg.appendTo(chatListView);

    });

primus.on('data', function (data){
    var action = data.action;
    //처음 접속했을때, 이름을 할당받는다.
    if('new' === action){
        myName = data.message.nickname;
        //userName.push(myName);
        userNameDiv.text(myName);
        //username = data.message.nickname;
        //topDiv.text(username);
        //$('#nickname').val(data.message.nickname);
    }
sd
    if('broadcast_msg' == action) {
        var msg = data.message.msg;
        var username = data.message.username;

        var receivedMsg = div().size('100%', 'auto').minHeight(70);
        //parent의 height를 'auto'로 설정했을때 min값을 설정해서 profile이 출력되게 하였다
        var profile = div().appendTo(receivedMsg).size('60','60').color('blue').borderRadius('50%');
        var txtArea = div().appendTo(receivedMsg).size('500','auto').color('gray').marginLeft(2);

        var name = div().appendTo(txtArea).size('100','100%').color('red').text(username).displayBlock().fontSize(20);
        var msg = div().appendTo(txtArea).size('auto','auto').color('purple').text(msg).whiteSpace('normal').fontSize(25);
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


