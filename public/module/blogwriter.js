/**
 * Created by Lightsoo on 2016. 10. 26..
 */
define([], function(){
    function getName() {
        var info = localStorage.getItem('ainfo');
        return JSON.parse(info).username;
    }

    var Module = {};
    Module.appendTo = function(dv) {
        var writeFrame = div().size(600, 600).appendTo(dv).border(1);

        var headerDv = div().size('100%', 40).appendTo(writeFrame).text('Write to Blog').fontSize(20).textAlign('center');
        div().size('auto').appendTo(headerDv).text('Save').float('right').padding(4).boxShadow('2px 2px')
            .marginRight(6).marginTop(2).border(1).borderRadius(6).click(function(dv){


                var data = {
                    title: titleDv.text(),
                    content: contentDv.text(),
                    timestamp: Date.now(),
                    aauth: localStorage.getItem('aauth'),
                    name: getName()
                };
                //var cid = AB.module.getCid ();

                //$.post("/blog/put",
                //    {
                //        cid: inputCid.text(),
                //        akey: inputKey.text(),
                //        value: data
                //
                //    }, function (result) {
                //        //outputView.empty();
                //        outputView.text(JSON.stringify(result));
                //    });
                console.log('cid : ', cid);
                console.log(data);
            });
        div().size('auto').appendTo(headerDv).text('Cancel').float('left').padding(4).boxShadow('2px 2px')
            .marginLeft(6).marginTop(2).border(1).borderRadius(6).click(function(dv){
                writeFrame.remove();
            });

        div().size(80, 40).appendTo(writeFrame).text('Title').textAlign('center').fontSize(20).fontColor('#CCC');

        var titleDv = div().size(writeFrame.widthPixel()-100, 40).appendTo(writeFrame)
            .border(1).borderRadius(6).padding(8).editable().text('').fontSize(20).cursorText();

        var contentDv = div().size('100%', 400).appendTo(writeFrame).tinymce().textAlign('center').marginTop(20);


    };

    return Module;
});