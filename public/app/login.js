/**
 * Created by JiSoo on 2016-09-25.
 */

/* PostgreSQL Module */
var pg = require('pg');

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
 */

/* 기능 구현 */
var id = div().appendTo(midCenterMidCenterMid).size('94%', '20%').color('white').margin('2% 3% 2% 3%').isEditable(true)
    .borderRadius('5px').borderRadius('5px').textSize('2vw').text('ID').alignCenter().isTextNoSpace().isOverflowAuto()
    .hover( function (dv) {
        if(dv.text() === 'ID')
            dv.text('');
    }, function (dv) {
        if(dv.text() === '')
            dv.text('ID');
    });

// text *로 표현하기
var pw = div().appendTo(midCenterMidCenterMid).size('94%', '20%').color('white').margin('2% 3% 2% 3%').isEditable(true)
    .borderRadius('5px').borderRadius('5px').textSize('2vw').text('Password').alignCenter().isTextNoSpace().isOverflowAuto()
    .hover( function (dv) {
        if(dv.text() === 'Password')
            dv.text('');
    }, function (dv) {
        if(dv.text() === '')
            dv.text('Password');
    });

var signIn = div().appendTo(midCenterMidCenterMid).size('45%', '34%').color('yellow').margin('3% 2% 3% 3%')
    .borderRadius('5px').text('Sign-In').alignCenter().textSize('4vw').textCursorPointer().textDragNone()
    .hover(function(dv) {
        dv.color('blue');
    }, function(dv) {
        dv.color('yellow');
    })
    .click(function() {
        // click event - DB Insert
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query('CREATE TABLE test_table (id int not null);', function(err) {
                done();
                if (err) {
                    console.error(err);
                }
            });
        });
        alert('ID: ' + id.text() + '\nPW: ' + pw.text() + '\n로그인 인증');
    });

var signUp = div().appendTo(midCenterMidCenterMid).size('45%', '34%').color('green').margin('3% 3% 3% 2%')
    .borderRadius('5px').text('Sign-Up').alignCenter().textSize('4vw').textCursorPointer().textDragNone()
    .hover(function(dv) {
        dv.color('red');
    }, function(dv) {
        dv.color('green');
    })
    .click(function() {
        // click event - new page
        alert('회원가입 페이지로 이동');
    });