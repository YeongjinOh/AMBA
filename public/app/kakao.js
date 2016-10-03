/**
 * Created by Lightsoo on 2016. 9. 27..
 */
var addZeroIfNeeded = function (num) {
    num = parseInt(num);
    return num < 10 ? '0' + num : num;
};


var getCurrentDate = function () {
    var date = new Date();
    var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var curr_date = addZeroIfNeeded(date.getDate());
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();
    var curr_hour = date.getHours();
    var curr_min = addZeroIfNeeded(date.getMinutes());
    var curr_sec = addZeroIfNeeded(date.getSeconds());
    return (curr_date + "-" + m_names[curr_month]
    + "-" + curr_year + "  " + curr_hour + ":" + curr_min + ":" + curr_sec);
}

var getTime = function () {
    var date = new Date();

    var hour = date.getHours();
    var min = addZeroIfNeeded(date.getMinutes());
    if(hour < 13){
        return "오전 " + hour +":" + min;
    }else{
        hour-=12;
        return "오후 " + hour +":"+ min;
    }

}

function inputChange(){
    var temp = editDiv.text();
    if(temp !==''){
        inputDiv.color('blue');
    }else{
        inputDiv.color('black');
    }
};

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
var userNameDiv = div().appendTo(topDiv).size('auto','auto').minHeight(15).marginLeft(5).marginTop(5).fontSize(18);

var currentData = getCurrentDate();
var chatListView = div().append().size('700','600').overflow('scroll').color('#90CAF9').displayBlock().text(currentData).textAlign('center');

var bottomFunc = div().append().size('700', '30').color('#cccccc').displayBlock();
//var func1 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func2 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');
//var func3 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func4 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');


var bottomDiv = div().append().size('700', '100');
var bottomDiv1 = div().appendTo(bottomDiv).size('80%', '100%').position('relative');
var editDiv = div().appendTo(bottomDiv1).size('90%','80%').editable(true).color('white').text('').position('absolute').top(0).bottom(0).left(0).right(0)
    //.trigger('contentChanged');

var bottomDiv2 = div().appendTo(bottomDiv).size('20%', '100%').color('white').position('relative');
var inputDiv = div().appendTo(bottomDiv2).size('75%','75%').color('#e6e6e6').text('전송').fontSize(15).margin('auto')
    .position('absolute').top(0).bottom(0).left(0).right(0)
    .borderOption(3).borderOption('#d9d9d9', 'color').borderRadius(20).textAlign('center').verticalAlign('middle').lineHeight('475%')
    .click(function () {
        var msg = editDiv.text();
        if(msg !== ''){
            editDiv.text('');
            primus.write({
                action : 'send_msg',
                message : {
                    //username : username,
                    username: userNameDiv.text(),
                    msg : msg
                }
            });
            //size의 width를 100%줘서 displayBlock()이 필요없다.
            var myMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
            var txt = div().appendTo(myMsg).size('auto','auto').text(msg).floatRight().marginRight(10).color('#ffff4d').fontSize(25).maxWidth(300)
                .borderOption(4).borderOption('#ffff4d','color').borderRadius('10%').whiteSpace('pre-line').textAlign('left').wordBreak('break-all');
            var myTime = div().appendTo(myMsg).size('auto','15').floatRight().text(getTime()).marginRight(5);
            myMsg.appendTo(chatListView);
        }
    });

    //.on("click", function () {
    //        if(editDiv.text() !== ''){
    //            inputDiv.color('blue');
    //        }else{
    //            inputDiv.color('black');
    //        }
    //    });


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

    if('broadcast_msg' == action) {
        var msg = data.message.msg;
        var username = data.message.username;
        //size의 width를 100%줘서 displayBlock()이 필요없다.
        var receivedMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
        //parent의 height를 'auto'로 설정했을때 min값을 설정해서 profile이 출력되게 하였다
        var profile = div().appendTo(receivedMsg).size('60','60').color('blue').borderRadius('50%').floatLeft();
        var txtArea = div().appendTo(receivedMsg).size('auto','auto').marginLeft(4).floatLeft();

        //tesxtAlign을 통해서 문자 왼쪽 정렬
        var name = div().appendTo(txtArea).size('auto','auto').text(username).displayBlock()
            .fontSize(20).textAlign('left');
        var txt = div().appendTo(txtArea).size('auto','auto').color('white').text(msg).maxWidth(300)
            .borderOption(4).borderOption('white','color').borderRadius('10%')
            .whiteSpace('pre-line').fontSize(25).textAlign('left').floatLeft().wordBreak('break-all');

        var recievdTime = div().appendTo(receivedMsg).size('auto','15').floatLeft().text(getTime()).marginLeft(5);
        receivedMsg.appendTo(chatListView);
    }
});