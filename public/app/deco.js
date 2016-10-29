/**
 * Created by JiSoo on 2016-10-29.
 */

var dv = undefined; //
var target = undefined; //

//define([], function() {

// var Module = {};

var values = {

};

var root = div().append().size(200, 170).color('red').borderRadius(10).boxShadow('5px 5px 5px black');

var form = div().appendTo(root).size('100%', '100%').color('green').borderRadius(10).boxShadow('5px 5px 5px black');

div().appendTo(form).displayBlock().floatRight().marginTop(5).marginRight(10).size(10, 10).text('X').fontBold();

div().appendTo(form).displayBlock().size('80%', 30).margin('auto').marginTop(30).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('Editable').textAlignCenter().fontBold().fontSize(20).cursorPointer().click(function(dv) {
        if (dv.pred === undefined)
            dv.pred = true;
        else
            dv.pred = !dv.pred;

        $('#' + target).editable(dv.pred);
        values.editable = dv.pred;
    });

div().appendTo(form).displayBlock().size('80%', 30).margin('auto').marginTop(30).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('Editable').textAlignCenter().fontBold().fontSize(20).cursorPointer().click(function(dv) {
    if (dv.pred === undefined)
        dv.pred = true;
    else
        dv.pred = !dv.pred;

    $('#' + target).editable(dv.pred);
    values.editable = dv.pred;
});

div().appendTo(form).displayBlock().size('80%', 30).margin('auto').marginTop(30).color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('Editable').textAlignCenter().fontBold().fontSize(20).cursorPointer().click(function(dv) {
    if (dv.pred === undefined)
        dv.pred = true;
    else
        dv.pred = !dv.pred;

    $('#' + target).editable(dv.pred);
    values.editable = dv.pred;
});

//});