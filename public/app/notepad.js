/**
 * Created by Lightsoo on 2016. 9. 21..
 */
var topDiv = div().append().color('white').size('100%',80).border(1).borderColor('black').displayBlock();

//현재 클릭되어있는 메모장을 보여주고 저장하자.
var directorys = div().append().color('white').size(300,600).border(1).borderColor('black').text('나의 메모장');
var momos = div().append().color('white').size(300,600).border(1).borderColor('black').overflow('scroll');

var memoArea = div().append().color('white').size(300,600).border(1).borderColor('black');

//var momoArea = div().append().color('white').size(300,600).border(1).borderColor('black').isEditable(true);

var memo;

//메모할 내용 추가하기
var addMemo = div().size(60,50).border(1).color('white').borderColor('black').text('메모장 추가1').click(function (e) {

    memoArea.isEditable(true).color('gray');
    memo = div().appendTo(momos).size(300, 100).border(1).borderColor('black').color('red').displayBlock();
    //var contents = memoArea.text();
    //localstorage('momo1', contents);

}).appendTo(topDiv)

//메모장 저장하기
var saveMemo = div().size(50,50).border(1).color('white').borderColor('black').text('메모장 저장2').click(function (e) {
    var text = memoArea.text();
    memo.text(text);

    localStorage.setItem('test1',text);
}).appendTo(topDiv)

var test = div().size(100,100).color('red').click(function (e) {

    var temp = localStorage.getItem('test1');

    memoArea.text(temp);
}).appendTo(topDiv)


