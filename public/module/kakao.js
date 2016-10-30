/**
 * Created by Lightsoo on 2016. 10. 6..
 */

/**
 * kakao모듈을 정의한다
 * 객체를 만들어서 스코프를 줬어
 * 'kks'로 모듈의 이름을 명시했는데 같은 소스안에서만 require(['kks'], func(){})이 되네...?
 * 파일명이랑 같게 해야되는건가...?
 */

//!function(){var e={},t=function(e){return e=parseInt(e),e<10?"0"+e:e},o=function(){var e=new Date,o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=t(e.getDate()),a=e.getMonth(),n=e.getFullYear(),r=e.getHours(),d=t(e.getMinutes()),p=t(e.getSeconds());return i+"-"+o[a]+"-"+n+"  "+r+":"+d+":"+p},i=function(){var e=new Date,o=e.getHours(),i=t(e.getMinutes());return o<13?"오전 "+o+":"+i:(o-=12,"오후 "+o+":"+i)};return e.appendTo=function(e){var t=Primus.connect();t.write({action:"join",message:{msg:"join the channel"}});var a="",n=div().appendTo(e).size("700","70").color("#EEEEEE").displayBlock(),r=div().size("70","70").appendTo(n).position("relative");div().appendTo(r).size(60,60).color("red").borderRadius("50%").margin("auto").position("absolute").top(0).bottom(0).left(0).right(0);var d=div().appendTo(n).size("auto","auto").minHeight(15).marginLeft(5).marginTop(5).fontSize(18),p=o(),l=div().appendTo(e).size("700","600").overflow("scroll").color("#90CAF9").displayBlock().text(p).textAlign("center"),s=(div().appendTo(e).size("700","30").color("#cccccc").displayBlock(),div().appendTo(e).size("700","100")),c=div().appendTo(s).size("80%","100%").position("relative"),u=div().appendTo(c).size("100%","100%").editable(!0).color("white").text("").position("absolute").top(0).bottom(0).left(0).right(0).borderOption(2).borderOption("black","color").overflow("scroll"),g=div().appendTo(s).size("20%","100%").color("white").position("relative");div().appendTo(g).size("75%","75%").color("#e6e6e6").text("전송").fontSize(15).margin("auto").position("absolute").top(0).bottom(0).left(0).right(0).borderOption(3).borderOption("#d9d9d9","color").borderRadius(20).textAlign("center").verticalAlign("middle").lineHeight("475%").click(function(){var e=u.text();if(""!==e){u.text(""),t.write({action:"send_msg",message:{username:d.text(),msg:e}});var o=div().size("100%","auto").minHeight(60).marginTop(5);div().appendTo(o).size("auto","auto").text(e).floatRight().marginRight(10).color("#ffff4d").fontSize(25).maxWidth(300).borderOption(4).borderOption("#ffff4d","color").borderRadius("10%").whiteSpace("pre-line").textAlign("left").wordBreak("break-all"),div().appendTo(o).size("auto","15").floatRight().text(i()).marginRight(5);o.appendTo(l)}});t.on("data",function(e){var t=e.action;if("new"===t&&(a=e.message.nickname,d.text(a)),"broadcast_msg"==t){var o=e.message.msg,n=e.message.username,r=div().size("100%","auto").minHeight(60).marginTop(5),p=(div().appendTo(r).size("60","60").color("blue").borderRadius("50%").floatLeft(),div().appendTo(r).size("auto","auto").marginLeft(4).floatLeft());div().appendTo(p).size("auto","auto").text(n).displayBlock().fontSize(20).textAlign("left"),div().appendTo(p).size("auto","auto").color("white").text(o).maxWidth(300).borderOption(4).borderOption("white","color").borderRadius("10%").whiteSpace("pre-line").fontSize(25).textAlign("left").floatLeft().wordBreak("break-all"),div().appendTo(r).size("auto","15").floatLeft().text(i()).marginLeft(5);r.appendTo(l)}})},define([],function(){return e}),e}();

