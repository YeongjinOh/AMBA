require (['ABSdecoration','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'], function (ABSdeco) {

    /** colors **/
    var borderGray = '1px solid #cccccc', slideListColor = '#eeeeee', slideEditorColor = '#dddddd';

    /** utils **/

    Div.prototype.getABSstyle = function () {
        var params = $.extend({},this.params());
        params.top = this.offset().top;
        params.left = this.offset().left;
        params.width = this.widthPixel();
        params.height = this.heightPixel();
        return params;
    };

    var getParams = function (dv) {
        return {
            id:dv.id(),
            style:dv.getABSstyle(),
            text:dv.text()
        };
    };

    var checkTextProp = function (prop) {
        return prop.startsWith('font') || (prop.startsWith('text-') && !prop.startsWith('text-align'))
            || prop === 'color';
    };
    var undoStyle = function (dv, params) {
        var curParams = dv.getABSstyle();
        for (var prop in curParams) {
            if (params.style[prop]) {
                if (checkTextProp(prop))
                    dv.cssText(prop, params.style[prop]);
                else
                    dv.css(prop,params.style[prop]);
            } else {
                if (checkTextProp(prop))
                    dv.cssText(prop, 'initial');
                else
                    dv.css(prop, 'initial');
            }
        }
        dv.text(params.text);
    };
    var redoStyle = function (dv, params) {
        for (var prop in params.style) {
            if (checkTextProp(prop))
                dv.cssText(prop, params.style[prop]);
            else
                dv.css(prop,params.style[prop]);
        }
        dv.text(params.text);
    };

    var syncBlock = function () {
        if (curObj) {
            curObj.deactive();
        }
        if (curSlide) {
            curSlide.syncBlock(function () {
                if (curObj) {
                    curObj.active();
                }
            });
        }
    };
    var trigger = function () {
        if (curSlide) {
            syncBlock();
            curSlide.resetRedo();
        }
        if (curDiv && curObj) {
            var prevParams = curObj.getParams();
            curSlide.addUndo(prevParams);
            curObj.setParams();
            objStateBar.text(JSON.stringify(curObj.getParams()));
        }
    };

    var getUesrname = function () {
        var username;
        try {
            username = JSON.parse(localStorage.getItem('ainfo')).username;
        } catch (e) {
            console.log(e);
            username = 'unknown';
        }
        return username;
    };
    var username = getUesrname();


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


    /** set context menu **/

    // for ABS Object
    ABSdeco.initContextMenu(trigger);

    Div.prototype.setSlideContextMenu = function (slide) {
        this.$.bind("contextmenu", function (event) {
            // 기존의 context-menu 제거
            event.preventDefault();
            // set curSlide
            if (curSlide)
                curSlide.deactive();
            curSlide = slide;
            curSlide.active();
            // set ambasa context-menu
            $("#abs-slide-context-menu").finish().toggle(100).css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        });
        return this;
    };

    // for slide
    var contextMenuBar = div().append().id('abs-slide-context-menu').width(80).zIndex(1000).position('absolute')
        .color('#cccccc').border('1px solid gray').borderRadius(2).overflowHidden().displayNone();
    var decoMenu = function (dv) {
        dv.size('100%', 25).padding(3).paddingLeft(10).cursorPointer().hoverColor('#999999', '#cccccc');
    };
    var menu1 = div().appendTo(contextMenuBar).deco(decoMenu).text('삭제').click(function () {
        slideManager.del();
        $("#abs-slide-contextㅎ-menu").hide(100);
    });

    // 다른 곳 클릭시 context-menu hide
    $(document).bind("mousedown", function (e) {
        if (!$(e.target).parents("#abs-slide-context-menu").length > 0) {
            $("#abs-slide-context-menu").hide(100);
        }
        // TODO : context-menu click해도 curObj 살아있게.
        var targets = $(e.target).parents().andSelf();

        // target이 ABSObject인지 확인
        var checkObject = false;
        for (var i = 0; i<targets.length; i++) {
            if (targets[i].id.startsWith("ABS-"))
                checkObject = true;
        }
        // target이 option인지 확인
        var checkOption = false;
        for (i = 0; i<targets.length; i++) {
            if (targets[i].classList.contains("abs-option") || targets[i].id == 'abs-context-menu')
                checkObject = true;
        }
        // target이 ABSobject나 option이 아니면 비활성화.
        if (curObj && !checkObject && !checkOption) {
            curObj.deactive();
            curObj = undefined;
            curDiv = undefined;
        }
    });


    /** id generator **/
    var idGenerator = (function () {
        var id = 0;
        this.get = function () {
            return 'ABS-' + id++;
        };
        this.set = function (_id) {
            _id = parseInt(_id.slice(4,_id.length));
            if (id <= _id)
                id = _id + 1;
        };
        return this;
    })();


    /** ABS Object **/

    var ABSObject = function (params) {
        var that = this;
        var dv = div().class('abs-object').size(100,100).border('1px solid black').draggable().resizable({handles: 'n, s, e, w, ne, se, nw, sw'})
            .color('initial').cursorMove().position('absolute').left(slideEditor.leftPos() + 10).top(slideEditor.topPos() + 10);

        dv.$.children().removeClass('ui-icon'); // remove icon
        dv.mousedown(function(e){
            that.focus();
        }).mouseup(trigger);

        var id;
        if (params) {
            id = params.id;
            idGenerator.set(id);
            redoStyle(dv, params);
        } else {
            id = idGenerator.get();
            dv.text(id);
            params = {id:id,style:{'display':'none'}};
        }
        dv.id(id).setContextMenu(id);

        this.focus = function () {
            if (curObj)
                curObj.deactive();
            curObj = that;
            curDiv = curObj.div();
            curObj.active();
        };

        this.active = function () {
            dv.$.children().css('border','1px dotted gray');
        };

        this.deactive = function () {
            dv.$.children().css('border','none');
        };

        this.div = function () {
            return dv;
        };

        this.export = function () {
            return params;
        };

        this.setParams = function () {
            params = getParams(dv);
        };

        this.getParams = function () {
            return params;
        };

        return this;
    };

    var absObject = function (params) {
        return new ABSObject(params);
    };


    /** Slide, Slide Manager **/

    var Slide = function () {
        var that = this;
        var undolist = [], redolist =[];

        // style slide block
        var blockWrapperHeight = 130, blockHeight = blockWrapperHeight*0.85, slideViewerWidth = blockHeight*w/h;
        var blockWrapper = div().appendTo(slideList).size('100%',blockWrapperHeight).paddingTop(blockWrapperHeight/10)
            .setSlideContextMenu(this);
        var block = div().appendTo(blockWrapper);
        var numberViewer = div().appendTo(block).size(10,blockHeight).margin(5).text('1');
        var slideViewer = div().appendTo(block).size(slideViewerWidth,blockHeight).color('white').border(borderGray)
            .overflowAuto();

        // working space
        var workingSpace = div().appendTo(slideEditor).size('100%','100%').overflowAuto();
        var slideBackground = getSlideBackground().appendTo(workingSpace);

        // ABS Objects
        var objs = {};

        blockWrapper.click(function () {
            that.focus();
        });

        this.get = function (id) {
            return objs[id];
        };

        this.focus = function () {
            if (curSlide)
                curSlide.deactive();
            curSlide = that;
            that.active();
        };

        this.active = function () {
            slideViewer.border('2px solid #BF360C');
            workingSpace.displayInlineBlock();
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

        this.syncBlock = function (callback) {
            html2canvas(workingSpace.htmlElement(), {
                onrendered: function(canvas) {
                    slideViewer.image(canvas.toDataURL("image/png"));
                    slideViewer.$image.load(callback);
                }
            });
        };

        // ABS Object를 추가합니다.
        this.append = function (obj) {
            obj.div().appendTo(workingSpace);
            objs[obj.div().id()] = obj;
        };

        this.export = function () {
            var params = {};
            for (id in objs) {
                params[id] = objs[id].export();
            }
            return params;
        };

        this.load = function (params) {
            for(id in params) {
                var obj = absObject(params[id]);
                this.append(obj);
                syncBlock();
            }
        };

        this.addUndo = function (param) {
            undolist.push(param);
        };

        this.undo = function () {
            if (undolist.length > 0) {
                var param = undolist.pop();
                var dv = $('#'+param.id).data('div');
                redolist.push(getParams(dv));
                undoStyle(dv, param);
                if (curSlide) {
                    var obj = curSlide.get(param.id);
                    obj.setParams();
                }
                syncBlock();
            }
        };

        this.redo = function () {
            if (redolist.length > 0) {
                var param = redolist.pop();
                var dv = $('#'+param.id).data('div');
                undolist.push(getParams(dv));
                redoStyle(dv, param);
                if (curSlide) {
                    var obj = curSlide.get(param.id);
                    obj.setParams();
                }
                syncBlock();
            }
        };

        this.resetRedo = function () {
            redolist = [];
        }
    };


    var SlideManager = function () {
        var slides = [];

        this.new = function () {
            var slide = new Slide();
            slide.setIdx(slides.push(slide));
            slide.focus();
            syncBlock();
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

        this.export = function () {
            var params = [];
            for (var i=0; i<slides.length; i++) {
                params.push(slides[i].export());
            }
            return params;
        };

        this.clear = function () {
            for (var i=0; i<slides.length; i++) {
                slides[i].remove();
                curSlide = undefined;
                curObj = undefined;
                curDiv = undefined;
            }
            slides = [];
        };
        this.load = function (params) {
            this.clear();
            for (var i=0; i<params.length; i++) {
                this.new();
                slides[i].load(params[i]);
            }
        };
    };


    /** menu bar **/

    var leftMenuBarWrapper = div().appendTo(menuBar).size('70%','100%');
    var fileInfoHeader = div().appendTo(leftMenuBarWrapper).size('100%',60);
    var fileName = div().appendTo(fileInfoHeader).size(200,30).margin(20).text('제목 없는 프레젠테이션').fontColor('gray').fontSize(20);

    var slideMenuBar = div().appendTo(leftMenuBarWrapper).size('35%',40);
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
    var saveButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/save.png')
        .click(function () {
            var fName = prompt('파일명을 입력해주세요.');
            if (fName == null)
                return;
            fileName.text(fName);
            localStorage.setItem('abs-params-' + fName,JSON.stringify(slideManager.export()));
        });
    var loadButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/load.png')
        .click(function () {
            var fName = prompt('파일명을 입력해주세요.');
            if (fName == null)
                return;
            var params = JSON.parse(localStorage.getItem('abs-params-' + fName));
            if (params == null) {
                alert('해당 파일을 불러올 수 없습니다.');
            }
            else {
                fileName.text(fName);
                slideManager.load(params);
            }
        });
    var undoButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/undo.png')
        .click(function () {
            if (curSlide)
                curSlide.undo();
        });
    var redoButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/redo.png')
        .click(function () {
            if (curSlide)
                curSlide.redo();
        });

    var objMenuBar = div().appendTo(leftMenuBarWrapper).height(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
    var decoObjMenu = function (dv) {
        var wrapper = div().appendTo(objMenuBar).class("abs-option").size(28,28).hoverColor('#eeeeee','white').cursorPointer();
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
            obj.focus();
            curSlide.append(obj);
            trigger();
        }
    });
    var rectSmooth = div().deco(decoObjMenu).borderRadius(4).click(function () {
        if (curSlide) {
            var obj = absObject();
            obj.focus();
            obj.div().borderRadius(10);
            curSlide.append(obj);
            trigger();
        }
    });
    var circle = div().deco(decoObjMenu).borderRadius('100%').click(function () {
        if (curSlide) {
            var obj = absObject();
            obj.focus();
            obj.div().borderRadius('100%');
            curSlide.append(obj);
            trigger();
        }
    });

    var styleMenuBar = div().appendTo(leftMenuBarWrapper).height(30).marginLeft(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
    var decoStyleMenu = function (dv) {
        var wrapper = div().appendTo(styleMenuBar).class('abs-option').size(28,28).hoverColor('#eeeeee','white').cursorPointer();
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
            if (curDiv) {
                curDiv.color(c);
                trigger();
            }
        }
    };
    for (var i=0; i<colors.length; i++) {
        div().deco(decoStyleMenu).color(colors[i]).click(getColorFn(colors[i]));
    }

    var rightMenuBarWrapper = div().appendTo(menuBar).size('30%','100%').padding(10);
    var userBar = div().appendTo(rightMenuBarWrapper).size('100%','30%').border(borderGray).borderRadius(3)
        .text(username).fontColor('gray').textAlignRight().paddingRight(10);
    var objStateBar = div().appendTo(rightMenuBarWrapper).size('100%','70%').border(borderGray).borderRadius(3)
        .overflowAuto().fontColor('gray');


    /** Initialize **/

    var slideManager = new SlideManager();
    var curSlide, curObj, curDiv;
});