/**
 * Created by JiSoo on 2016-09-25.
 */

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


/* 기능 구현 */

// ID 화면 만들기
var id = div().appendTo(midCenterMidCenterMid).margin('10px').size('10%', '20%').color('white').isEditable(true);

// PW 구현하기
var pw = div().appendTo(midCenterMidCenterMid).size('100%', '30%').color('black').isEditable(true);

// Click Event를 이용해서 눌렀을 때, Text를 전송하게 만든다.
var signIn = div().appendTo(midCenterMidCenterMid).size('50%', '40%').color('gray').text('Sign-In').alignCenter().textSize('4vw');

// signUp View로 넘긴다.
var signUp = div().appendTo(midCenterMidCenterMid).size('50%', '40%').color('lightblue').text('Sing-Up').alignCenter().textSize('4vw');;