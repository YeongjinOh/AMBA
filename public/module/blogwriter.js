/**
 * Created by Lightsoo on 2016. 10. 26..
 */
define([], function(){
    function getName() {
        var info = localStorage.getItem('ainfo');
        return JSON.parse(info).username;
    }

    var addZeroIfNeeded = function (num) {
        num = parseInt(num);
        return num < 10 ? '0' + num : num;
    };

    var getCurrentDate = function () {
        var date = new Date();
        var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var curr_date = addZeroIfNeeded(date.getDate());
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();
        var curr_hour = date.getHours();
        var curr_min = addZeroIfNeeded(date.getMinutes());
        var curr_sec = addZeroIfNeeded(date.getSeconds());
        return (curr_date + "-" + m_names[curr_month]
        + "-" + curr_year);// + "  " + curr_hour + ":" + curr_min + ":" + curr_sec);
    };

    var getTime = function () {
        var date = new Date();

        var hour = date.getHours();
        var min = addZeroIfNeeded(date.getMinutes());
        if (hour < 13) {
            return "오전 " + hour + ":" + min;
        } else {
            hour -= 12;
            return "오후 " + hour + ":" + min;
        }

    };

    var Module = {};
    Module.appendTo = function(dv) {
        var writeFrame = div().size(600, 600).appendTo(dv).border(1);

        var headerDv = div().size('100%', 40).appendTo(writeFrame).text('Write to Blog').fontSize(20).textAlign('center');
        div().size('auto').appendTo(headerDv).text('Save').float('right').padding(4).boxShadow('2px 2px')
            .marginRight(6).marginTop(2).border(1).borderRadius(6).click(function(dv){


                var data = {
                    title: titleDv.text(),
                    content: contentDv.text(),
                    timestamp: getCurrentDate(),//Date.now(),
                    aauth: localStorage.getItem('aauth'),
                    name: getName()
                };
                console.log('date : ' , data);
                console.log(JSON.stringify(data));
                //var cid = AB.module.getCid();

                $.post("/blog",
                    {
                        cid: 'kks',//AB.module.getCid(),
                        akey: data.title + data.timestamp,
                        value: JSON.stringify(data)

                    }, function (result) {
                        console.log(result);
                        //outputView.empty();
                        //outputView.text(JSON.stringify(result));
                    });
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