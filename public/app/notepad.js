var root = div().append().size('500','auto');
var topDiv = div().appendTo(root).color('#B2BABB').size('360','auto').displayBlock();

//현재 클릭된 메모
var cntMemo;
var memoCount = 1;
//메모할 내용 추가하기
var addMemo = div().size(90,50).border(1).color('white').borderColor('black').text('메모장 추가').appendTo(topDiv).fontBold().fontSize(19).color('#7F8C8D')
    .hoverColor('#7F8C8D','transparent').cursorPointer()
    .click(function () {
        memoContent.editable(true).color('#CCD1D1').text('메모하세요');
        var memo = div().appendTo(momoList).size(200, 80).border(1).borderColor('black').displayBlock().text(memoCount++ + '번째 MEMO').fontSize(19)
            .hoverColor('#7F8C8D','transparent').cursorPointer()
            .class('test' + random(500))
            .click(function () {
                //현재 메모의 클래스를 가져온다.
                cntMemo = memo.class();
                var txt = localStorage.getItem(cntMemo);
                memoContent.text(txt);
            });
        //.setClass('please')
        //random(500);
        //var contents = memoArea.text();
        //localstorage('momo1', contents);
    });

//메모장 저장하기
var saveMemo = div().size(90,50).border(1).color('white').borderColor('black').text('메모장 저장').appendTo(topDiv).fontSize(19).fontBold().color('#7F8C8D')
    .click(function (e) {
        var text = memoContent.text();
        localStorage.setItem(cntMemo, text);
    }).hoverColor('#7F8C8D','transparent').cursorPointer();



//현재 클릭되어있는 메모장을 보여주고 저장하자.
var sideDiv = div().appendTo(root).color('white').size(110,370).border(1).borderColor('black').text('나의 메모장')
    .fontBold().fontSize(23);
var momoList = div().appendTo(root).color('white').size(120,370).border(1).borderColor('black').overflow('scroll');

var memoContent = div().appendTo(root).color('white').size(130,400).border(1).borderColor('black')

 function random (max) {
    return parseInt(Math.random(max)*max);
}
