//div().append().text('This is test application');





requirejs(['bloglist', 'blogwriter'], function (bloglist,blogwrite) {



    var pHeader = div().size('100%', 'auto').text('AMBA').fontSize(50).append()
        .borderBottom('10px solid green').fontColor('green');

    var bgDiv = div().size('100%','auto').append().color('white').textAlign('center').marginTop(10);
    var pContent = div().size('100%','auto').append();
    bloglist.appendTo(pContent);

    var btn_write = div().size('auto').appendTo(pHeader)
        .fontSize(50).fontColor('green').text('write').float('right')
        .click(function () {
            // var bgDiv = div().size('100%','100%').appendTo(pContent).color('white').textAlign('center');
            blogwrite.appendTo(bgDiv);
        });

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