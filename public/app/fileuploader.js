/**
 * Created by JiSoo on 2016-10-16.
 */

var root = div().append().size('100%', '100%').color('lightblue');

div().appendTo(root).size('auto', 'auto').text('Upload File').fontSize(25).disableSelection().button().uploadButton();

div().appendTo(root).size('auto', 'auto').text('Load File').fontSize(25).disableSelection().button().inputFileButton();

