/**
 * RequireJS takes a different approach to script loading than traditional <script> tags.
 * While it can also run fast and optimize well, the primary goal is to encourage modular code.
 * As part of that, it encourages using module IDs instead of URLs for script tags.
 * script 태그의 URL이 아니라 baseUrl을 통해서 모듈의 ID로딩해서 사용하는것을 권장한다.
 */


//requirejs(['bloglist','blogwriter'], function (bloglist, blogwriter) {



    //var pHeader = div().size('100%', 'auto').text('AMBA').fontSize(50).append()
    //    .borderBottom('10px solid green').fontColor('green');
    //
    //var bgDiv = div().size('100%','auto').append().color('white').textAlign('center').marginTop(10);
    //var pContent = div().size('100%','auto').append();
    //bloglist.appendTo(pContent);
    //
    //var btn_write = div().size('auto').appendTo(pHeader)
    //    .fontSize(50).fontColor('green').text('write').float('right')
    //    .click(function () {
    //        // var bgDiv = div().size('100%','100%').appendTo(pContent).color('white').textAlign('center');
    //        blogwriter.appendTo(bgDiv);
    //    });




//});


//require()이것도 된다.
//크롬에서는 렌더링이 잘 되는데, 사파리에서는 모듈이 늦게 불려진다..모듈 로딩 순서를 정의해줘야 되는듯 하다

//requirejs(['kakao'], function (kakao) {
//    console.log('kakao : \n', kakao);
//    var chat = div().size('auto','auto').append();
//    ////kakaotest모듈을 chat div에 붙인다
//    kakao.appendTo(chat);
//});


var topDiv = div().append().color('#B2BABB  ').size('640','auto').displayBlock();

//현재 클릭된 메모
var cntMemo;
var memoCount = 1;
//메모할 내용 추가하기
var addMemo = div().size(90,50).border(1).color('white').borderColor('black').text('메모장 추가').appendTo(topDiv).fontBold().fontSize(19)
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
var saveMemo = div().size(90,50).border(1).color('white').borderColor('black').text('메모장 저장').appendTo(topDiv).fontSize(19).fontBold()
    .click(function (e) {
        var text = memoContent.text();
        localStorage.setItem(cntMemo, text);
    }).hoverColor('#7F8C8D','transparent').cursorPointer();



//현재 클릭되어있는 메모장을 보여주고 저장하자.
var sideDiv = div().append().color('white').size(180,600).border(1).borderColor('black').text('나의 메모장')
    .fontBold().fontSize(33);

var momoList = div().append().color('white').size(200,600).border(1).borderColor('black').overflow('scroll');
var memoContent = div().append().color('white').size(260,600).border(1).borderColor('black');

 function random (max) {
    return parseInt(Math.random(max)*max);
}
