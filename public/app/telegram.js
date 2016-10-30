/**
 * Created by Lightsoo on 2016. 10. 28..
 */
requirejs(['OnlineManager'], function (online) {


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

    online.connect();
    online.join('test');
    //online.close();

    var parent = div().append().size('810', '550')
        //.borderOption(1).borderOption('#EBE8E7', 'color');

    //var teleHeader = div().appendTo(parent).size('auto','40').color('green').displayBlock();
    //var headerTitle = div().appendTo(teleHeader).size('auto',40)
    //    .borderRight('solid 2px').borderRightColor('#EBE8E7')
    //    .paddingLeft(2).paddingRight(2)
    //    .text('AMBATA').fontColor('white').fontSize(26);
    //var headerFreinds = div().appendTo(teleHeader).size('auto',40)
    //    .borderRight('solid 2px').borderRightColor('#EBE8E7')
    //    .paddingLeft(2).paddingRight(2)
    //    .text('친구목록').fontColor('white').fontSize(26);
    //var headerRooms = div().appendTo(teleHeader).size('auto',40)
    //    .borderRight('solid 2px').borderRightColor('#EBE8E7')
    //    .paddingLeft(2).paddingRight(2)
    //    .text('채팅방 목록').fontColor('white').fontSize(26);



    //방목록 or 친구목록을 보여준다.
    var sideView = div().appendTo(parent).size(300,550);

    var listView = div().appendTo(sideView).size(300, 480).overflow('scroll')
        .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();

    var sideBottom =div().appendTo(sideView).size(300,70).color('#EBE8E7')
        .margin('auto');

    var sideFreinds = div().appendTo(sideBottom).size(150,70).image('../images/profile.png')
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2);

    var sideRooms = div().appendTo(sideBottom).size(150,70).image('../images/chat.png')
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2);

    //채팅 내용
    var contentView = div().appendTo(parent).size(508,550);
    var chatListView = div().appendTo(contentView).size(504,480).overflow('scroll')
        .padding(3)
        .borderOption(1).borderOption('#EBE8E7', 'color')
        .color('blue');

    var contentBottom1 = div().appendTo(contentView).size(434,70).color('#EBE8E7')
        .borderLeft('solid 2px').borderLeftColor('black')
        .padding(10);

    var inputView = div().appendTo(contentBottom1).size('100%','100%').color('white')
        .editable(true).text('').overflow('scroll');

    var contentBottom2 = div().appendTo(contentView).size(70,70).color('red')
        .padding(12);
    var sendBtn = div().appendTo(contentBottom2).size('100%','100%').color('yellow')
        .padding(2)
        .click(function () {
            online.sendMessage({
                roomid : 'test',
                username : 'lightsoo',
                msg : inputView.text()
            });
            inputView.text('');

            //size의 width를 100%줘서 displayBlock()이 필요없다.
            var myMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
            var txt = div().appendTo(myMsg).size('auto', 'auto').text(msg).floatRight().marginRight(10).color('#ffff4d').fontSize(25).maxWidth(300)
                .borderOption(4).borderOption('#ffff4d', 'color').borderRadius('10%').whiteSpace('pre-line').textAlign('left').wordBreak('break-all');
            var myTime = div().appendTo(myMsg).size('auto', '15').floatRight().text(getTime()).marginRight(5);
            myMsg.appendTo(chatListView);

        });

    online.onRecieve(function (data) {
        var action = data.action;
        var message = data.message;
        //처음 접속했을때, 이름을 할당받는다.
        if ('new' === action) {
            console.log(message.msg);
        }

        if ('broadcast_msg' == action) {
            console.log(message);
            var username = message.username;
            var msg = message.msg;
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





    //for listView
    //using div.deco()
    var friendView = function (dv) {
        dv.size('326','50').color('white')
            .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();
    };

    var setFriend = function (friendData) {
        var friend = div().appendTo(listView).deco(friendView);
        var profileWrapper = div().appendTo(friend).size(50, 50).padding(3);
        var profile = div().appendTo(profileWrapper).size('100%','100%').color('green');
        var name = div().appendTo(friend)
            .text(friendData.username);

        friend.hoverColor('black','white')
            .click(function () {
                contentView.text(name.text());
            });

    };

    //data
    var friendData = function (obj) {
       return {
            username : obj.username
       }
    };

    var NetworkManager = function () {
        this.getFreinds = function () {
            $.get('/users',{/*query*/}
                , function(result) {
                    //array
                    var friends = result.data.map(friendData);
                    console.log('friends\n', friends);
                    for(var i=0;i<friends.length;i++){
                        setFriend(friends[i]);
                    }
            });
            return this;
        };
        this.getRooms = function () {
            $.get('/users',{/*query*/}
                , function(result) {
                    //array
                    var friends = result.data.map(friendData)
                    for(var i=0;i<friends.length;i++){
                        setFriend(friends[i]);
                    }
                });
            return this;
        }
    };

    var networkManager = new NetworkManager();
    networkManager.getFreinds();

});