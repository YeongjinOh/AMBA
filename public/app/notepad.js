/**
 * Created by Lightsoo on 2016. 9. 21..
 */
var top = div().append().color('white').size('100%',80).border(1).borderColor('black').displayBlock();

//현재 클릭되어있는 메모장을 보여주고 저장하자.
var directorys = div().append().color('white').size(300,600).border(1).borderColor('black').text('나의 메모장');
var momos = div().append().color('white').size(300,600).border(1).borderColor('black').overflow('scroll');
var momo = div().append().color('white').size(300,600).border(1).borderColor('black');

//메모할 내용 추가하기
//var addMemo = div().appendTo(top).size(50,50).border(1).color('white').borderColor('black').text('메모장 추가').overflow('auto').click(function (e) {
//    div().appendTo(momos).size(300, 100).border(1).borderColor('black').color('red').displayBlock();
//})

//var saveMemo = div().appendTo(top).size(50,50).border(1).color('white').borderColor('black').text('메모장 저장').overflow('auto').click(function (e) {
    localStorage.setItem('','');
//})
