require(['ABSdecoration', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'], function (ABSdeco) {

    /** set user authentication **/

    var authFactory = function () {
        var ainfo = JSON.parse(localStorage.getItem('ainfo'));
        var aauth = localStorage.getItem('aauth');
        return {
            getUsername: function () {
                return (ainfo && ainfo.username);
            },
            getToken: function () {
                return aauth;
            }
        };
    }();
    var username = authFactory.getUsername();
    var token = authFactory.getToken();
    if (!username || !token) {
        $(location).attr('href', '/?app=signin');
        alert('로그인 페이지로 이동합니다.')
        return;
    }

    /** colors **/
    var borderGray = '1px solid #cccccc', borderGrayStrong = '1px solid #999999',
        slideListColor = '#eeeeee', slideEditorColor = '#dddddd', statusBarColor = '#cccccc';

    /** utils **/

    Div.prototype.getABSstyle = function () {
        var params = $.extend({}, this.params());
        params.top = this.css('top');
        params.left = this.css('left');
        params.width = this.widthPixel();
        params.height = this.heightPixel();
        return params;
    };

    var getParams = function (dv) {
        return {
            id: dv.id(),
            style: dv.getABSstyle(),
            text: dv.text()
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
                    dv.css(prop, params.style[prop]);
            }
            else {
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
                dv.css(prop, params.style[prop]);
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
    var trigger = function (fn) {
        if (curSlide) {
            syncBlock();
            curSlide.resetRedo();
        }
        if (curDiv && curObj) {
            var prevParams = curObj.getParams();
            curSlide.addUndo(prevParams);
            curObj.setParams();
        }
        if (typeof fn === 'function')
            fn();
    };

    /** events **/

    var onZoom = function () {
        if (!isFullscreen) {
            if (curSlide) {
                curSlide.full();
                isFullscreen = true;
            }
        }
    };

    var onUndo = function () {
        if (curSlide)
            curSlide.undo();
    };

    var onRedo = function () {
        if (curSlide)
            curSlide.redo();
    };

    var onSave = function () {
        var fName = prompt('파일명을 입력해주세요.');
        if (fName == null)
            return;
        fileName.text(fName);
        // localStorage.setItem('abs-params-' + fName, JSON.stringify(slideManager.export()));
        var param = {
            cid:'ambasa',
            token:token,
            key:fName,
            value:JSON.stringify(slideManager.export())
        };
        $.get("/hashstore/put", param)
            .done(function (data) {
                if (data.resultCode == 0) {
                    alert('저장하였습니다.');
                }
                else {
                    console.log(data.msg);
                    alert('실패하였습니다.');
                }
            });
    };

    var onLoad = function () {
        var fName = prompt('파일명을 입력해주세요.');
        if (fName == null)
            return;

        var param = {
            cid:'ambasa',
            token:token,
            key:fName,
        };
        // var params = JSON.parse(localStorage.getItem('abs-params-' + fName));
        $.get("/hashstore/get", param)
            .done(function (data) {
                if (data.info.length > 0) {
                    var params = JSON.parse(data.info[0].value);
                    fileName.text(fName);
                    slideManager.load(params);
                } else {
                        alert('해당 파일을 불러올 수 없습니다.');
                }
                console.log(data);
            });
    };

    var onDelete = function () {
        if (curObj) {
            curObj.remove();
        }
        else if (curSlide) {
            slideManager.del()
        }
    };

    var onCopy = function () {
        if (curObj) {
            copyParam = curObj.getParams();
        }
    };

    var onPaste = function () {
        copyParam.id = idGenerator.get();
        var obj = absObject(copyParam);
        obj.focus();
        curSlide.append(obj);
        trigger();
    };

    /** basic setting for layout **/

        // var w = window.outerWidth, h = window.outerHeight;
    var w = 1280, h = 800;
    var menuBarWidth = w, menuBarHeight = 100, statusBarWidth = w, statusBarHeight = 30,
        slideListWidth = 220, slideListHeight = h - menuBarHeight - statusBarHeight,
        slideEditorWidth = w - slideListWidth, slideEditorHeight = slideListHeight;
    var parent = div().append().size(w, h);
    var menuBar = div().appendTo(parent).size(menuBarWidth, menuBarHeight).borderBottom(borderGray);
    var slideList = div().appendTo(parent).size(slideListWidth, slideListHeight).borderRight(borderGray).color(slideListColor).overflowAuto();
    var slideEditor = div().appendTo(parent).size(slideEditorWidth, slideEditorHeight).color(slideEditorColor).overflowAuto();
    var statusBar = div().appendTo(parent).size(statusBarWidth, statusBarHeight).color(statusBarColor).borderTop(borderGrayStrong).padding(4);
    var blank = div().displayNone();
    var refresh = function () {
        blank.append();
    };

    /** set slide background **/

        // calculate sbg width and height
    var sbgMargin = slideEditorWidth / 8, ratio = 1; // 전체 화면과 Editor 상 background 사이의 비율
    var sbgMaxWidth = slideEditor.widthPixel() - 2 * sbgMargin, sbgMaxHeight = slideEditor.heightPixel() - 2 * sbgMargin;
    if (h * sbgMaxWidth < w * sbgMaxHeight)
        ratio = w / sbgMaxWidth;
    else
        ratio = h / sbgMaxHeight;
    var sbgWidth = w / ratio, sbgHeight = h / ratio;
    var sbgMarginLeft = (slideEditorWidth - sbgWidth) / 2, sbgMarginTop = (slideEditorHeight - sbgHeight) / 2;
    var getSlideBackground = function () {
        return div().appendTo(slideEditor).size(sbgWidth, sbgHeight).position('absolute').color('white').boxShadow('0px 5px 20px #888888');
    };
    slideEditor.paddingLeft(sbgMarginLeft).paddingTop(sbgMarginTop);

    /** set fullscreen viewer **/

    var ww = window.outerWidth, wh = window.outerHeight, zoomRatio = 1;
    var fullscreenViewer = div().append().size(ww, wh).displayNone().color('black');
    if (wh * sbgWidth > ww * sbgHeight) {
        zoomRatio = ww / sbgWidth;
        fullscreenViewer.paddingTop((wh - sbgHeight * zoomRatio) / 2);
    }
    else {
        zoomRatio = wh / sbgHeight;
        fullscreenViewer.paddingLeft((ww - sbgWidth * zoomRatio) / 2);
    }

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
        $("#abs-slide-context-menu").hide(100);
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
        for (var i = 0; i < targets.length; i++) {
            if (targets[i].id.startsWith("ABS-"))
                checkObject = true;
        }
        // target이 option인지 확인
        var checkOption = false;
        for (i = 0; i < targets.length; i++) {
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
            _id = parseInt(_id.slice(4, _id.length));
            if (id <= _id)
                id = _id + 1;
        };
        return this;
    })();


    /** ABS Object **/

    var ABSObject = function (params) {
        var that = this;
        var dv = div().class('abs-object').size(100, 100).draggable().resizable({handles: 'n, s, e, w, ne, se, nw, sw'})
            .color('initial').cursorMove().position('absolute').left(-sbgMarginLeft + 10).top(-sbgMarginTop + 10)
            .borderWidth('1px').borderStyle('solid').borderColor('black');

        // remove icon and resize ui-resizable-se
        $(dv.$.children().removeClass('ui-icon')[5]).css('width', '9px').css('height', '9px').css('right', '-5px').css('bottom', '-5px');
        dv.mousedown(function (e) {
            that.focus();
        }).mouseup(function () {
            var style1 = getParams(dv).style, style2 = params.style;
            // trigger only when changed
            if (style1.top !== style2.top || style1.left !== style2.left
                || style1.width !== style2.width || style1.height !== style2.height)
                trigger();
        });

        var id;
        if (params) {
            id = params.id;
            idGenerator.set(id);
            redoStyle(dv, params);
        }
        else {
            id = idGenerator.get();
            params = {id: id, style: {'display': 'none'}};
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
            dv.$.children('.ui-resizable-handle:lt(4)').css('border', '1px dotted gray');
            dv.$.children('.ui-resizable-handle:gt(3)').css('border', '1px solid black').css('background-color', 'white');
            objStatus.text('id : ' + id);
        };

        this.deactive = function () {
            dv.$.children().css('border', 'none').css('background-color', 'initial');
            objStatus.text('');
        };

        this.remove = function () {
            dv.displayNone();
            that.deactive();
            trigger(function () {
                curObj = undefined;
                curDiv = undefined;
            });
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
        var undolist = [], redolist = [];

        // style slide block
        var blockWrapperHeight = 130, blockHeight = blockWrapperHeight * 0.85, slideViewerWidth = blockHeight * w / h;
        var blockWrapper = div().appendTo(slideList).size('100%', blockWrapperHeight).paddingTop(blockWrapperHeight / 10)
            .setSlideContextMenu(this);
        var block = div().appendTo(blockWrapper);
        var numberViewer = div().appendTo(block).size(10, blockHeight).margin(5).text('1');
        var slideViewerWrapper = div().size(slideViewerWidth + 4, blockHeight + 4).appendTo(block);
        var slideViewer = div().appendTo(slideViewerWrapper).size(slideViewerWidth, blockHeight).color('white').overflowAuto();

        var slideBackground = getSlideBackground().appendTo(slideEditor);

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
            slideViewerWrapper.border('2px solid #BF360C').padding(0);
            slideBackground.displayInlineBlock();
            pageCur.text(numberViewer.text());
            curBackground = slideBackground;
        };

        this.deactive = function () {
            slideViewerWrapper.border(borderGray).padding(1);
            slideBackground.displayNone();
        };

        this.full = function () {
            if (curObj)
                curObj.deactive();
            curObj = undefined;
            curDiv = undefined;
            parent.displayNone();
            fullscreenViewer.displayInlineBlock();
            curBackground.appendTo(fullscreenViewer).overflowHidden();
            curBackground.css('zoom', (100 * zoomRatio) + '%');
        };

        this.unfull = function () {
            parent.displayInlineBlock();
            fullscreenViewer.displayNone();
            curBackground.appendTo(slideEditor).overflow('initial');
            curBackground.css('zoom', 'initial');
        };

        this.setIdx = function (idx) {
            numberViewer.text(idx);
        };

        this.getIdx = function () {
            return parseInt(numberViewer.text());
        };

        this.remove = function () {
            blockWrapper.remove();
            slideBackground.remove();
            refresh();
        };

        this.syncBlock = function (callback) {
            html2canvas(slideBackground.htmlElement(), {
                onrendered: function (canvas) {
                    slideViewer.image(canvas.toDataURL("image/png"));
                    slideViewer.$image.load(callback);
                }
            });
        };

        // ABS Object를 추가합니다.
        this.append = function (obj) {
            obj.div().appendTo(slideBackground);
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
            for (id in params) {
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
                var dv = $('#' + param.id).data('div');
                redolist.push(getParams(dv));
                undoStyle(dv, param);
                if (curSlide) {
                    var obj = curSlide.get(param.id);
                    obj.setParams();
                    obj.focus();
                }
                syncBlock();
            }
        };

        this.redo = function () {
            if (redolist.length > 0) {
                var param = redolist.pop();
                var dv = $('#' + param.id).data('div');
                undolist.push(getParams(dv));
                redoStyle(dv, param);
                if (curSlide) {
                    var obj = curSlide.get(param.id);
                    obj.setParams();
                    obj.focus();
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
            pageTotal.text(slides.length);
        };

        // curSlide을 지운다.
        this.del = function () {
            if (curSlide) {
                var idx = curSlide.getIdx() - 1;
                var slide = slides.splice(idx, 1)[0];
                slide.remove();
                for (var i = idx; i < slides.length; i++) {
                    slides[i].setIdx(i + 1);
                }
                curSlide = undefined;
                pageCur.text(0);
                pageTotal.text(slides.length);
            }
        };
        this.next = function () {
            var next = curSlide.getIdx();
            if (next < slides.length) {
                curSlide.deactive();
                if (isFullscreen)
                    curSlide.unfull();
                curSlide = slides[next];
                curSlide.focus()
                if (isFullscreen)
                    curSlide.full();
            }
        };
        this.prev = function () {
            var prev = curSlide.getIdx() - 2;
            if (prev >= 0) {
                curSlide.deactive();
                if (isFullscreen)
                    curSlide.unfull();
                curSlide = slides[prev];
                curSlide.focus();
                if (isFullscreen)
                    curSlide.full();
            }
        };

        this.export = function () {
            var params = [];
            for (var i = 0; i < slides.length; i++) {
                params.push(slides[i].export());
            }
            return params;
        };

        this.clear = function () {
            for (var i = 0; i < slides.length; i++) {
                slides[i].remove();
                curSlide = undefined;
                curObj = undefined;
                curDiv = undefined;
            }
            slides = [];
            pageCur.text(0);
            pageTotal.text(slides.length);
        };
        this.load = function (params) {
            this.clear();
            for (var i = 0; i < params.length; i++) {
                this.new();
                slides[i].load(params[i]);
            }
        };
    };


    /** menu bar **/

    var leftMenuBarWrapper = div().appendTo(menuBar).size('70%', '100%');
    var fileInfoHeader = div().appendTo(leftMenuBarWrapper).size('100%', 60);
    var fileName = div().appendTo(fileInfoHeader).size(200, 30).margin(20).text('제목 없는 프레젠테이션').fontColor('gray').fontSize(20);

    var slideMenuBar = div().appendTo(leftMenuBarWrapper).size('35%', 40);
    var decoSlideMenuButton = function (div) {
        div.size(25, 25).marginLeft(20).cursorPointer();
    };
    var newSlideButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/newslide.png').marginLeft(30)
        .click(function () {
            slideManager.new();
        });
    var delSlideButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/delslide.png')
        .click(function () {
            slideManager.del();
        });
    var saveButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/save.png').click(onSave);
    var loadButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/load.png').click(onLoad);
    var undoButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/undo.png').click(onUndo);
    var redoButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/redo.png').click(onRedo);
    var objMenuBar = div().appendTo(leftMenuBarWrapper).height(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
    var decoObjMenu = function (dv) {
        var wrapper = div().appendTo(objMenuBar).class("abs-option").size(28, 28).hoverColor('#eeeeee', 'white').cursorPointer();
        dv.appendTo(wrapper).size(15, 15).border(1);
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
        var wrapper = div().appendTo(styleMenuBar).class('abs-option').size(28, 28).hoverColor('#eeeeee', 'white').cursorPointer();
        dv.appendTo(wrapper).size(15, 15).border(1);
        wrapper.alignMiddle();
        dv.click = function (fn) {
            wrapper.click(fn);
            return dv;
        }
    };
    var colors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'];
    var getColorFn = function (c) {
        return function () {
            if (curDiv) {
                curDiv.color(c);
                trigger();
            }
        }
    };
    for (var i = 0; i < colors.length; i++) {
        div().deco(decoStyleMenu).color(colors[i]).click(getColorFn(colors[i]));
    }

    var rightMenuBarWrapper = div().appendTo(menuBar).size('30%', '100%').padding(10);
    var userBar = div().appendTo(rightMenuBarWrapper).size('100%', '30%').border(borderGray).borderRadius(3)
        .text(username+'@amba.com').fontColor('gray').textAlignRight().paddingRight(10);
    var members = div().appendTo(rightMenuBarWrapper).size('100%', '70%').border(borderGray).borderRadius(3)
        .fontColor('gray').padding(10);
    var cntMember = 0;
    var insertMember = function (name) {
        var member = div().appendTo(members).floatRight().size(40,'100%').margin(5);
        div().appendTo(member).size('100%','90%').text(name).textAlignCenter();
        div().appendTo(member).size('100%','10%').color(colors[(++cntMember*11)%15]);
    };


    /** status bar **/

    var slideStatus = div().appendTo(statusBar).marginLeft(15);
    div().appendTo(slideStatus).text('Slide ').fontColor('#555555').marginLeft(5);
    var pageCur = div().appendTo(slideStatus).text('1').fontColor('#555555').marginLeft(5);
    div().appendTo(slideStatus).text(' of ').fontColor('#555555').marginLeft(5);
    var pageTotal = div().appendTo(slideStatus).text('1').fontColor('#555555').marginLeft(5);
    var objStatus = div().appendTo(statusBar).float('right').marginRight(20).fontColor('#555555');
    var showButton = div().appendTo(statusBar).size(20, 20).marginLeft(w - 300).cursorPointer().image('../images/abs-fullscreen.png').click(onZoom);

    /** key binding **/

    $(window).keydown(function (event) {
        // delete
        if (event.which === 8) {
            onDelete();
        }
        // esc
        if (event.which === 27) {
            if (isFullscreen && curSlide) {
                event.preventDefault();
                curSlide.unfull();
                isFullscreen = false;
            }
        }
        // F5
        else if (event.which === 116) {
            event.preventDefault();
            onZoom();
        }
        // Enter
        else if (event.which === 13 && !curObj) {
            event.preventDefault();
            slideManager.new();
        }
        // up key
        else if (event.which === 38 && !curObj && curSlide) {
            event.preventDefault();
            slideManager.prev();
        }
        // down key or space bar
        else if ((event.which === 40 || event.which === 32)&& !curObj && curSlide) {
            event.preventDefault();
            slideManager.next();
        }
        else if (event.ctrlKey) {
            // Ctrl + Shift + Z
            if (event.shiftKey && event.which === 90) {
                event.preventDefault();
                onRedo();
            }
            // Ctrl + Z
            else if (event.which === 90) {
                event.preventDefault();
                onUndo();
            }
            // Ctrl + S
            else if (event.which === 83) {
                event.preventDefault();
                onSave();
            }
            // Ctrl + O
            else if (event.which === 79) {
                event.preventDefault();
                onLoad();
            }
            // Ctrl + C
            else if (event.which === 67) {
                event.preventDefault();
                onCopy();
            }
            // Ctrl + V
            else if (event.which === 86) {
                event.preventDefault();
                onPaste();
            }
        }
    });

    /** Initialize **/

    var slideManager = new SlideManager();
    var curSlide, curBackground, curObj, curDiv;
    var isFullscreen = false;
    var copyParam;
    slideManager.new();
    insertMember(username);
    insertMember('kks');
    insertMember('yjs');
});