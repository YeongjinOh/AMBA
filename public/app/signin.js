/**
 * Created by JiSoo on 2016-09-25.
 */

var root = div().append().size('100%', '100%').color('#a8d7a9');

var form = div().appendTo(root).displayBlock().size(300, 340).position('relative').margin('auto').top('50%')
    .transform('translate(0%, -50%)').color('#a8d7a9');
div().appendTo(form).displayBlock().size(240, 60).margin('auto').color('#a8d7a9').text('AMBA').fontSize(50)
    .fontBold().fontColor('black').textAlignCenter().disableSelection().cursorDefault();

div().appendTo(form).displayBlock().size(270, 20).margin('auto').marginTop(20).color('#a8d7a9').text('Email')
    .fontSize(15).fontBold().fontColor('black').disableSelection().cursorDefault();
var email = div().appendTo(form).displayBlock().size(270, 30).margin('auto').marginTop(5).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize(20).cursorText();

div().appendTo(form).displayBlock().size(270, 20).margin('auto').marginTop(15).color('#a8d7a9').text('Password')
    .fontSize(15).fontBold().fontColor('black').disableSelection().cursorDefault();
var password = div().appendTo(form).displayBlock().size(270, 30).margin('auto').marginTop(5).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().textPassword().fontSize(20).cursorText();

div().appendTo(form).displayBlock().size(270, 40).margin('auto').marginTop(30).color('green').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('Sign In').textAlignCenter().fontSize(27).fontColor('black').fontBold().disableSelection().cursorPointer().hoverTextColor('white', 'black')
    .click( function () {
        $.post("/users/login", { email: email.text(), password: password.text() })
            .done(function (data) {
                if( data.resultCode === 0) {
                    alert('signin success');
                    localStorage.setItem('aauth', data.aauth);
                    localStorage.setItem('ainfo', JSON.stringify(data.ainfo));
                    $(location).attr('href', '/?app=codelist');
                } else
                    alert(data.msg);
            });
});

div().appendTo(form).displayBlock().size(60, 20).float('right').marginRight(15).marginTop(10).textAlignRight()
    .color('#a8d7a9').text('Sign Up').fontSize(14).fontBold().fontColor('black').fontBold().disableSelection().cursorPointer().hoverTextColor('white', 'black')
    .click( function () {
        $(location).attr('href', '?app=signup');
});