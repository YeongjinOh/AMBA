(function () {

    /** colors **/
    var borderGray = '1px solid #cccccc', slideListColor = '#eeeeee', slideEditorColor = '#dddddd';

    /** basic setting for layout **/

    // var w = window.outerWidth, h = window.outerHeight;
    var w = 1280, h = 800;
    var menuBarWidth = w, menuBarHeight = 100, slideListWidth = 220, slideListHeight = h-menuBarHeight,
        slideEditorWidth = w-slideListWidth, slideEditorHeight = slideListHeight;
    var parent = div().append().size(w,h);
    var menuBar = div().appendTo(parent).size(menuBarWidth, menuBarHeight).borderBottom(borderGray);
    var slideList = div().appendTo(parent).size(slideListWidth, slideListHeight).borderRight(borderGray).color(slideListColor).overflowAuto();
    var slideEditor = div().appendTo(parent).size(slideEditorWidth, slideEditorHeight).color(slideEditorColor).overflowAuto();
    var blank = div();
    var refresh = function () {
        blank.append();
    };

    /** id generator **/
    var idGenerator = (function () {
        var id = 0;
        this.get = function () {
            return 'ABS-' + id++;
        };
        return this;
    })();

    /** Slide Manager, Slide **/

    var Slide = function () {
        var objs = {};

    };

    var SlideBlock = function () {
        var blockWrapperHeight = 130, blockHeight = blockWrapperHeight*0.85, slideViewerWidth = blockHeight*w/h;
        var blockWrapper = div().size('100%',blockWrapperHeight).paddingTop(blockWrapperHeight/10);
        var block = div().appendTo(blockWrapper);
        var numberViewer = div().appendTo(block).size(10,blockHeight).margin(5).text('1');
        var slideViewer = div().appendTo(block).size(slideViewerWidth,blockHeight).color('white').border(borderGray);
        var that = this;
        var active = function () {
            slideViewer.border('2px solid #BF360C');
        };
        this.deactive = function () {
            slideViewer.border(borderGray);
        };
        this.setIdx = function (idx) {
            numberViewer.text(idx);
        };
        this.getIdx = function () {
            return parseInt(numberViewer.text());
        };
        this.appendTo = function (target) {
            blockWrapper.appendTo(target);
            return this;
        };
        this.remove = function () {
            blockWrapper.remove();
            refresh();
        };
        blockWrapper.click(function () {
            if (curSlideBlock)
                curSlideBlock.deactive();
            curSlideBlock = that;
            active();
        });
    };


    var SlideManager = function () {
        var slideBlocks = [];

        this.new = function () {
            // var slide = new Slide();
            var slideBlock = new SlideBlock();
            slideBlock.appendTo(slideList).setIdx(slideBlocks.push(slideBlock));
        };

        // curSlideBlock을 지운다.
        this.del = function () {
            if (curSlideBlock) {
                var idx = curSlideBlock.getIdx()-1;
                var slideBlock = slideBlocks.splice(idx,1)[0];
                slideBlock.remove();
                for (var i=idx; i<slideBlocks.length; i++) {
                    slideBlocks[i].setIdx(i+1);
                }
                curSlideBlock = undefined;
            }
        };
    };

    /** Object **/

    var Object = function () {
        var that = this;
        var id = idGenerator.get()
        var obj = div().size(100,100).border(1).draggable().resizable({handles: 'n, s, e, w, ne, se, nw, sw'}).cursorMove().text(id).id(id)
                .position('absolute').left(slideEditor.leftPos() + 10).top(slideEditor.topPos() + 10);
        obj.$.children().removeClass('ui-icon'); // remove icon
        obj.mousedown(function () {
            if (curObj)
                curObj.deactive();
            curObj = that;
            obj.$.children().css('border','1px dotted gray');
        });
        this.deactive = function () {
            obj.$.children().css('border','none');
        };
        this.div = function () {
            return obj;
        };
        return this;
    };

    /** menu bar **/

    var fileInfoHeader = div().appendTo(menuBar).size('100%',60);
    var fileName = div().appendTo(fileInfoHeader).size(200,30).margin(20).text('제목 없는 프레젠테이션').fontColor('gray').fontSize(20);

    var slideMenuBar = div().appendTo(menuBar).size('20%',40);
    var decoSlideMenuButton = function (div) {
        div.size(25,25).marginLeft(20).cursorPointer();
    };
    var newSlideButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/newslide.png').marginLeft(30)
        .click(function () {
            slideManager.new();
        });
    var delSlideButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/delslide.png')
        .click(function () {
            slideManager.del();
        });

    var objMenuBar = div().appendTo(menuBar).height(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
    var decoObjMenu = function (dv) {
        var wrapper = div().appendTo(objMenuBar).size(28,28).hoverColor('#eeeeee','white').cursorPointer();
        dv.appendTo(wrapper).size(15,15).border(1);
        wrapper.alignMiddle();
        dv.click = function (fn) {
            wrapper.click(fn);
            return dv;
        }
    };
    var rect = div().deco(decoObjMenu).click(function () {
        if (curSlideBlock) {
            var obj = new Object();
            obj.div().appendTo(slideEditor);
        }
    });
    var rectSmooth = div().deco(decoObjMenu).borderRadius(4).click(function () {
        if (curSlideBlock) {
            var obj = new Object();
            obj.div().appendTo(slideEditor).borderRadius(10);
        }
    });
    var circle = div().deco(decoObjMenu).borderRadius('100%').click(function () {
        if (curSlideBlock) {
            var obj = new Object();
            obj.div().appendTo(slideEditor).borderRadius('100%');
        }
    });


    /** set slide background **/

        // calculate sbg width and height
    var sbgMargin = slideEditorWidth/8, ratio = 1; // 전체 화면과 Editor 상 background 사이의 비율
    var sbgMaxWidth = slideEditor.widthPixel()-2*sbgMargin, sbgMaxHeight = slideEditor.heightPixel()-2*sbgMargin;
    if (h*sbgMaxWidth < w*sbgMaxHeight)
        ratio = sbgMaxWidth/w;
    else
        ratio = sbgMaxHeight/h;
    var sbgWidth = w * ratio, sbgHeight = h*ratio;
    var sbgMarginLeft = (slideEditorWidth-sbgWidth)/2, sbgMarginTop = (slideEditorHeight-sbgHeight)/2;
    var slideBackground = div().appendTo(slideEditor).size(sbgWidth,sbgHeight).marginLeft(sbgMarginLeft).marginTop(sbgMarginTop)
        .color('white').border(borderGray).draggable().boxShadow('0px 5px 20px #888888')
        .resizable({aspectRatio:true});


    /** Initialize **/

    var slideManager = new SlideManager();
    var curSlideBlock, curObj;

})();