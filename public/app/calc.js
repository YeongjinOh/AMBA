/**
 * Created by JiSoo on 2016-09-21.
 */

// var root = div().size('100%', '100%').color('red').text('root').append();
var root = div().size('100%', '100%').color('red').append();

var calc = div().size('80%', '100%').color('blue').paddingLeft(20).appendTo(root);
// var history = div().size('20%', '100%').color('yellow').text('history').appendTo(root);
var history = div().size('18%', '100%').color('yellow').appendTo(root);

var status = div().border(10).displayBlock().size('90%', '20%').color('red').appendTo(calc);//.margin('9% 5% 0% 5%')
var subStatus = div().displayBlock().size('100%', '20%').color('yellow').appendTo(status);
var mainStatus = div().displayBlock().size('100%', '80%').color('green').appendTo(status);

//var input = div().displayBlock().size('90%', '60%').margin('0% 5% 9% 5%').color('purple').appendTo(calc);
var input = div().size('90%', '60%').color('#D3D3D3').appendTo(calc);//.margin('0% 5% 9% 5%')

// var row_1 = div().display('table').size('100%', '20%').color('#D3D3D3').appendTo(input);
// var per = div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_1).hover(function() {
// 	per.color('#A9A9A9'); // for문으로 중복문제 해결하기!
// },
// function() {
// 	per.color('#D3D3D3');
// }).click(function(e) { // mainStatus에 숫자를 set
// });
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_1);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_1);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_1);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_1);
//
// var row_2 = div().display('table').size('100%', '20%').color('#D3D3D3').appendTo(input);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_2);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_2);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_2);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_2);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_2);
//
// var row_3 = div().display('table').size('100%', '20%').color('#D3D3D3').appendTo(input);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_3);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_3);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_3);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_3);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_3);
//
// var row_4 = div().display('table').size('100%', '20%').color('#D3D3D3').appendTo(input);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_4);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_4);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_4);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_4);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_4);
//
// var row_5 = div().display('table').size('100%', '20%').color('#D3D3D3').appendTo(input);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_5);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_5);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_5);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_5);
// div().display('table-cell').size('20%', '20%').color('#D3D3D3').appendTo(row_5);

//div().size('20%', '20%').color('lightblue').float('left').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);
// div().size('20%', '20%').color('#D3D3D3').appendTo(input);
// div().size('20%', '20%').color('black').appendTo(input);