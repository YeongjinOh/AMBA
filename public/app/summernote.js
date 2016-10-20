/**
 * Created by JiSoo on 2016-10-12.
 */

div().append().size(100, 100).text('click').click(function() {
    console.log(sn.text());
});

var sn = div().append().size('100%', 'auto').summernote();
div().append().size('100%', 200).summernote();
div().append().size ('100%', 200).tinymce();
div().append().size ('100%', 200).tinymce();