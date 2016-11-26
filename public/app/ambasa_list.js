var root = div().append().padding(50);
var cid = "ambasa";
console.log('a')

var cnt = 0;
var decoLine = function (dv) {
    dv.fontSize(20).padding(10).border('1px solid #bbbbbb').textAlignCenter();
};
var elementViewer = function (key) {
    cnt++;

    var wrapper = div().appendTo(root).size(600,50).cursorPointer().hoverColor('#aaaaaa','white')
        .click(function () {
            localStorage.setItem("ambasa", key.hashkey);
            $(location).attr('href', '/?app=ABS#' + key.akey);
        });
    div().appendTo(wrapper).deco(decoLine).size('10%','100%').text(cnt);
    div().appendTo(wrapper).deco(decoLine).size('35%','100%').text(key.hashkey);
    div().appendTo(wrapper).deco(decoLine).size('55%','100%').text(key.akey);
};

div().appendTo(root).width('100%').text('AMBASA File List').fontSize(30).margin(30);

var setHeader = function () {
    var wrapper = div().appendTo(root).size(600,50);
    div().appendTo(wrapper).deco(decoLine).size('10%','100%').text('No.').color('#dddddd');
    div().appendTo(wrapper).deco(decoLine).size('35%','100%').text('User id').color('#dddddd');
    div().appendTo(wrapper).deco(decoLine).size('55%','100%').text('File name').color('#dddddd');
};

for (var i=0; i<Math.floor(window.outerWidth/600); i++)
    setHeader();

$.get("/hashstore/key_list", {cid:cid})
    .done(function(data) {
        console.log(data);
        var keys = data.info;
        for (var i=0; i<keys.length; i++) {
            elementViewer(keys[i]);
        }
    });