/**
 * Created by JiSoo on 2016-09-25.
 */

/* PostgreSQL Module */
// var pg = require('pg');

/* 전체 Layout Div 구성 */
var top = div().append().size('100%', '15%').color('red');
var mid = div().append().size('100%', '70%').color('green');
var midLeft = div().appendTo(mid).size('20%', '100%').color('black');
var midCenter = div().appendTo(mid).size('60%', '100%').color('lightblue');
var midRight = div().appendTo(mid).size('20%', '100%').color('yellow');
var midCenterTop = div().appendTo(midCenter).size('100%', '15%').color('blue');
var midCenterMid = div().appendTo(midCenter).size('100%', '70%').color('green');
var midCenterMidLeft = div().appendTo(midCenterMid).size('20%', '100%').color('gray');
var midCenterMidCenter = div().appendTo(midCenterMid).size('60%', '100%').color('violet');
var midCenterMidCenterTop = div().appendTo(midCenterMidCenter).size('100%', '15%').color('red');
var midCenterMidCenterMid = div().appendTo(midCenterMidCenter).size('100%', '70%').color('lightblue');
var midCenterMidCenterBottom = div().appendTo(midCenterMidCenter).size('100%', '15%').color('violet');
var midCenterMidRight = div().appendTo(midCenterMid).size('20%', '100%').color('white');
var midCenterBottom = div().appendTo(midCenter).size('100%', '15%').color('red');
var bottom = div().append().size('100%', '15%').color('blue');

/*
 ID, PW 찾기 기능 추가하기!
 ID, PW입력할 때, hover가 아닌 현재 커서 or 키보드 입력을 파악하는 이벤트가 필요하다.

 Input을 어떻게든 본따야하는데... 아......
 Div, Input은 동작이 다른 것 같음, Div는 focus, onfocus, blur, onblur등의 함수가 바로 동작함.
 */

/* 기능 구현 */
div().appendTo(midCenterMidCenterMid).size('8%', '20%').color('lightblue').margin('2% 3% 2% 5%').borderRadius('5px').textSize('3vw').text('ID').alignCenter();
var id = div().appendTo(midCenterMidCenterMid).size('77%', '20%').color('white').margin('2% 3% 2%').editable(true) // size('94%', '20%') margin('2% 3% 2% 3%') text('ID')
    .borderRadius('5px').textSize('3vw').alignCenter().whiteSpaceNowrap().overflowAuto();
    // .hover( function (dv) {
    //     if(dv.text() === 'ID')
    //         dv.text('');
    // }, function (dv) {
    //     if(dv.text() === '')
    //         dv.text('ID');
    // });

div().appendTo(midCenterMidCenterMid).size('10%', '20%').color('lightblue').margin('2% 3% 2% 3%').borderRadius('5px').textSize('3vw').text('PW ').alignCenter();
var pw = div().appendTo(midCenterMidCenterMid).size('77%', '20%').color('white').margin('2% 3% 2%').editable(true) // size('94%', '20%') margin('2% 3% 2% 3%') text('Password')
    .borderRadius('5px').textSize('3vw').alignCenter().whiteSpaceNowrap().overflowAuto().isTextPassword(true);
    // .hover( function (dv) {
    //     if(dv.text() === 'Password')
    //         dv.text('').isTextPassword(true);
    // }, function (dv) {
    //     if(dv.text() === '')
    //         dv.text('Password').isTextPassword(false);
    // });

var signIn = div().appendTo(midCenterMidCenterMid).size('45%', '34%').color('yellow').margin('3% 2% 3% 3%')
    .borderRadius('5px').text('Sign-In').alignCenter().textSize('4vw').textCursorPointer().textDragNone()
    .hoverColor('blue', 'yellow').click(function() {
        // click event - DB Insert
        // pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        //     client.query('CREATE TABLE test_table (id int not null);', function(err) {
        //         done();
        //         if (err) {
        //             console.error(err);
        //         }
        //     });
        // });
        alert('ID: ' + id.text() + '\nPW: ' + pw.text() + '\n로그인 인증과정 추가');
    });

var signUp = div().appendTo(midCenterMidCenterMid).size('45%', '34%').color('green').margin('3% 3% 3% 2%')
    .borderRadius('5px').text('Sign-Up').alignCenter().textSize('4vw').textCursorPointer().textDragNone()
    .hoverColor('red', 'green').click(function() {
        // click event - new page
        alert('회원가입 페이지로 이동');
    });