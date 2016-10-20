/**
 * RequireJS takes a different approach to script loading than traditional <script> tags.
 * While it can also run fast and optimize well, the primary goal is to encourage modular code.
 * As part of that, it encourages using module IDs instead of URLs for script tags.
 * script 태그의 URL이 아니라 baseUrl을 통해서 모듈의 ID로딩해서 사용하는것을 권장한다.
 */

div().size('200','100').append().image('https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
    .borderOption(1).borderOption('black', 'color');

div().size('100', '100%').append().image('https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
    .borderOption(1).borderOption('black', 'color');

//div().size('200','10').append().image('https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
//    .borderOption(1).borderOption('black', 'color');


div().size('300','550').append().image('http://image14.hanatour.com/uploads/2011/06/ScreenHunter_1369.jpg')
    .borderOption(1).borderOption('black', 'color');

div().size('300','250').append().image('http://image14.hanatour.com/uploads/2011/06/ScreenHunter_1369.jpg')
    .borderOption(1).borderOption('black', 'color');





//requirejs(['http://127.0.0.1:3000/cachestore/get?cid=ida&key=src0'],
////requirejs(['test'],
////requirejs(['kakao'],
//    function (kakao) {
//    console.log('kakao : \n', kakao);
//    var chat = div().size('auto','auto').append();
//    //kakao모듈을 chat div에 붙인다
//    kakao.appendTo(chat);
//});

//require()이것도 된다.
//크롬에서는 렌더링이 잘 되는데, 사파리에서는 모듈이 늦게 불려진다..모듈 로딩 순서를 정의해줘야 되는듯 하다

//requirejs(['kakao'], function (kakao) {
//    console.log('kakao : \n', kakao);
//    var chat = div().size('auto','auto').append();
//    ////kakaotest모듈을 chat div에 붙인다
//    kakao.appendTo(chat);
//});


//
//
//var topDiv = div().append().color('white').size('100%',80).border(1).borderColor('black').displayBlock();
////현재 클릭되어있는 메모장을 보여주고 저장하자.
//var directors = div().append().color('white').size(200,600).border(1).borderColor('black').text('나의 메모장');
//
//var momos = div().append().color('white').size(300,600).border(1).borderColor('black').overflow('scroll');
//var memoArea = div().append().color('white').size(300,600).border(1).borderColor('black');
//
//var bottomDiv = div().append().color('white').size('100%',100).border(1).borderColor('black');
//
////현재 클릭된 메모
//var cntMemo;
//
////메모할 내용 추가하기
//var addMemo = div().size(100,50).border(1).color('white').borderColor('black').text('메모장 추가').appendTo(topDiv)
//    .click(function (div, e) {
//
//        memoArea.editable(true).color('gray').text('메모하세요');
//        var memo = div().appendTo(momos).size(300, 100).border(1).borderColor('black').color('red').displayBlock()
//            .setClass('test' + random(500))
//            .hover(function () {
//                memo.color('blue')
//            }, function () {
//                memo.color('red')
//            })
//            .click(function () {
//                //현재 메모의 클래스를 가져온다.
//                cntMemo = memo.getClass();
//                //bottomDiv.text(cntMemo);
//                var txt = localStorage.getItem(cntMemo);
//                memoArea.text(txt);
//            });
//        //.setClass('please')
//        //random(500);
//        //var contents = memoArea.text();
//        //localstorage('momo1', contents);
//    }).hoverColor('blue', 'red');
//
//    //.hover(function () {
//    //    addMemo.color('blue')
//    //}, function () {
//    //    addMemo.color('red')
//    //})
//
////메모장 저장하기
//var saveMemo = div().size(100,50).border(1).color('white').borderColor('black').text('메모장 저장')
//    .click(function (e) {
//        var text = memoArea.text();
//        //bottomDiv.text(cntMemo);
//        localStorage.setItem(cntMemo,text);
//
//    }).appendTo(topDiv)
//    .hover(function () {
//        saveMemo.color('blue')
//    }, function () {
//        saveMemo.color('red')
//    });
//
//function random (max) {
//    return parseInt(Math.random(max)*max);
//}
//
//function init(){
//
//}
//
//function setMemo(){
//
//}
//
//
///**
// * Created by Lightsoo on 2016. 9. 27..
// */
//
//
//
////var parent = div().append().size('100%','100%');
////width를 100%주면 display : block이 아니라 inline-block이라도 다음 박스가 밑으로 연결된다!
//var topDiv = div().append().size('100%','10%').color('red').text('상단'); //.displayBlock();
//var chatListView = div().append().size('100%','70%').overflow('scroll');
//
//var bottomFunc = div().append().size('100%', '5%').color('gray')
//var func1 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func2 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');
//var func3 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
//var func4 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');
//
//var bottomDiv = div().append().size('100%', '15%');
//var bottomDiv1 = div().appendTo(bottomDiv).size('80%', '100%').color('red');
////var inputDiv = div().appendTo(bottomDiv1).size('100%', '100%').color('red').padding(10);
//
//var bottomDiv2 = div().appendTo(bottomDiv).size('20%','100%').color('green')
//    .click(function () {
//
//        var chatView = div().size('100%', 'auto').color('green');
//        var profile = div().appendTo(chatView).size('100','100%').color('blue');
//        var txt = div().appendTo(chatView).size('500','100%').color('gray');
//
//        var name = div().appendTo(txt).size('100','30').color('red').text('김경수').displayBlock();
//        var msg = div().appendTo(txt).size('100','auto').text('12').whiteSpace('normal');
//        chatView.appendTo(chatListView);
//
//        //var chatView = div().appendTo(chatListView).size('100%', '80').color('blue')
//
//
//    });
