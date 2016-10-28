/**
 * Created by Lightsoo on 2016. 10. 28..
 */
requirejs(['online'], function (online) {

    //online.connect();

    var parent = div().append().size('auto', 'auto')
        .borderOption(1).borderOption('#EBE8E7', 'color');

    var teleHeader = div().appendTo(parent).size('auto','40').color('green').displayBlock()
    var headerTitle = div().appendTo(teleHeader).size('auto',40)
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .text('AMBATA').fontColor('white').fontSize(26);
    var headerFreinds = div().appendTo(teleHeader).size('auto',40)
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .text('친구목록').fontColor('white').fontSize(26);
    var headerRooms = div().appendTo(teleHeader).size('auto',40)
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .text('채팅방 목록').fontColor('white').fontSize(26);



    //방목록 or 친구목록을 보여준다.
    var listView = div().appendTo(parent).size(328,550)
        .borderOption(1).borderOption('#EBE8E7', 'color');

    //채팅 내용
    var contentView = div().appendTo(parent).size(500,550).overflow('scroll')
        .borderOption(1).borderOption('#EBE8E7', 'color');




});