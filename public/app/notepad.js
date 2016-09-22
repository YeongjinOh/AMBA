/**
 * Created by Lightsoo on 2016. 9. 21..
 */
var topDiv = div().append().color('white').size('100%',80).border(1).borderColor('black').displayBlock();
//현재 클릭되어있는 메모장을 보여주고 저장하자.
var directorys = div().append().color('white').size(300,600).border(1).borderColor('black').text('나의 메모장');

var memo;
var momos = div().append().color('white').size(300,600).border(1).borderColor('black').overflow('scroll')
    .hover(function () {
        memo.color('blue')
    }, function () {
        memo.color('red')
    });

var memoArea = div().append().color('white').size(300,600).border(1).borderColor('black');



//메모할 내용 추가하기
var addMemo = div().size(60,50).border(1).color('white').borderColor('black').text('메모장 추가')
    .click(function (e) {

    memoArea.isEditable(true).color('gray').text('메모하세요');
    memo = div().appendTo(momos).size(300, 100).border(1).borderColor('black').color('red').displayBlock()
        //.setClass('please')
    //random(500);
    //var contents = memoArea.text();
    //localstorage('momo1', contents);

}).appendTo(topDiv)

//memo.click(function () {
//
//    var temp = localStorage.getItem();
//    memoArea.text()
//});

//메모장 저장하기
var saveMemo = div().size(50,50).border(1).color('white').borderColor('black').text('메모장 저장').click(function (e) {
    var text = memoArea.text();
    memo.text(text);
    localStorage.setItem('please1',text);
}).appendTo(topDiv)




var test = div().size(100,100).color('red').click(function (e) {

    //var temp = localStorage.getItem('test1');
    var class_name = memo.getClass();
    var temp = localStorage.getItem('please1');
    memoArea.text(temp);
}).appendTo(topDiv)

function random (max) {
    return parseInt(Math.random(max)*max);
}