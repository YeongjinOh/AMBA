require (['https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'], function () {

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
    var getSlideBackground = function () {
        return div().appendTo(slideEditor).size(sbgWidth,sbgHeight).marginLeft(sbgMarginLeft).marginTop(sbgMarginTop)
            .color('white').border(borderGray).boxShadow('0px 5px 20px #888888')
    };

    /** id generator **/
    var idGenerator = (function () {
        var id = 0;
        this.get = function () {
            return 'ABS-' + id++;
        };
        return this;
    })();

    /** Slide, Slide Manager **/

    var Slide = function () {
        var that = this;

        // style slide block
        var blockWrapperHeight = 130, blockHeight = blockWrapperHeight*0.85, slideViewerWidth = blockHeight*w/h;
        var blockWrapper = div().appendTo(slideList).size('100%',blockWrapperHeight).paddingTop(blockWrapperHeight/10);
        var block = div().appendTo(blockWrapper);
        var numberViewer = div().appendTo(block).size(10,blockHeight).margin(5).text('1');
        var slideViewer = div().appendTo(block).size(slideViewerWidth,blockHeight).color('white').border(borderGray)
            .overflowAuto();

        // working space
        var workingSpace = div().appendTo(slideEditor).size('100%','100%').overflowAuto();
        var slideBackground = getSlideBackground().appendTo(workingSpace);

        // ABS Objects
        var objs = {};

        this.active = function () {
            slideViewer.border('2px solid #BF360C');
            workingSpace.displayInlineBlock();
            trigger();
        };
        this.deactive = function () {
            slideViewer.border(borderGray);
            workingSpace.displayNone();
        };
        this.setIdx = function (idx) {
            numberViewer.text(idx);
        };
        this.getIdx = function () {
            return parseInt(numberViewer.text());
        };
        this.remove = function () {
            blockWrapper.remove();
            workingSpace.remove();
            refresh();
        };
        this.syncBlock = function () {
            html2canvas(workingSpace.htmlElement(), {
                onrendered: function(canvas) {
                    slideViewer.image(canvas.toDataURL("image/png"));
                }
            });
        };

        // ABS Object를 추가합니다.
        this.append = function (obj) {
            obj.div().appendTo(workingSpace);
            objs[obj.div().id()] = obj;
        };
        blockWrapper.click(function () {
            if (curSlide)
                curSlide.deactive();
            curSlide = that;
            that.active();
        });
    };


    var SlideManager = function () {
        var slides = [];

        this.new = function () {
            var slide = new Slide();
            slide.setIdx(slides.push(slide));
            if (curSlide)
                curSlide.deactive();
            curSlide = slide;
            curSlide.active();
        };

        // curSlide을 지운다.
        this.del = function () {
            if (curSlide) {
                var idx = curSlide.getIdx()-1;
                var slide = slides.splice(idx,1)[0];
                slide.remove();
                for (var i=idx; i<slides.length; i++) {
                    slides[i].setIdx(i+1);
                }
                curSlide = undefined;
            }
        };
    };

    /** ABS Object **/

    var ABSObject = function () {
        var that = this;
        var id = idGenerator.get()
        var obj = div().size(100,100).border(1).draggable().resizable({handles: 'n, s, e, w, ne, se, nw, sw'}).cursorMove().text(id).id(id)
            .position('absolute').left(slideEditor.leftPos() + 10).top(slideEditor.topPos() + 10);
        obj.$.children().removeClass('ui-icon'); // remove icon
        obj.mousedown(function () {
            if (curObj)
                curObj.deactive();
            curObj = that;
            curObj.active();
        });
        this.active = function () {
            obj.$.children().css('border','1px dotted gray');
        };
        this.deactive = function () {
            obj.$.children().css('border','none');
        };
        this.div = function () {
            return obj;
        };
        return this;
    };

    var absObject = function () {
        return new ABSObject();
    };

    /** utils **/

    var trigger = function () {
        if (curObj)
            curObj.deactive();
        if (curSlide)
            curSlide.syncBlock();
        if (curObj)
            curObj.active();
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
        if (curSlide) {
            var obj = absObject();
            curSlide.append(obj)
            trigger();
        }
    });
    var rectSmooth = div().deco(decoObjMenu).borderRadius(4).click(function () {
        if (curSlide) {
            var obj = absObject();
            obj.div().borderRadius(10);
            curSlide.append(obj);
            trigger();
        }
    });
    var circle = div().deco(decoObjMenu).borderRadius('100%').click(function () {
        if (curSlide) {
            var obj = absObject();
            obj.div().borderRadius('100%');
            curSlide.append(obj);
            trigger();
        }
    });

    var styleMenuBar = div().appendTo(menuBar).height(30).marginLeft(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
    var decoStyleMenu = function (dv) {
        var wrapper = div().appendTo(styleMenuBar).size(28,28).hoverColor('#eeeeee','white').cursorPointer();
        dv.appendTo(wrapper).size(15,15).border(1);
        wrapper.alignMiddle();
        dv.click = function (fn) {
            wrapper.click(fn);
            return dv;
        }
    };
    var colors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B','#FFC107', '#FF9800'];
    var getColorFn = function (c) {
        return function () {
            curObj.div().color(c);
            trigger();
        }
    };
    for (var i=0; i<colors.length; i++) {
        div().deco(decoStyleMenu).color(colors[i]).click(getColorFn(colors[i]));
    }


    /** Initialize **/

    var slideManager = new SlideManager();
    var curSlide, curObj;
    // var curDiv;

    slideEditor.mouseup(trigger);
});