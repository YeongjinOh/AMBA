/**
 * Created by JiSoo on 2016-10-16.
 */
var files = [];

var root = div().append().size('100%', '100%').color('lightblue');

div().appendTo(root).size('auto', 'auto').text('Upload File').fontSize(25).disableSelection().button().click(function() {
    AB.uploader('1234', files).complete(function(data) {
        console.log(data);
    }).action();
});

div().appendTo(root).size('auto', 'auto').text('Load File').fontSize(25).disableSelection().button().fileSelectable(function(dv, file) {
    files.push(file);
});

