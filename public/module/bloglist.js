/**
 * Created by Lightsoo on 2016. 10. 24..
 */

define([],function () {
    var Module = {};

    Module.appendTo = function (target) {
        function init(){
            var value =[];
            for(var i =0;i<3;i++){
                value = {
                    aauth : localStorage.getItem('aauth'),
                    title : '가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사' + i,
                    content : '1가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사',
                    name : 'lightsoo',
                    timestamp : "2016-02-12"
                };
                newPost(value);
                pBottom.appendTo(pList);
                previousPage.appendTo(pBottom);
                currentPage.appendTo(pBottom);
                nextPage.appendTo(pBottom)
            }
        }

        // postItem view
        var postView = function (div) {
            div.size('550','auto').color('white')
                .margin('auto')
                .marginBottom(15)
                .borderRadius(6)
                .maxWidth(600)
                .minHeight(100)
                .padding('20px')
                .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();
        };

        var parent = div().appendTo(target).size('100%', 'auto').color('#C2B4B1');
        var pList = div().appendTo(parent).size('100%','auto').overflow('scroll').textAlign('center');
        var pBottom = div().size('550','40').color('white')
            .textAlign('center').marginBottom(15)
            .borderRadius(6)
            .borderOption(1).borderOption('#EBE8E7', 'color');

        var previousPage = div().size('auto','100%').floatRight().text(' PREVIOUS PAGE ');
        var currentPage = div().size('auto','100%').text(' ').floatRight();
        var nextPage = div().size('auto','100%').text(' NEXT PAGE ').floatRight();

        var vParent = div().appendTo(target).size('100%','100%').displayNone()
            .position('absolute').left(0).top(0)
            .color('##1C2833').opacity(0.97);

        var vParentHeader = div().size('100%','40').appendTo(vParent).displayBlock();
        div().appendTo(vParentHeader).size('40','100%').color('blue').floatRight()
            .click(function () {
                parent.displayInlineBlock();
                vParent.displayNone();
            });

        var viewer = div().appendTo(vParent).size('100%','100%').overflow('scroll')
            .maxHeight(600);


        //margin('auto') : 가운데 정렬, 부모div가 auto가 아닐경우, 안에 내용에 따라 사이즈가 결정된다
        var viewerContent = div().deco(postView).marginTop(0).appendTo(viewer);
        var pTitle = div().appendTo(viewerContent).paddingLeft(10).floatLeft()
            .whiteSpace('pre-line').textAlign('left').wordBreak('break-all')
            .fontSize(22).fontColor('#333333').fontBold();
        var pTimestamp = div().appendTo(viewerContent).floatRight();
        var pContent = div().appendTo(viewerContent)
            .minWidth('100%')
            .borderRadius(5)
            .padding('9px')
            .color('#EBE8E7');

        //스키마
        var Post = function (value) {
            this.aauth = value.aauth;//uid
            this.title = value.title;
            this.content = value.content;
            this.timestamp = value.timestamp;
            this.name = value.name;
        };

        var buildPost = function (obj) {
            return new Post(obj);
        };

        var postManager = function () {
            var posting = [];

            this.getPost = function () {
                return $.get("/posting/get",
                    {//query
                        aauth : localStorage.getItem('aauth')
                        //cid: 'ida'
                    }, function (result) {
                        console.log('result : ', result);
                        posting = result.map(buildPost);
                        for(var i=0;i<posting.length;i++){
                            newPost(posting[i]);
                        };
                    });

            };
        };


        var newPost = function (postValue) {
            var posting = div().appendTo(pList).deco(postView);

            var postItem = {
                title : div().appendTo(posting).paddingLeft(10).floatLeft()
                    .whiteSpace('pre-line').textAlign('left').wordBreak('break-all')
                    .text(postValue.title).fontSize(22).fontColor('#333333').fontBold(),
                postTime : div().appendTo(posting).floatRight()
                    .text(postValue.timestamp),
                contents : div().appendTo(posting).text(postValue.content)
                    .minWidth('100%')
                    .borderRadius(5)
                    .padding('9px')
                    .color('#EBE8E7')
            };

            posting.hoverColor('red','white').click(function () {
                pTitle.text(postValue.title);
                pTimestamp.text(postValue.timestamp);
                pContent.text(postValue.content);
                vParent.displayInlineBlock();
                parent.displayNone();
            });
        };

        //var posting = new postManager();
        //posting.getPost();
        init();
    };
    return Module;
});