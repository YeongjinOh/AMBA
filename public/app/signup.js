/**
 * Created by JiSoo on 2016-09-29.
 */

var topDiv = div().append().size('100%', '22%').color('#4c00e6');

var midDiv = div().append().size('100%', '50%').color('#4c00e6');
div().appendTo(midDiv).size('100%', '20%').color('#4c00e6').text('AMBA').fontSize('400%').fontBold()
    .fontColor('white').textAlignCenter().textDragNone().cursorDefault();
div().appendTo(midDiv).displayBlock().size('20%', '1%').marginLeft('40%').color('#4c00e6').text('Username').fontSize('75%').fontColor('white').textDragNone().cursorDefault();
var username = div().appendTo(midDiv).displayBlock().size('20%', '10%').marginTop('20px').marginLeft('40%').color('white').borderRadius(5).boxShadow('5px 5px 5px black').editable().fontSize('200%').cursorText();

div().appendTo(midDiv).displayBlock().size('20%', '1%').marginTop('10px').marginLeft('40%').color('#4c00e6').text('Password').fontSize('75%').fontColor('white').textDragNone().cursorDefault();
var password = div().appendTo(midDiv).displayBlock().size('20%', '10%').marginTop('20px').marginLeft('40%').color('white').borderRadius(5).boxShadow('5px 5px 5px black').editable().textPassword().fontSize('200%').cursorText();

div().appendTo(midDiv).displayBlock().size('20%', '10%').marginTop('20px').marginLeft('40%').color('#1a53ff').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('Sign Up').textAlignCenter().fontSize('200%').fontColor('white').fontBold().textDragNone().cursorPointer().hover( function(dv) {
    dv.fontColor('black');
}, function(dv) {
    dv.fontColor('white');
}).click( function() {
    $.post("http://soma-amba.herokuapp.com/users", { username: username.text(), password: password.text() })
        .done( function(data) {
            if (data.type === true) {
                alert('signup success!!');
                $(location).attr('href', 'http://soma-amba.herokuapp.com/?app=signin');
            }
            else
                alert('username duplication!!');
        });
});

div().appendTo(midDiv).size('56%', '2%').marginTop('25px').color('#4c00e6').text('go').fontSize('75%')
    .fontColor('white').textAlignRight().textDragNone().cursorDefault();
div().appendTo(midDiv).size('40%', '2%').marginTop('25px').marginLeft('5px').color('#4c00e6').text('Sign In').fontSize('75%')
    .fontBold().fontColor('white').textAlignLeft().textDragNone().cursorPointer().hover( function(dv) {
    dv.fontColor('black');
}, function(dv) {
    dv.fontColor('white');
}).click( function() {
    $(location).attr('href', 'http://soma-amba.herokuapp.com/?app=signin');
});

var bottomDiv = div().append().size('100%', '28%').color('#4c00e6');

// var topDiv = div().append().size('100%', '10%').color('#D3D3D3');
// div().appendTo(topDiv).size('10%', '100%').color('#D3D3D3').floatRight().text('sign-up').fontBold().fontSize('200%')
//     .fontColor('green').textAlignCenter().textDragNone().cursorDefault().lineHeight('500%');
//
// div().appendTo(topDiv).size('10%', '100%').color('#D3D3D3').floatRight().text('sign-in').fontBold().fontSize('200%')
//     .textAlignCenter().textDragNone().cursorPointer().lineHeight('500%').hover( function(dv) {
//     dv.color('#A9A9A9');
//     dv.fontColor('white');
// }, function(dv) {
//     dv.color('#D3D3D3');
//     dv.fontColor('black');
// }).click( function() {
//     $(location).attr('href', 'http://soma-amba.herokuapp.com/?app=signin');
// });
//
// div().appendTo(topDiv).size('60%', '100%').color('#D3D3D3').floatRight().text('AMBA').fontBold().fontSize('400%')
//     .fontColor('blue').textAlignCenter().textDragNone().cursorDefault();
//
// var midDiv = div().append().size('100%', '80%').color('#FFF0F5');
// div().appendTo(midDiv).displayBlock().size('80%', '4%').marginTop('4%').marginLeft('10%').text('Username')
//     .fontBold().fontSize('175%').textDragNone().cursorDefault();
// var username = div().appendTo(midDiv).displayBlock().size('80%', '8%').marginTop('1%').marginLeft('10%').color('white')
//     .borderRadius(5).editable().fontSize('200%').boxShadow('10px 10px 5px #888888').cursorText();
//
// div().appendTo(midDiv).displayBlock().size('80%', '4%').marginTop('4%').marginLeft('10%').text('Password')
//     .fontBold().fontSize('175%').textDragNone().cursorDefault();
// var password = div().appendTo(midDiv).displayBlock().size('80%', '8%').marginTop('1%').marginLeft('10%').color('white')
//     .borderRadius(5).editable().fontSize('200%').textPassword().boxShadow('10px 10px 5px #888888').cursorText();
//
// div().appendTo(midDiv).displayBlock().size('80%', '8%').marginTop('4%').marginLeft('10%').color('green').borderRadius(5)
//     .text('Sign Up').fontBold().fontSize('200%').textDragNone().textAlignCenter().cursorPointer().lineHeight('400%').hover(function(dv) {
//     dv.fontColor('white');
// }, function(dv) {
//     dv.fontColor('black');
// }).click( function() {
//     // $.post("http://soma-amba.herokuapp.com/users", { username: username.text(), password: password.text() })
//     //     .done( function(data) {
//     //         if (data.type === true) {
//     //             $.post("http://soma-amba.herokuapp.com/session", { username: username.text(), password: password.text() })
//     //                 .done( function(data) {
//     //                     localStorage.setItem('token', data);
//     //                     alert('signup success!!');
//     //                     $(location).attr('href', 'http://soma-amba.herokuapp.com/?app=signin');
//     //                 });
//     //         } else
//     //             alert('username duplication!!');
//     //     });
//     $.post("http://soma-amba.herokuapp.com/users", { username: username.text(), password: password.text() })
//         .done( function(data) {
//             if (data.type === true) {
//                 alert('signup success!!');
//                 $(location).attr('href', 'http://soma-amba.herokuapp.com/?app=signin');
//             }
//             else
//                 alert('username duplication!!');
//         });
// });
//
//
// var bottomDiv = div().append().size('100%', '10%').color('#D3D3D3');