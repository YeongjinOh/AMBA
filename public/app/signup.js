/**
 * Created by JiSoo on 2016-09-29.
 */

var root = div().append().size('100%', '100%').color('#4c00e6');

var form = div().appendTo(root).displayBlock().size('300px', '300px').position('relative').margin('auto')
    .top('45%').transform('translate(0%, -50%)').color('#4c00e6');
div().appendTo(form).displayBlock().size('240px', '60px').margin('auto').color('#4c00e6').text('AMBA').fontSize('50px')
    .fontBold().fontColor('white').textAlignCenter().disableSelection().cursorDefault();

div().appendTo(form).displayBlock().size('270px', '20px').margin('auto').marginTop('20px').color('#4c00e6')
    .text('Name').fontSize('15px').fontColor('white').disableSelection().cursorDefault();
var username = div().appendTo(form).displayBlock().size('270px', '30px').margin('auto').marginTop('5px').color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize('20px').cursorText();

div().appendTo(form).displayBlock().size('270px', '20px').margin('auto').marginTop('15px').color('#4c00e6')
    .text('Email').fontSize('15px').fontColor('white').disableSelection().cursorDefault();
var email = div().appendTo(form).displayBlock().size('270px', '30px').margin('auto').marginTop('5px').color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize('20px').cursorText();

div().appendTo(form).displayBlock().size('270px', '20px').margin('auto').marginTop('15px').color('#4c00e6')
    .text('Password').fontSize('15px').fontColor('white').disableSelection().cursorDefault();
var password = div().appendTo(form).displayBlock().size('270px', '30px').margin('auto').marginTop('5px').color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().textPassword().fontSize('20px').cursorText();

div().appendTo(form).displayBlock().size('270px', '40px').margin('auto').marginTop('30px').color('#1a53ff').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('Sign Up').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    var regexS = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    var regex = new RegExp(regexS);

    if (!regex.exec(email.text()))
        alert('올바른 Email을 입력해주세요.');
    else {
        $.post('/users/regist', {username: username.text(), email: email.text(), password: password.text()})
            .done(function (data) {
                if (data.resultCode === 0) {
                    alert('success');
                    $(location).attr('href', '/?app=signin');
                } else
                    alert(data.msg);
            });
    }
});

div().appendTo(form).displayBlock().size('50px', '20px').float('right').marginRight('15px').marginTop('10px').textAlignRight()
    .color('#4c00e6').text('Sign In').fontSize('13px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    $(location).attr('href', '/?app=signin');
});