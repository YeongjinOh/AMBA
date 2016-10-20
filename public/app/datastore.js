/**
 * Created by JiSoo on 2016-10-04.
 */

var root = div().append().size('100%', '100%').color('white');
var topDiv = div().appendTo(root).displayBlock().size('980px', '200px').color('white');
var bottomDiv = div().appendTo(root).size('980px', '700px').color('white');

var inputDiv = div().appendTo(topDiv).size('200px', '200px').color('white');
var formDiv = div().appendTo(topDiv).size('760px', '200px').color('white');

var memo = div().appendTo(bottomDiv).displayBlock().size('80%', '100%').margin('auto').color('white').borderRadius(5).borderOption('5px solid');

div().appendTo(inputDiv).displayBlock().size('180px', '15px').margin('auto').marginTop('15px').color('white')
    .text('cid').fontSize('15px').fontColor('black').disableSelection().cursorDefault();
var cid = div().appendTo(inputDiv).displayBlock().size('180px', '20px').margin('auto').marginTop('5px').color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize('15px').cursorText();

div().appendTo(inputDiv).displayBlock().size('180px', '15px').margin('auto').marginTop('15px').color('white')
    .text('key').fontSize('15px').fontColor('black').disableSelection().cursorDefault();
var key = div().appendTo(inputDiv).displayBlock().size('180px', '20px').margin('auto').marginTop('5px').color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize('15px').cursorText();

div().appendTo(inputDiv).displayBlock().size('180px', '15px').margin('auto').marginTop('15px').color('white')
    .text('value').fontSize('15px').fontColor('black').disableSelection().cursorDefault();
var value = div().appendTo(inputDiv).displayBlock().size('180px', '20px').margin('auto').marginTop('5px').color('white')
    .borderRadius(5).boxShadow('5px 5px 5px black').text('').editable().fontSize('15px').cursorText();

div().appendTo(formDiv).size('150px', '40px').marginLeft('100px').marginTop('7px').color('blue').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('put').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    if (cid.text() === '' || key.text() === '' || value.text() === '')
        alert('cid, key, value를 입력해주세요.');
    else {
        $.get("/datastore/put", {cid: cid.text(), key: key.text(), value: value.text()})
            .done(function (data) {
                if (data.resultCode === 0)
                    memo.text('Put Success');
                else
                    alert(JSON.stringify(data.msg));
            });
    }
});

div().appendTo(formDiv).size('150px', '40px').marginLeft('10px').marginTop('7px').color('green').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('get').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    if (cid.text() === '' || key.text() === '')
        alert('cid, key를 입력해주세요.');
    else {
        $.get("/datastore/get", {cid: cid.text(), key: key.text()})
            .done(function (data) {
                if (data.resultCode === 0)
                    memo.text(JSON.stringify(data.info));
                else
                    alert(JSON.stringify(data.msg));
            });
    }
});

div().appendTo(formDiv).size('150px', '40px').marginLeft('10px').marginTop('7px').color('red').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('delete').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    if (cid.text() === '' || key.text() === '')
        alert('cid, key를 입력해주세요.');
    else {
        $.get("/datastore/delete", {cid: cid.text(), kㅋㅋey: key.text()})
            .done(function (data) {
                if (data.resultCode === 0)
                    memo.text('Delete Success');
                else
                    alert(JSON.stringify(data.msg));
            });
    }
});


div().appendTo(formDiv).size('150px', '40px').marginLeft('10px').marginTop('7px').color('violet').borderRadius(5).boxShadow('5px 5px 5px black')
    .text('keys').textAlignCenter().fontSize('25px').fontColor('white').fontBold().disableSelection().cursorPointer().hover(function (dv) {
    dv.fontColor('black');
},  function (dv) {
    dv.fontColor('white');
}).click( function () {
    if (cid.text() === '')
        alert('cid를 입력해주세요.');
    else {
        $.get("/datastore/keys", {cid: cid.text()})
            .done(function (data) {
                if (data.resultCode === 0)
                    memo.text(JSON.stringify(data.info));
                else
                    alert(JSON.stringify(data.msg));
            });
    }
});