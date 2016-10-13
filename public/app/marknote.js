/**
 * Created by JiSoo on 2016-10-09.
 */

var root = div().append().size('100%', '100%');
var topDiv = div().appendTo(root).size('100%', 150).color('#4c00e6');

var bottomDiv = div().appendTo(root).size('100%', 943).color('#4c00e6');
var leftBottom = div().appendTo(bottomDiv).size('50%', '100%').color('#4c00e6');
var rightBottom = div().appendTo(bottomDiv).size('50%', '100%').color('#4c00e6');

var editView = div().appendTo(leftBottom).size('85%', 700).margin(80).color('white').borderRadius(20);
var resultView = div().appendTo(rightBottom).size('85%', 700).margin(80).color('white').borderRadius(20);

var result = div().appendTo(resultView).size('90%', '100%').marginLeft(10).color('white').borderRadius(20).fontSize(30);

div().appendTo(editView).aceEditor().size('100%', '100%').borderRadius(20).text('').editable().overflowAuto()
    .fontSize(30).cursorText().keyup(function (dv) {
    result.text(dv.text()).markdown();
});

div().appendTo(topDiv).displayBlock().size(200, 50).margin('auto').marginTop(50).color('#1a53ff').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('Markdown').textAlignCenter().fontSize('35px').fontColor('white').fontBold().disableSelection().cursorDefault();