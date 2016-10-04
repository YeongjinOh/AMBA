/**
 * Created by JiSoo on 2016-10-04.
 */

var root = div().append().size('100%', '100%').color('white');
var topDiv = div().appendTo(root).displayBlock().size('980px', '120px').color('white');
var bottomDiv = div().appendTo(root).size('980px', '864px').color('white');

var memo = div().appendTo(bottomDiv).size('100%', '100%').color('white');

div().appendTo(topDiv).size('170px', '40px').marginLeft('100px').marginTop('30px').color('blue').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('put').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    $.get("/datastore/put", { cid: 'test1', key: 'key1', value: 'value1' })
        .done(function (data) {
            if (data.resultCode === 0)
                memo.text('Put Success');
            else
                alert(JSON.stringify(data.msg));
        });
    // cid, key, value
});
div().appendTo(topDiv).size('170px', '40px').marginLeft('10px').marginTop('30px').color('green').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('get').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    $.get("/datastore/get", { cid: 'test1', key: 'key1' })
        .done(function (data) {
            if (data.resultCode === 0)
                memo.text(JSON.stringify(data.info));
            else
                alert(JSON.stringify(data.msg));
        });
    //cid, key
});
div().appendTo(topDiv).size('170px', '40px').marginLeft('10px').marginTop('30px').color('red').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('delete').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    $.get("/datastore/delete", { cid: 'test1', key: 'key1' })
        .done(function (data) {
            if (data.resultCode === 0)
                memo.text('Delete Success');
            else
                alert(JSON.stringify(data.msg));
        });
    //cid, key
});
div().appendTo(topDiv).size('170px', '40px').marginLeft('10px').marginTop('30px').color('violet').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('keys').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    $.get("/datastore/keys", { cid: 'test1' })
        .done(function (data) {
            if (data.resultCode === 0)
                memo.text(JSON.stringify(data.info));
            else
                alert(JSON.stringify(data.msg));
        });
    // cid
});