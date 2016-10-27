/**
 * Created by Lightsoo on 2016. 10. 24..
 */

define([],function () {
    var Module = {};


    Module.appendTo = function (target) {


        function init(){
            var value =[];
            for(var i =0;i<5;i++){
                value = {
                    aauth : localStorage.getItem('aauth'),
                    title : '가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사' + i,
                    content : '1aaasasasasaksnknaslnasalsmlamslamslamslamskanskanskanskansajsnksandaskldnlasdklasd1aaasasasasaksnknaslnasalsmlamslamslamslamskanskanskanskansajsnksandaskldnlasdklasd1aaasasasasaksnknaslnasalsmlamslamslamslamskanskanskanskansajsnksandaskldnlasdklasd',
                    //content : '1가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가다라마바사',
                    name : 'lightsoo',
                    timestamp : "2016-02-12"
                };
                console.log(value);
                newPost(value);
            }
            var cpText = 'PAGE ' + page +' OF '+maxPage;
            if(maxPage == 1){
                currentPage.appendTo(pBottom).text(cpText);
            }else if(page!=1&&page%maxPage!==0){
                nextPage.appendTo(pBottom);
                currentPage.appendTo(pBottom).text(cpText);
                previousPage.appendTo(pBottom);
            }else if(page%maxPage==0){
                currentPage.appendTo(pBottom).text(cpText);
                previousPage.appendTo(pBottom);
            }else{
                nextPage.appendTo(pBottom);
                currentPage.appendTo(pBottom).text(cpText);
            }

        }

        var page = 3;
        var maxPage =3;//exam
        var that = this;

        // postItem view
        var postView = function (div) {
            div.size('590','auto').color('white')
                .margin('auto')
                .marginBottom(15)
                .borderRadius(6)
                .maxWidth(600)
                .minHeight(100)
                .padding('20px')
                .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();
        };

        var parent = div().appendTo(target).size('100%', '100%')//.color('#C2B4B1');
        var pWrapper = div().appendTo(parent).size('700','auto').overflow('scroll').color('white').displayBlock()
            .margin('auto')
            .marginTop(30).marginBottom(30)
            .borderOption(1).borderOption('#EBE8E7', 'color');

        var pTop = div().size('590','auto').appendTo(pWrapper).displayBlock()
            .margin('auto').marginTop(30).marginBottom(5)
            .text('This is blog').textAlign('center')
            .fontSize(30)
            .borderBottom('solid 2px').borderBottomColor('#EBE8E7')
            .click(function () {
                page=1;
                console.log(posting.getPost());
                //posting.getPost();
            })
            .hoverTextColor('grey','black');

        var pList = div().appendTo(pWrapper).size('700','auto').overflow('scroll').color('white').displayBlock()
            .margin('auto');


        var pBottom = div().appendTo(pWrapper).size('590','30').color('white').displayBlock()
            .margin('auto')
            .marginBottom(15)
            .borderRadius(6)
            .padding(2)
            .borderOption(1).borderOption('#EBE8E7', 'color');


        var previousPage = div().size('auto','auto').floatRight()
            .paddingRight(8)
            .text('PREVIOUS PAGE').fontSize(15)
            .click(function () {
                page--;
                that.posting.getPost();
            })
            .hoverTextColor('grey','black');

        var currentPage = div().size('auto','auto').floatRight()
            .paddingRight(8)
            .fontBold()
            .fontSize(15);

        var nextPage = div().size('auto','auto').floatRight()
            .paddingRight(8)
            .text('NEXT PAGE').fontSize(15)
            .click(function () {
                page++;
                that.posting.getPost();
            })
            .hoverTextColor('grey','black');


        //상세페이지
        var vParent = div().appendTo(target).size('100%','100%').displayNone()
            .position('absolute').left(0).top(0)
            .color('##196F3D').opacity(0.9);

        var vParentHeader = div().size('100%','40').appendTo(vParent).displayBlock();
        div().appendTo(vParentHeader).size('40','100%').image('../images/btn_close.png').floatRight()
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
            .whiteSpace('pre-line').textAlign('left').wordBreak('break-all')
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
            var temp = JSON.parse(obj.value);
            return new Post(temp);
        };

        var postManager = function () {
            var posting = [];

            this.getPost = function () {
                return $.get("/blog",
                    {//query
                        cid: 'kks',
                        page : page
                    }, function (results) {
                        posting = results.value.map(buildPost);
                        maxPage = results.maxPage;

                        for(var i=0;i<posting.length;i++){
                            newPost(posting[i]);
                        }
                        var cpText = 'PAGE ' + page +' OF '+maxPage;
                        if(maxPage == 1){
                            currentPage.appendTo(pBottom).text(cpText);
                        }else if(page!=1&&page%maxPage!==0){
                            nextPage.appendTo(pBottom);
                            currentPage.appendTo(pBottom).text(cpText);
                            previousPage.appendTo(pBottom);
                        }else if(page%maxPage==0){
                            currentPage.appendTo(pBottom).text(cpText);
                            previousPage.appendTo(pBottom);
                        }else{
                            nextPage.appendTo(pBottom);
                            currentPage.appendTo(pBottom).text(cpText);
                        }
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
                    .whiteSpace('pre-line').textAlign('left').wordBreak('break-all')
                    .minWidth('100%')
                    .borderRadius(5)
                    .padding('9px')
                    .color('#EBE8E7')
            };

            posting.hoverColor('#7DCEA0','white').click(function () {
                pTitle.text(postValue.title);
                pTimestamp.text(postValue.timestamp);
                pContent.text(postValue.content);

                vParent.displayInlineBlock();
                parent.displayNone();
            });
        };

        var posting = new postManager();
        //posting.getPost();
        init();

    };
    return Module;
});