(function() {
//define('kakao',[],function () {

    var kakao = {};
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
    };

    var getTime = function () {
        var date = new Date();

        var hour = date.getHours();
        var min = addZeroIfNeeded(date.getMinutes());
        if (hour < 13) {
            return "오전 " + hour + ":" + min;
        } else {
            hour -= 12;
            return "오후 " + hour + ":" + min;
        }

    };
    //requirejs를 codelistㅔ서 run했을때 사용하게끔 depse 들을 배열로 받아서 사용할수 있어야한다

    kakao.appendTo = function(target) {


        // var primus = require(['/primus/primus.js'], function() {
        //     return Primus.connect();
        // });
        var primus = Primus.connect();

        //처음 접속시 채널에 가입한다
        primus.write({
            action: 'join',
            message: {
                msg: 'join the channel'
            }
        });

        //채팅방에 있는 사람이름과 몇명있는지
        //var userName = [];
        //var cntUser = 0;
        var myName = '';
        //var target = div().append().size('auto', 'auto');

        //var parent = div().append().size('100%','100%');
        //width를 100%주면 display : block이 아니라 inline-block이라도 다음 박스가 밑으로 연결된다!
        var topDiv = div().appendTo(target).size('700', '70').color('#EEEEEE').displayBlock(); //.displayBlock();


        //userImgDiv안에 이미지 div를 넣어 상하좌우 가운데 정렬을 줬다
        //부모의 position을 relative를 주고, 자식의 position을 'absolute'를 주고 top,bottom,left,right의 위치를 준다. 각각 마진을 주는셈
        //밑에 전송 화면도 그런식으로...
        var userImgDiv = div().size('70', '70').appendTo(topDiv).position('relative');
        div().appendTo(userImgDiv).size(60, 60).color('red').borderRadius('50%').margin('auto')
            .position('absolute').top(0).bottom(0).left(0).right(0);
        var userNameDiv = div().appendTo(topDiv).size('auto', 'auto').minHeight(15).marginLeft(5).marginTop(5).fontSize(18);

        var currentData = getCurrentDate();
        var chatListView = div().appendTo(target).size('700', '600').overflow('scroll').color('#90CAF9').displayBlock().text(currentData).textAlign('center');

        var bottomFunc = div().appendTo(target).size('700', '30').color('#cccccc').displayBlock();

        var bottomDiv = div().appendTo(target).size('700', '100');
        var bottomDiv1 = div().appendTo(bottomDiv).size('80%', '100%').position('relative');
        var editDiv = div().appendTo(bottomDiv1).size('100%', '100%').editable(true).color('white').text('')
            .position('absolute').top(0).bottom(0).left(0).right(0)
            .borderOption(2).borderOption('black', 'color')
            .overflow('scroll');
        //.trigger('contentChanged');

        var bottomDiv2 = div().appendTo(bottomDiv).size('20%', '100%').color('white').position('relative');
        var submitDiv = div().appendTo(bottomDiv2).size('75%', '75%').color('#e6e6e6').text('전송').fontSize(15).margin('auto')
            .position('absolute').top(0).bottom(0).left(0).right(0)
            .borderOption(3).borderOption('#d9d9d9', 'color').borderRadius(20).textAlign('center').verticalAlign('middle').lineHeight('475%')
            .click(function () {
                var msg = editDiv.text();
                if (msg !== '') {
                    editDiv.text('');
                    primus.write({
                        action: 'send_msg',
                        message: {
                            //username : username,
                            username: userNameDiv.text(),
                            msg: msg
                        }
                    });
                    //size의 width를 100%줘서 displayBlock()이 필요없다.
                    var myMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
                    var txt = div().appendTo(myMsg).size('auto', 'auto').text(msg).floatRight().marginRight(10).color('#ffff4d').fontSize(25).maxWidth(300)
                        .borderOption(4).borderOption('#ffff4d', 'color').borderRadius('10%').whiteSpace('pre-line').textAlign('left').wordBreak('break-all');
                    var myTime = div().appendTo(myMsg).size('auto', '15').floatRight().text(getTime()).marginRight(5);
                    myMsg.appendTo(chatListView);
                }
            });

        primus.on('data', function (data) {
            var action = data.action;
            //처음 접속했을때, 이름을 할당받는다.
            if ('new' === action) {
                myName = data.message.nickname;
                //userName.push(myName);
                userNameDiv.text(myName);
                //username = data.message.nickname;
                //topDiv.text(username);
                //$('#nickname').val(data.message.nickname);
            }

            if ('broadcast_msg' == action) {
                var msg = data.message.msg;
                var username = data.message.username;
                //size의 width를 100%줘서 displayBlock()이 필요없다.
                var receivedMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
                //parent의 height를 'auto'로 설정했을때 min값을 설정해서 profile이 출력되게 하였다
                var profile = div().appendTo(receivedMsg).size('60', '60').color('blue').borderRadius('50%').floatLeft();
                var txtArea = div().appendTo(receivedMsg).size('auto', 'auto').marginLeft(4).floatLeft();

                //tesxtAlign을 통해서 문자 왼쪽 정렬
                var name = div().appendTo(txtArea).size('auto', 'auto').text(username).displayBlock()
                    .fontSize(20).textAlign('left');
                var txt = div().appendTo(txtArea).size('auto', 'auto').color('white').text(msg).maxWidth(300)
                    .borderOption(4).borderOption('white', 'color').borderRadius('10%')
                    .whiteSpace('pre-line').fontSize(25).textAlign('left').floatLeft().wordBreak('break-all');

                var recievdTime = div().appendTo(receivedMsg).size('auto', '15').floatLeft().text(getTime()).marginLeft(5);
                receivedMsg.appendTo(chatListView);
            }
        });
    };

    define([],function () {
        return kakao;
    });
    return kakao;
})();