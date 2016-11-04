/**
 * Created by Lightsoo on 2016. 10. 28..
 */
requirejs(['OnlineManager'], function (online) {
    var randomRoomid = AB.random(9999);

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
            return hour + ":" + min + "am";
        } else {
            hour -= 12;
            return hour + ":" + min + "pm";
        }
    };

    //
    online.connect();
    //online.join('test');
    //online.close();

    var ainfo = JSON.parse(localStorage.getItem('ainfo'));
    var currentRoomid = 99;
    var riendAdapter = [];


    var parent = div().append().size('810', '590');
    var vParent = div().append().size('810','590').displayNone()
        .position('absolute').left(0).top(0);

    var popupWrapper = div().appendTo(vParent).size(330, 410).color('white')//.minHeight(400)
        .marginLeft(405-165).marginTop(parent.positionTop()+70)
        .borderOption(1).borderOption('#EBE8E7', 'color');

    var popupHeader = div().appendTo(popupWrapper).size(330,50)
        .padding(6)
        .text('채팅방 만들기').fontSize(27).fontColor('green').fontBold()
        .borderBottom('solid 2px').borderBottomColor('#EBE8E7');

    var popupContent = div().appendTo(popupWrapper).size(330,300).overflow('scroll');
    var popupBottom = div().appendTo(popupWrapper).size(330,60)
        .borderTop('solid 2px').borderTopColor('#EBE8E7')
        .padding(12);

    var popupBottomOk = div().appendTo(popupBottom).size('auto',35).floatRight()
        .hoverColor('#F4F6F6','transparent').cursorPointer()
        .text('확인').fontSize(24)
        .marginRight(5)
        .click(function () {
            console.log('ok : ', friendAdapter);
            var userList =[];
            for(var i=0;i<friendAdapter.length;i++){
                if(friendAdapter[i].selected == true){
                    userList.push(friendAdapter[i].username)
                }
                friendAdapter[i].selected =false;
            }

            $.ajax({
                url: '/online/rooms',
                type: 'post',
                dataType: "json",
                data: {
                    roomid: randomRoomid,
                    userList : userList
                },
                success: function(msg){
                    //$('.answer').html(msg);
                    networkManager.getRooms();
                }
            });
            vParent.displayNone();
        });

    var popupBottomCancel = div().appendTo(popupBottom).size('auto',35).floatRight()
        .hoverColor('#F4F6F6','transparent').cursorPointer()
        .text('취소').fontSize(24)
        .marginRight(15)
        .click(function () {
            console.log('calcel : ', friendAdapter);
            for(var i=0;i<friendAdapter.length;i++){
                friendAdapter[i].selected =false;
            }
            vParent.displayNone();
        });

    var sideView = div().appendTo(parent).size(300,590)
        .borderOption(1).borderOption('#EBE8E7', 'color');

    var sideTop = div().appendTo(sideView).size(300, 50)
        //.borderOption(1).borderOption('#EBE8E7', 'color')
        .color('white').displayBlock();
    var sideTop1 = div().appendTo(sideTop).size(250,50);
    var sideTop1Title = div().appendTo(sideTop1).size('100%','100%')
        .padding(6)
        .text('AMBATA').fontSize(33).fontColor('green').fontBold();

    var sideTop2 = div().appendTo(sideTop).size(50,50);
    var sideTop2Btn = div().appendTo(sideTop2).size('100%','100%')
        .padding(9).image('../images/write.png').cursorPointer()
        .hoverColor('#F4F6F6','transparent')
        .click(function () {
            //console.log(friendAdapter);


            //for(var i=0;i<friendAdapter.length;i++){
            //    setFriend(friendAdapter[i], popupContent);
            //}

            vParent.displayBlock();
        });

    var listView = div().appendTo(sideView).size(300, 470)//.overflow('scroll')
        .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();

    var freindList = div().appendTo(listView).size('100%','100%').overflow('scroll').displayBlock();
    var roomList = div().appendTo(listView).size('100%','100%').overflow('scroll').displayNone();

    var sideBottom =div().appendTo(sideView).size(300,70).color('#EBE8E7')
        .margin('auto');

    var sideFreinds = div().appendTo(sideBottom).size(150,70)
        .image('../images/profile.png')
        //.borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2).cursorPointer()
        .hoverColor('#F4F6F6','transparent')
        .click(function () {
            freindList.displayBlock();
            roomList.displayNone();
        });

    var sideRooms = div().appendTo(sideBottom).size(150,70).image('../images/chat.png')
        //.borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .hoverColor('#F4F6F6','transparent').cursorPointer()
        .click(function () {
            roomList.displayBlock();
            freindList.displayNone();
        });

    var contentView = div().appendTo(parent).size(508,590);


    var chatListView = div().appendTo(contentView).size(508,520).overflow('scroll')
        .padding(3)
        .borderOption(1).borderOption('#EBE8E7', 'color')
        .color('white');

    var contentBottom1 = div().appendTo(contentView).size(438,70).color('#EBE8E7')
        .borderLeft('solid 2px').borderLeftColor('##D6DBDF')
        .padding(10);

    var inputView = div().appendTo(contentBottom1).size('100%','100%').color('white')
        .editable(true).text('').overflow('scroll')
        .keypress(function(dv, e) {
            if (e.which == 13) {
                $('#sendBtn').trigger('click');
            }
        });

    var contentBottom2 = div().appendTo(contentView).size(70,70).color('#EBE8E7')
        .padding(10)
        .hoverColor('#F4F6F6','#EBE8E7');
    var sendBtn = div().id('sendBtn').appendTo(contentBottom2).size('100%','100%')
        .image('../images/send.png').cursorPointer()
        .click(function () {
            var msg = inputView.text();
            if(msg !== '') {
                online.sendMessage({
                    roomid: currentRoomid,
                    username: ainfo.username,
                    msg: msg
                });

                $.post("/online/msg",
                    {
                        roomid : currentRoomid,
                        username :  ainfo.username,
                        time : getTime(),
                        message : msg
                    }, function (result) {
                        var myMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
                        var txt = div().appendTo(myMsg).size('auto', 'auto').text(msg).floatRight()
                            // .marginRight(10).color('#ffff4d').fontSize(25).maxWidth(300)
                            // .borderOption(4).borderOption('#ffff4d', 'color').borderRadius('10%')
                            .marginRight(10).color('white').fontSize(23).maxWidth(300)
                            .borderOption(4).borderOption('#EBE8E7', 'color').borderRadius('10%')

                            .whiteSpace('pre-line').textAlign('left').wordBreak('break-all');
                        var myTime = div().appendTo(myMsg).size('auto', '15').floatRight()
                            .text(getTime()).marginRight(5);
                        myMsg.appendTo(chatListView);
                        inputView.text('');
                    });
            }
        });

    online.onRecieve(function (data) {
        var action = data.action;
        var message = data.message;
        if ('new' === action) {
            console.log(message.msg);
        }

        if ('broadcast_msg' == action) {
            if(currentRoomid == message.roomid) {
                console.log(message);
                var username = message.username;
                var msg = message.msg;
                var receivedMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);

                var profile = div().appendTo(receivedMsg).size('68', '68')
                    .borderOption(1).borderOption('#EBE8E7', 'color')
                    .borderRadius('50%')
                    .padding(6)
                    .image('../images/person.png').floatLeft();
                    //.color('blue').borderRadius('50%')
                var txtArea = div().appendTo(receivedMsg).size('auto', 'auto').marginLeft(4).floatLeft();

                var name = div().appendTo(txtArea).size('auto', 'auto').text(username).displayBlock()
                    .fontSize(18).textAlign('left');
                var txt = div().appendTo(txtArea).size('auto', 'auto').color('white').text(msg).maxWidth(300)
                    .borderOption(4).borderOption('#EBE8E7', 'color').borderRadius('10%')
                    .whiteSpace('pre-line').fontSize(23).textAlign('left').floatLeft().wordBreak('break-all');
                var recievdTime = div().appendTo(receivedMsg).size('auto', '15').floatLeft().text(getTime()).marginLeft(5);
                receivedMsg.appendTo(chatListView);
            }
        }
    });

    //for listView
    //using div.deco()
    var friendView = function (dv) {
        dv.size('100%','50').color('white')
            .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();
    };

    var setFriend = function (friendData, targetList) {
        friendData.selected = false;
        var friend = div().appendTo(targetList).deco(friendView);
        var profileWrapper = div().appendTo(friend).size(50, 50)
            .borderOption(1).borderOption('#EBE8E7', 'color')
            .borderRadius('50%')
            .padding(5);
        var profile = div().appendTo(profileWrapper).size('100%','100%')
            .image('../images/person.png');
            //.color('green');
        var name = div().appendTo(friend)
            .text(friendData.username);
        //console.log('targetList : ', friend.selected);
        if(targetList === freindList){
            friend.hoverColor('#D5DBDB','white');
        }else if(targetList === popupContent){
            var onClickFried = function () {
                friendData.selected =! friendData.selected;
                if(friendData.selected)
                    friend.color('#95A5A6');
            };
            var onHover = function () {
                if(friendData.selected)
                    friend.color('#95A5A6');
                else
                    friend.color('#D5DBDB')
            };
            var offHover = function () {
                if(friendData.selected)
                    friend.color('#95A5A6');
                else
                    friend.color('white')
            };
            friend.hover(onHover, offHover).click(onClickFried);
        }
    };

    //data
    var friendData = function (obj) {
        return {
            email : obj.email,
            username : obj.username
        }
    };

    var roomView = function (dv) {
        dv.size('100%','50').color('white')
            .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();
    };

    var setRoom = function (roomData) {
        roomData.selected = false;
        var room = div().appendTo(roomList).deco(roomView);
        var profileWrapper = div().appendTo(room).size(50, 50).padding(3);
        var profile = div().appendTo(profileWrapper).size('100%','100%')
            .image('../images/rooms.png')
        //.color('red');
        var roomid = div().appendTo(room)
            .text(roomData.roomid);

        var onHover = function () {
            if(roomData.selected)
                room.color('#95A5A6');
            else
                room.color('#D5DBDB')
        };
        var offHover = function () {
            if(roomData.selected)
                room.color('#95A5A6');
            else
                room.color('white')
        };

        room.hover(onHover, offHover)
            .dblclick(function () {
                chatListView.empty();
                currentRoomid = roomData.roomid;
                online.join(roomData.roomid);
                networkManager.getMsg(currentRoomid);
            });
    };

    //data
    var roomData = function (value) {
        return {
            roomid : value
        }
    };

    var NetworkManager = function () {
        this.getFreinds = function () {
            $.get('/users',{/*query*/}
                , function(results) {
                    //array
                    friendAdapter = results.data.map(friendData);
                    for(var i=0;i<friendAdapter.length;i++){
                        setFriend(friendAdapter[i], freindList);
                        setFriend(friendAdapter[i], popupContent);
                    }
                });
            return this;
        };
        this.getRooms = function () {
            $.get('/online/rooms',{
                    username : ainfo.username
                }
                , function(results) {
                    //console.log('getRooms : ', results);
                    //array
                    var rooms = results.data.map(roomData);
                    for(var i=0;i<rooms.length;i++){
                        setRoom(rooms[i]);
                    }
                });
            return this;
        };
        this.getMsg = function (roomid) {
            $.get('/online/msg',{
                roomid : roomid
            }, function (results) {
                //console.log('getMsg : ', results);
                var msgs = results.data.map(msgData);
                console.log(msgs);
                for(var i=msgs.length-1; i >= 0; i--){
                    setMsg(msgs[i]);
                }
            });
            return this;
        };
    };

    var setMsg = function (msgData) {
        //console.log(msgData.writer);
        //내가 보낸 메시지인 경우
       if(ainfo.username == msgData.writer){
           var message = msgData.message;
           var time = msgData.time;
           var myMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);
           var txt = div().appendTo(myMsg).size('auto', 'auto').text(message).floatRight()
               .marginRight(10).color('white').fontSize(23).maxWidth(300)
               .borderOption(4).borderOption('#EBE8E7', 'color').borderRadius('10%')

               .whiteSpace('pre-line').textAlign('left').wordBreak('break-all');
           var myTime = div().appendTo(myMsg).size('auto', '15').floatRight()
               .text(time).marginRight(5);
           myMsg.appendTo(chatListView);
       }else {
           var username = msgData.writer;
           var message = msgData.message;
           var time = msgData.time;
           var receivedMsg = div().size('100%', 'auto').minHeight(60).marginTop(5);

           var profile = div().appendTo(receivedMsg).size('60', '60')
               .padding(6)
               .borderOption(1).borderOption('#EBE8E7', 'color')
               .borderRadius('50%')
               .image('../images/person.png').floatLeft();
               //.color('blue').borderRadius('50%').floatLeft();
           var txtArea = div().appendTo(receivedMsg).size('auto', 'auto').marginLeft(4).floatLeft();

           var name = div().appendTo(txtArea).size('auto', 'auto').text(username).displayBlock()
               .fontSize(18).textAlign('left');
           var txt = div().appendTo(txtArea).size('auto', 'auto').color('white').text(message).maxWidth(300)
               .borderOption(4).borderOption('#EBE8E7', 'color').borderRadius('10%')
               .whiteSpace('pre-line').fontSize(23).textAlign('left').floatLeft().wordBreak('break-all');

           var recievdTime = div().appendTo(receivedMsg).size('auto', '15').floatLeft().text(time).marginLeft(5);
           receivedMsg.appendTo(chatListView);
       }
    };

    //data
    var msgData = function (obj) {
        var temp = JSON.parse(obj);
        return {
            writer : temp.writer,
            time : temp.time,
            message :temp.message
        }
    };

    var networkManager = new NetworkManager();
    networkManager.getFreinds();
    networkManager.getRooms();
    //networkManager.getMsg(11);
});