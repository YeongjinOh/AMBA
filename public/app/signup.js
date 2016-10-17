/**
 * Created by JiSoo on 2016-09-29.
 */

var root = div().append().size('100%', '100%').color('#a8d7a9');

var form = div().appendTo(root).displayBlock().size(300, 300).position('relative').margin('auto')
    .top('45%').transform('translate(0%, -50%)').color('#a8d7a9');
div().appendTo(form).displayBlock().size(240, 60).margin('auto').color('#a8d7a9').text('AMBA').fontSize(50)
    .fontBold().fontColor('black').textAlignCenter().disableSelection().cursorDefault();

div().appendTo(form).displayBlock().size(270, 20).margin('auto').marginTop(20).color('#a8d7a9')
    .text('Name').fontSize(15).fontBold().fontColor('black').disableSelection().cursorDefault();
var username = div().appendTo(form).displayBlock().size(270, 30).margin('auto').marginTop(5).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize(20).cursorText();

div().appendTo(form).displayBlock().size(270, 20).margin('auto').marginTop(15).color('#a8d7a9')
    .text('Email').fontSize(15).fontBold().fontColor('black').disableSelection().cursorDefault();
var email = div().appendTo(form).displayBlock().size(270, 30).margin('auto').marginTop(5).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize(20).cursorText();

div().appendTo(form).displayBlock().size(270, 20).margin('auto').marginTop(15).color('#a8d7a9')
    .text('Password').fontSize(15).fontBold().fontColor('black').disableSelection().cursorDefault();
var password = div().appendTo(form).displayBlock().size(270, 30).margin('auto').marginTop(5).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().textPassword().fontSize(20).cursorText();

div().appendTo(form).displayBlock().size(270, 40).margin('auto').marginTop(30).color('green').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('Sign Up').textAlignCenter().fontSize(27).fontColor('black').fontBold().disableSelection().cursorPointer().hoverTextColor('white', 'black')
    .click( function () {
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

div().appendTo(form).displayBlock().size(60, 20).float('right').marginRight(15).marginTop(10).textAlignRight()
    .color('#a8d7a9').text('Sign In').fontSize(14).fontColor('black').fontBold().disableSelection().cursorPointer().hoverTextColor('white', 'black')
    .click( function () {
        $(location).attr('href', '/?app=signin');
});