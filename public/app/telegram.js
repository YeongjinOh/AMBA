/**
 * Created by Lightsoo on 2016. 10. 28..
 */

  requirejs(['OnlineManager'], function (online) {

    var addZeroIfNeeded = function (num) {
        num = parseInt(num);
        return num < 10 ? '0' + num : num;
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

    var Module ={};

    //Module.appendTo = function(target){

        var setCurrentView = function (v) {
            roomList.displayNone();
            freindList.displayNone();
            chatView.displayNone();
            v.displayBlock();
        };

        // var online = AB.module.OnlineManager;
        online.connect();

        var ainfo = JSON.parse(localStorage.getItem('ainfo'));
        var currentRoomid;
        var userList =[];

        //var parent = div().appendTo(target).size(300, 590);
        //var vParent = div().appendTo(target).size(300,590).displayNone()
        //    .position('absolute').left(0).top(0);

         var parent = div().append().size(300, 590);
          var vParent = div().append().size(300,590).displayNone()
          .position('absolute').left(0).top(0);

        var popupWrapper = div().appendTo(vParent).size(300, 398).color('white')
            .borderOption(1).borderOption('#EBE8E7', 'color');

        var popupHeader = div().appendTo(popupWrapper).size(300,50)
            .padding(6)
            .text('CHATTING ROOM').fontSize(27).fontColor('green').fontBold()
            .borderBottom('solid 2px').borderBottomColor('#EBE8E7');

        var popupContent = div().appendTo(popupWrapper).size(300,300).overflow('scroll');
        var popupBottom = div().appendTo(popupWrapper).size(300,48)
            .borderTop('solid 2px').borderTopColor('#EBE8E7')
            .padding(12);

        var popupBottomNext = div().appendTo(popupBottom).size('auto',23).floatRight()
            .hoverColor('#F4F6F6','transparent').cursorPointer()
            .text('NEXT').fontSize(20).marginRight(5).fontFamily('Meiryo')
            .click(function () {

                userList =[];
                for(var i=0;i<friendAdapter.length;i++){
                    if(friendAdapter[i].selected == true){
                        userList.push(friendAdapter[i].username)
                    }
                    friendAdapter[i].selected =false;
                }
                newRoomHeader.text(userList.reduce(function (memo, value) {
                    return memo + ', '+ value;
                }));
                if(userList.length !==0){
                    newRoomView.displayBlock();
                }
            });


        var popupBottomCancel = div().appendTo(popupBottom).size('auto',23).floatRight()
            .hoverColor('#F4F6F6','transparent').cursorPointer()
            .text('CANCEL').fontSize(20).fontFamily('Meiryo')
            .marginRight(15)
            .click(function () {
                console.log('calcel : ', friendAdapter);
                for(var i=0;i<friendAdapter.length;i++){
                    friendAdapter[i].selected =false;
                }
                userList = [];
                newRoomView.displayNone();
                vParent.displayNone();
            });


        var newRoomView = div().appendTo(vParent).size(300, 590).color('transparent').displayNone()
            .position('absolute').left(0).top(0);
        var newRoomWrapper = div().appendTo(newRoomView).size(300,222).color('white')
            .borderOption(1).borderOption('#99A3A4  ', 'color')
            .marginTop(160);

        var newRoomHeader = div().appendTo(newRoomWrapper).size(300,52)
            //.maxHeight(60)
            .padding(6).overflow('scroll').textOverflow('clip').whiteSpace('nowrap')
            .fontSize(27).fontColor('green')//.fontBold()
            .borderBottom('solid 2px').borderBottomColor('#99A3A4');

        var newRoomContent = div().appendTo(newRoomWrapper).size(300,120)
            .padding(20);

        var newRoomContentRoomName = div().appendTo(newRoomContent).size('100%','60%')
            .marginTop(20)
            .borderOption(1).borderOption('black', 'color')
            .text('').editable();


        var newRoomBottom = div().appendTo(newRoomWrapper).size(300,48)
            .borderTop('solid 2px').borderTopColor('#EBE8E7')
            .padding(12);


        var newRoomBottomOk = div().appendTo(newRoomBottom).size('auto',23).floatRight()
            .hoverColor('#F4F6F6','transparent').cursorPointer()
            .text('OK').fontSize(20).marginRight(5).fontFamily('Meiryo')
            .click(function () {
                if(userList.length!==0){
                    $.ajax({
                        url: '/online/rooms',
                        type: 'post',
                        dataType: "json",
                        data: {
                            //roomid: randomRoomid,
                            roomid: newRoomContentRoomName.text(),

                            userList : userList
                        },
                        success: function(msg){
                            roomList.empty();
                            networkManager.getRooms();
                            //TO Display
                            //currentRoomid = randomRoomid;
                            //online.join(randomRoomid);
                            currentRoomid = newRoomContentRoomName.text();
                            online.join(newRoomContentRoomName.text());
                            newRoomContentRoomName.text('');
                            chatListView.empty();
                            setCurrentView(chatView);
                            //
                            userList = [];
                            newRoomView.displayNone();
                            vParent.displayNone();
                        }
                    });
                }

            });

        var newRoomBottomCancel = div().appendTo(newRoomBottom).size('auto',23).floatRight()
            .hoverColor('#F4F6F6','transparent').cursorPointer()
            .text('CANCEL').fontSize(20).fontFamily('Meiryo')
            .marginRight(15)
            .click(function () {
                userList = [];
                newRoomView.displayNone();
                vParent.displayNone();
            });


        var sideView = div().appendTo(parent).size(300,590);
        var sideTop = div().appendTo(sideView).size(300, 50)
            .borderOption(1).borderOption('#EBE8E7', 'color')
            .color('white').displayBlock();
        var sideTop1 = div().appendTo(sideTop).size(248,50);
        var sideTop1Title = div().appendTo(sideTop1).size('100%','100%')
            .padding(1).marginLeft(3)
            .text('AMBATA').fontSize(33).fontColor('green').fontBold();

        var sideTop2 = div().appendTo(sideTop).size(50,50);
        var sideTop2Btn = div().appendTo(sideTop2).size('100%','100%')
            .padding(9).image('../images/write.png').cursorPointer()
            .hoverColor('#F4F6F6','transparent')
            .click(function () {
                vParent.displayBlock();
            });


        var listView = div().appendTo(sideView).size(300, 470).displayBlock();
        //.borderOption(1).borderOption('#EBE8E7', 'color');
        var freindList = div().appendTo(listView).size('100%','100%').overflow('scroll').displayBlock();
        var roomList = div().appendTo(listView).size('100%','100%').overflow('scroll').displayNone();
        var chatView = div().appendTo(listView).size('300','100%').displayNone();


        var sideBottom =div().appendTo(sideView).size(300,55).color('#EBE8E7');
        var sideBottom1 = div().appendTo(sideBottom).size(100,55)
            .hoverColor('#F4F6F6','transparent')
            .click(function () {
                setCurrentView(freindList);
            });
        var sideFreinds = div().appendTo(sideBottom1).size(55,55).displayBlock().margin('auto')
            .image('../images/profile.png').cursorPointer();
        var sideBottom2 = div().appendTo(sideBottom).size(100,55)
            .hoverColor('#F4F6F6','transparent').cursorPointer()
            .click(function () {
                setCurrentView(roomList);
            });
        var sideRooms = div().appendTo(sideBottom2).size(55,55).image('../images/chat.png').displayBlock().margin('auto');

        var sideBottom3 = div().appendTo(sideBottom).size(100,55)
            .hoverColor('#F4F6F6','transparent').cursorPointer()
            .click(function () {
                setCurrentView(chatView);
            });

        var currentRoom = div().appendTo(sideBottom3).size(55,55).image('../images/1chat.png').displayBlock().margin('auto');

        var chatListView = div().id('abc1').appendTo(chatView).size(300,420).overflow('scroll')
            .padding(3)
            .borderOption(1).borderOption('#EBE8E7', 'color').opacity(0.9)
            .linearGradient('0deg', '#148F77', '#76D7C4');

        var contentBottom1 = div().appendTo(chatView).size(250,50).color('#EBE8E7')
            .borderBottom('solid 1px').borderBottomColor('#99A3A4')
            .padding(10);

        var inputView = div().appendTo(contentBottom1).size('100%','100%').color('white')
            .editable(true).text('').overflow('scroll')
            .keypress(function(dv, e) {
                if (e.which == 13) {
                    $('#sendBtn').trigger('click');
                }
            });

        var contentBottom2 = div().appendTo(chatView).size(50,50).color('#EBE8E7')
            .padding(10)
            .borderBottom('solid 1px').borderBottomColor('#99A3A4')
            .hoverColor('#F4F6F6','#EBE8E7');
        var sendBtn = div().id('sendBtn').appendTo(contentBottom2).size('100%','100%')
            .image('../images/send.png').cursorPointer()
            .click(function () {
                var msg = inputView.text();
                if(msg !== '' && currentRoomid!==undefined) {
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
                            var myMsg = div().size('100%', 'auto').minHeight(38).marginTop(5);
                            var txt = div().appendTo(myMsg).size('auto', 'auto').text(msg).floatRight()
                                .marginRight(10).color('white').fontSize(15).maxWidth(200)
                                .borderOption(2).borderOption('#EBE8E7', 'color').borderRadius('10%')
                                .whiteSpace('pre-line').textAlign('left').wordBreak('break-all')
                                .fontFamily('Meiryo');
                            var myTime = div().appendTo(myMsg).size('auto', '13').floatRight()
                                .fontSize(11)
                                .text(getTime()).marginRight(5);
                            myMsg.appendTo(chatListView);
                            chatListView.setScrollTop();
                            inputView.text('');
                        });
                }
            });

        online.onRecieve(function (data) {
            console.log(data);
            var action = data.action;
            var message = data.message;
            if ('new' === action) {
                console.log(message.msg);
            }

            if ('broadcast_msg' == action) {
                    console.log('broadcast_msg : ',message);
                    var username = message.username;
                    var msg = message.msg;
                    var receivedMsg = div().size('100%', 'auto').minHeight(38).marginTop(5);

                    var profile = div().appendTo(receivedMsg).size(38, 38)
                        .borderOption(1).borderOption('#EBE8E7', 'color')
                        .borderRadius('50%')
                        .padding(6)
                        .image('../images/person.png').floatLeft();
                    var txtArea = div().appendTo(receivedMsg).size('auto', 'auto').marginLeft(4).floatLeft();

                    var name = div().appendTo(txtArea).size('auto', 'auto').text(username).displayBlock()
                        .fontSize(12).textAlign('left');

                    var txt = div().appendTo(txtArea).size('auto', 'auto').color('white').text(msg).maxWidth(200)
                        .borderOption(2).borderOption('#EBE8E7', 'color').borderRadius('10%')
                        .whiteSpace('pre-line').fontSize(15).textAlign('left').floatLeft().wordBreak('break-all')
                        .fontFamily('Meiryo');

                    var recievdTime = div().appendTo(receivedMsg).size('auto', '13').floatLeft()
                        .fontSize(11)
                        .text(getTime()).marginLeft(5);
                    receivedMsg.appendTo(chatListView);
                    chatListView.setScrollTop();
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
                    networkManager.loadMessage(currentRoomid);
                    setCurrentView(chatView);
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
                    }, function(results) {
                        //console.log('getRooms : ', results);
                        //array
                        var rooms = results.data.map(roomData);
                        for(var i=0;i<rooms.length;i++){
                            setRoom(rooms[i]);
                        }
                    });
                return this;
            };
            this.loadMessage = function (roomid) {
                 $.get('/online/history',{
                    roomid : roomid
                }, function (results) {
                    var msgs = results.data.map(msgData);
                    //console.log(msgs);
                    for(var i=msgs.length-1; i >= 0; i--){
                        setMsg(msgs[i]);
                    }
                });
                return this;
            };
        };

        var setMsg = function (msgData) {
            if(ainfo.username == msgData.writer){
                var message = msgData.message;
                var time = msgData.time;
                var myMsg = div().size('100%', 'auto').minHeight(38).marginTop(5);
                var txt = div().appendTo(myMsg).size('auto', 'auto').text(message).floatRight()
                    .marginRight(10).color('white').fontSize(15).maxWidth(200)
                    .borderOption(2).borderOption('#EBE8E7', 'color').borderRadius('10%')
                    .whiteSpace('pre-line').textAlign('left').wordBreak('break-all')
                    .fontFamily('Meiryo');
                var myTime = div().appendTo(myMsg).size('auto', '13').floatRight()
                    .fontSize(11)
                    .text(time).marginRight(5);
                myMsg.appendTo(chatListView);
            }else {
                var username = msgData.writer;
                var message = msgData.message;
                var time = msgData.time;
                var receivedMsg = div().size('100%', 'auto').minHeight(38).marginTop(5);

                var profile = div().appendTo(receivedMsg).size(38, 38)
                    .padding(6)
                    .borderOption(1).borderOption('#EBE8E7', 'color')
                    .borderRadius('50%')
                    .image('../images/person.png').floatLeft();
                var txtArea = div().appendTo(receivedMsg).size('auto', 'auto').marginLeft(4).floatLeft();

                var name = div().appendTo(txtArea).size('auto', 'auto').text(username).displayBlock()
                    .fontSize(12).textAlign('left');
                var txt = div().appendTo(txtArea).size('auto', 'auto').color('white').text(message).maxWidth(200)
                    .borderOption(2).borderOption('#EBE8E7', 'color').borderRadius('10%')
                    .whiteSpace('pre-line').fontSize(15).textAlign('left').floatLeft().wordBreak('break-all').fontFamily('Meiryo');

                var recievdTime = div().appendTo(receivedMsg).size('auto', '13').floatLeft().text(time).marginLeft(5)
                    .fontSize(11);
                receivedMsg.appendTo(chatListView);
            }
            chatListView.setScrollTop();
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
        //setCurrentView(chatView);
        //}

        //return Module;
});