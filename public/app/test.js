//div().append().text('This is test application');


/**
 * AB -> AB
 * AC
 */
function solution(arr){
    arr.split('AB').join('BA');
    arr.split('AA').join('A');
    //return arr.split('CC').join('C').split('AB').join('BA').split('AA').join('A');
    console.log(arr.split('CC').join('C').split('AB').join('BA').split('AA').join('A'));
    console.log(arr.split('CC').join('C').split('AA').join('A').split('AB').join('BA'));

    //return arr.split('CC').join('C').split('AA').join('A').split('AB').join('BA');
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}





requirejs(['telegram'], function (tele) {

    //var test = "DAABCCAA";
    //console.log(test);
    //console.log(solution(test));
    /*while(true){
        console.log(solution(test));
    }*/


    var p = div().append();//.size('100%', '100%');
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