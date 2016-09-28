/**
 * Created by JiSoo on 2016-09-25.
 */

var topDiv = div().append().size('100%', '10%').color('#D3D3D3');
div().appendTo(topDiv).size('10%', '100%').color('#D3D3D3').floatRight().text('sign-up').fontBold().fontSize('200%')
    .textAlignCenter().textDragNone().cursorPointer().lineHeight('500%').hover( function(dv) {
    dv.color('#A9A9A9');
    dv.fontColor('white');
}, function(dv) {
    dv.color('#D3D3D3');
    dv.fontColor('black');
}).click( function() {
    $(location).attr('href', 'http://soma-amba.herokuapp.com/?app=signup');
});

div().appendTo(topDiv).size('10%', '100%').color('#D3D3D3').floatRight().text('sign-in').fontBold().fontSize('200%')
    .fontColor('green').textAlignCenter().textDragNone().cursorDefault().lineHeight('500%');

div().appendTo(topDiv).size('60%', '100%').color('#D3D3D3').floatRight().text('AMBA').fontBold().fontSize('400%')
    .fontColor('blue').textAlignCenter().textDragNone().cursorDefault();

var midDiv = div().append().size('100%', '80%').color('#FFF0F5');
div().appendTo(midDiv).displayBlock().size('80%', '4%').marginTop('4%').marginLeft('10%').text('Username').fontBold().fontSize('175%').textDragNone();
var username = div().appendTo(midDiv).displayBlock().size('80%', '8%').marginTop('1%').marginLeft('10%').color('white')
    .borderRadius(5).editable().fontSize('200%').boxShadow('10px 10px 5px #888888').cursorText();

div().appendTo(midDiv).displayBlock().size('80%', '4%').marginTop('4%').marginLeft('10%').text('Password').fontBold().fontSize('175%').textDragNone();
var password = div().appendTo(midDiv).displayBlock().size('80%', '8%').marginTop('1%').marginLeft('10%').color('white')
    .borderRadius(5).editable().fontSize('200%').textPassword().boxShadow('10px 10px 5px #888888').cursorText();

div().appendTo(midDiv).displayBlock().size('80%', '8%').marginTop('4%').marginLeft('10%').color('green').borderRadius(5)
    .text('Sign In').fontBold().fontSize('200%').textDragNone().textAlignCenter().cursorPointer().lineHeight('400%').hover(function(dv) {
    dv.fontColor('white');
}, function(dv) {
    dv.fontColor('black');
}).click( function() {
    alert('Username: ' + username.text() + '\nPassword: ' + password.text());
    $.post("http://soma-amba.herokuapp.com/signin", { username: username.text(), password: password.text() })
        .done(function( data ) {
            localStorage.setItem('token', data);
        });
});

var bottomDiv = div().append().size('100%', '10%').color('#D3D3D3');