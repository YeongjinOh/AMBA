//div().append().text('This is test application');

requirejs(['telegram'], function (tele) {

    var p = div().append()//.size('100%', '100%');
    tele.appendTo(p);

    //var teleWrapper = div().append().border('4px solid gray').position('absolute').draggable().resizable().top(80).left(30);
    //    tele.appendTo(teleWrapper);


//    var currentRoomid ;
//
//    var p = div().size(303, '100%').append().borderOption(1).borderOption('black', 'color');
//    var connect = div().size(100,100).color('green').borderOption(1).borderOption('black', 'color')
//        .appendTo(p)
//        .text('connect')
//        .click(function () {
//            online.connect();
//        });
//
//    var join = div().size(100,100).color('green').borderOption(1).borderOption('black', 'color')
//        .appendTo(p)
//        .text('join')
//        .click(function () {
//            currentRoomid = room.text();
//            online.join(currentRoomid);
//            room.text('');
//        });
//    var send = div().size(100,100).color('green').borderOption(1).borderOption('black', 'color')
//        .appendTo(p)
//        .text('send')
//        .click(function () {
//            online.userList(currentRoomid);
//
//            //online.sendMessage({
//            //    roomid: currentRoomid,
//            //    username: username.text(),
//            //    msg: msg.text()
//            //});
//
//        });
//
//    var username = div().size(100,100).borderOption(1).borderOption('black', 'color')
//        .appendTo(p).editable().text('');
//    var room = div().size(100,100).borderOption(1).borderOption('black', 'color')
//        .appendTo(p).editable().text('');
//    var msg =  div().size(100,100).borderOption(1).borderOption('black', 'color').appendTo(p)
//        .text('').editable();
});