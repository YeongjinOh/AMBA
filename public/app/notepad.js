/**
 * Created by Lights on 2016. 9. 21..
 */

/**
 * 추가해야될것
 * 1. 마우스 우클릭 적용
 * 2. 폴더들 리스트화
 * 3. 메모들에 타이틀 적용(var memo에서 특정 디브를 찾아서 적용)
 */
var topDiv = div().append().color('white').size('100%',80).border(1).borderColor('black').displayBlock();
//현재 클릭되어있는 메모장을 보여주고 저장하자.
var directors = div().append().color('white').size(200,600).border(1).borderColor('black').text('나의 메모장');

var momos = div().append().color('white').size(300,600).border(1).borderColor('black').overflow('scroll');
var memoArea = div().append().color('white').size(300,600).border(1).borderColor('black');

var bottomDiv = div().append().color('white').size('100%',100).border(1).borderColor('black');

//현재 클릭된 메모
var cntMemo;

//메모할 내용 추가하기
var addMemo = div().size(100,50).border(1).color('white').borderColor('black').text('메모장 추가').appendTo(topDiv)
    .click(function (div, e) {

        memoArea.isEditable(true).color('gray').text('메모하세요');
        var memo = div().appendTo(momos).size(300, 100).border(1).borderColor('black').color('red').displayBlock()
            .setClass('test' + random(500))
            .hover(function () {
                memo.color('blue')
            }, function () {
                memo.color('red')
            })
            .click(function () {
                //현재 메모의 클래스를 가져온다.
                cntMemo = memo.getClass();
                //bottomDiv.text(cntMemo);
                var txt = localStorage.getItem(cntMemo);
                memoArea.text(txt);
            });
        //.setClass('please')
        //random(500);
        //var contents = memoArea.text();
        //localstorage('momo1', contents);
    }).hoverColor('blue', 'red');

    //.hover(function () {
    //    addMemo.color('blue')
    //}, function () {
    //    addMemo.color('red')
    //})

//메모장 저장하기
var saveMemo = div().size(100,50).border(1).color('white').borderColor('black').text('메모장 저장')
    .click(function (e) {
        var text = memoArea.text();
        //bottomDiv.text(cntMemo);
        localStorage.setItem(cntMemo,text);

    }).appendTo(topDiv)
    .hover(function () {
        saveMemo.color('blue')
    }, function () {
        saveMemo.color('red')
    });

function random (max) {
    return parseInt(Math.random(max)*max);
}

function init(){

}

function setMemo(){

}