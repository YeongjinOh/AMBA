require(['ABSdecoration', 'ABSanimation', 'OnlineManager', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'], function (ABSdeco, ABSanimation, online) {

    /////////////////////////////////////////////////////////////////
    ////
    ////    Basic setting
    ////
    /////////////////////////////////////////////////////////////////

    /** set global module **/
    window.ambasa = {};

    var useOnline = true;

    var isServer = true, isJoining = true, isEdit = false;
    var roomid = undefined;

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



    // local에서 client 2개 띄우기 위해 랜덤값 부여
    // var username = Math.random();
    var username = authFactory.getUsername();
    var token = authFactory.getToken();
    if (!username || !token) {
        $(location).attr('href', '/?app=signin');
        alert('로그인 페이지로 이동합니다.');
        return;
    }

    /** connect online **/
    if (useOnline)
        online.connect();
    var joinOnline = function (fName) {
        if (useOnline) {
            roomid = fName;
            online.join(roomid);
            online.onRecieve(function (data) {
                if (data.action === 'broadcast_msg') {
                    console.log('onRecieve');
                    console.log(data);
                    var action = JSON.parse(data.message.msg);
                    if (action.target === 'obj' || action.target === 'slide') {

                        actionManager.get(action);
                    }
                    // 내가 서버이고, 새로운 클라이언트가 접속하면 클라이언트임을 알려주고, 접속자 리스트를 보낸다.
                    else if (isServer && action.target === 'server' && action.action === 'join') {
                        var members = memberManager.getMembers();
                        var actionParams = actionManager.export();
                        online.sendMessage({
                            roomid: roomid,
                            msg: JSON.stringify({
                                target: 'client',
                                action: 'join',
                                members: members,
                                actionParams: actionParams
                            }),
                            username: username
                        });
                        memberManager.insertMember(data.message.username);
                    }
                    else if (action.target === 'client' && action.action === 'join') {
                        if (isJoining) {
                            var actionParams = action.actionParams;
                            actionManager.syncActions(actionParams);
                            isServer = false;
                            isJoining = false;
                        }
                        var members = action.members;
                        memberManager.setMembers(members);
                    }
                    else if (action.target === 'undo') {
                        actionManager.prev();
                    }
                    else if (action.target === 'redo') {
                        actionManager.next();
                    }
                }
            });
            online.sendMessage({
                roomid: roomid,
                msg: JSON.stringify({
                    target: 'server',
                    action: 'join'
                }),
                username: username
            });
        }
    };


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
    var setStyle = function (dv, prop, val) {
        if (checkTextProp(prop))
            dv.cssText(prop, val);
        else
            dv.css(prop, val);
    };
    var setAllStyles = function (dv, style) {
        for (var prop in style) {
            setStyle(dv, prop, style[prop]);
        }
    };
    var syncBlock = function () {
        if (isLoading)
            return;
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
    var getSlideNum = function () {
        if (curSlide)
            return curSlide.getIdx();
    };
    var lock = function () {
        lockAction = true;
    };
    var unlock = function () {
        lockAction = false;
    };
    var lockDel = function () {
        isEdit = true;
    };
    var unlockDel = function () {
        isEdit = false;
    };


    /////////////////////////////////////////////////////////////////
    ////
    ////    Actions
    ////
    /////////////////////////////////////////////////////////////////


    /** ambasa actions protocol **/

    var filterProp = function (obj, props) {
        var res = {};
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (obj[prop] !== undefined)
                res[prop] = obj[prop];
            else
                res[prop] = 'initial';
        }
        return res;
    };
    var getABSbyId = function (id) {
        return $('#' + id).data('ambasa');
    };
    var getDivById = function (id) {
        if (isFullscreen)
            id += '-clone';
        return $('#' + id).data('div');
    };
    var syncBlockbyId = function (id) {
        if (isLoading)
            return;
        if (curObj) {
            curObj.deactive();
        }
        var slide = slideManager.get(id);
        if (slide)
            slide.syncBlock(function () {
                if (curObj) {
                    curObj.active();
                }
            });
        else
            console.log('can not find slide by id');
    };
    var syncBlocks = function (slides, visit, idx) {

        if (slides.length <= idx) {
            isLoading = false;
            return;
        }
        if (visit[idx]) {
            return;
        }
        visit[idx] = true;
        slides[idx].syncBlock(function () {
            syncBlocks(slides, visit, idx+1);
        });
    };

    var ActionManager = function () {
        var actions = [];
        var cur = -1;
        var length = 0;

        var add = function (action) {
            if (!lockAction) {
                actions[++cur] = action;
                length = cur + 1;
                if (useOnline && roomid) {
                    console.log('Send action');
                    console.log(action);
                    online.sendMessage({
                        roomid: roomid,
                        msg: JSON.stringify(action),
                        username: username
                    });
                }
            }
        };
        // action을 다른 사람을 통해 받은 경우
        this.get = function (action) {
            if (action.target === "undo") {
                lock();
                this.prev();
                unlock();
            }
            else if (action.target === "redo") {
                lock();
                this.next();
                unlock();
            }
            else {
                actions[cur + 1] = action;
                length = cur + 2;
                this.next();
            }
        };
        this.clear = function () {
            actions = [];
            cur = -1;
            length = 0;
        };

        this.prev = function () {
            if (cur >= 0 && length > 0) {
                lock();
                var actionObj = actions[cur--];
                if (actionObj.target === 'obj') {
                    switch (actionObj.action) {
                        case 'style':
                            var abs = getABSbyId(actionObj.id);
                            setAllStyles(abs.div(), actionObj.prev);
                            abs.setParams();
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'media':
                            var abs = getABSbyId(actionObj.id);
                            switch (actionObj.type) {
                                case 'text':
                                case 'html':
                                case 'ace':
                                    abs.div().text(actionObj.prev);
                                    break;
                                case 'image':
                                    abs.div().backgroundImage(actionObj.prev);
                                    break;
                                case 'video':
                                    abs.div().video(actionObj.id, actionObj.prev);
                                    break;
                                case 'audio':
                                    abs.div().audio(actionObj.id, actionObj.prev);
                                    break;
                                case 'module':
                                    abs.loadModule(actionObj.prev);
                                    break;
                                case 'iframe':
                                    abs.div().iframe(actionObj.prev);
                                    break;
                            }
                            abs.setParams();
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'new':
                            var slide = slideManager.get(actionObj.slide);
                            slide.removeObj(actionObj.id);
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'delete':
                            var slide = slideManager.get(actionObj.slide);
                            slide.append(new ABSObject(actionObj.params));
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'event':
                            var abs = getABSbyId(actionObj.id);
                            switch (actionObj.type) {
                                case 'click':
                                    abs.click(actionObj.prev);
                                    break;
                                case 'hover':
                                    abs.hover(actionObj.prev);
                                    break;
                            }
                            abs.setParams();
                            break;
                    }
                }
                else if (actionObj.target === 'slide') {
                    switch (actionObj.action) {
                        case 'new':
                            if (curSlide)
                                curSlide.deactive();
                            curSlide = slideManager.get(actionObj.slide);
                            slideManager.del();
                            break;
                        case 'delete':
                            slideManager.insert(actionObj.slide, actionObj.params);
                            break;
                        case 'copy':
                            slideManager.del(actionObj.slide);
                            break;
                        case 'load':
                            break;
                    }
                }
                unlock();
            }
        };
        this.next = function () {
            if (cur < length - 1) {
                lock();
                var actionObj = actions[++cur];
                if (actionObj.target === 'obj') {
                    switch (actionObj.action) {
                        case 'style':
                            var abs = $('#' + actionObj.id).data('ambasa');
                            setAllStyles(abs.div(), actionObj.cur);
                            abs.setParams();
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'media':
                            var abs = getABSbyId(actionObj.id);
                            switch (actionObj.type) {
                                case 'text':
                                case 'html':
                                case 'ace':
                                    abs.div().text(actionObj.cur);
                                    break;
                                case 'image':
                                    abs.div().backgroundImage(actionObj.cur);
                                    break;
                                case 'video':
                                    abs.div().video(actionObj.id, actionObj.cur);
                                    break;
                                case 'audio':
                                    abs.div().audio(actionObj.id, actionObj.cur);
                                    break;
                                case 'module':
                                    abs.loadModule(actionObj.cur);
                                    break;
                                case 'iframe':
                                    abs.div().iframe(actionObj.cur);
                                    break;
                            }
                            abs.setParams();
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'new':
                            var slide = slideManager.get(actionObj.slide);
                            slide.append(new ABSObject(actionObj.params));
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'delete':
                            var slide = slideManager.get(actionObj.slide);
                            slide.removeObj(actionObj.id);
                            syncBlockbyId(actionObj.slide);
                            break;
                        case 'event':
                            var abs = getABSbyId(actionObj.id);
                            switch (actionObj.type) {
                                case 'click':
                                    abs.click(actionObj.cur);
                                    break;
                                case 'hover':
                                    abs.hover(actionObj.cur);
                                    break;
                            }
                            abs.setParams();
                            break;
                    }
                }
                else if (actionObj.target === 'slide') {
                    switch (actionObj.action) {
                        case 'new':
                            slideManager.new();
                            break;
                        case 'delete':
                            if (curSlide)
                                curSlide.deactive();
                            curSlide = slideManager.get(actionObj.slide);
                            slideManager.del();
                            break;
                        case 'copy':
                            slideManager.copy(actionObj.params);
                            break;
                        case 'load':
                            break;
                    }
                }
                unlock();
            }
        };
        this.export = function () {
            var actionParams = {
                actions: actions,
                cur: cur
            };
            return actionParams;
        };
        this.syncActions = function (actionParams) {
            actions = actionParams.actions;
            length = actions.length;
            lock();
            for (var cur = -1; cur < actionParams.cur; cur++) {
                this.next();
            }
            unlock();
        };

        // drag, resize, change style
        this.onStyle = function (obj, props) {
            var prevStyle = obj.getParams().style;
            obj.setParams();
            var curStyle = obj.getParams().style;
            add({
                target: 'obj',
                action: 'style',
                id: obj.getId(),
                slide: getSlideNum(),
                prev: filterProp(prevStyle, props),
                cur: filterProp(curStyle, props)
            });
        };
        // text, video, image, audio
        this.onMedia = function (obj, type) {
            var prev = obj.getParams().media;
            obj.setParams();
            var cur = obj.getParams().media;
            add({
                target: 'obj',
                action: 'media',
                type: type,
                id: obj.getId(),
                slide: getSlideNum(),
                prev: prev,
                cur: cur
            })
        };
        // click, hover
        this.onEvent = function (obj, type) {
            var prev = obj.getParams()[type];
            obj.setParams();
            var cur = obj.getParams()[type];
            add({
                target: 'obj',
                action: 'event',
                type: type,
                id: obj.getId(),
                slide: getSlideNum(),
                prev: prev,
                cur: cur
            })
        };
        this.onNewObj = function (obj) {
            obj.setParams();
            add({
                target: 'obj',
                action: 'new',
                id: obj.getId(),
                slide: getSlideNum(),
                params: obj.getParams() // 새로 만들 때 전달받은 param
            });
        };
        this.onDelObj = function (obj) {
            add({
                target: 'obj',
                action: 'delete',
                id: obj.getId(),
                slide: getSlideNum(),
                params: obj.getParams() // 지우기 전의 param
            });
        };
        this.onNewSlide = function (id) {
            add({
                target: 'slide',
                action: 'new',
                slide: id
            })
        };
        // 지우기 전에 export한 parameter를 받는다!
        this.onDelSlide = function (slide) {
            add({
                target: 'slide',
                action: 'delete',
                slide: slide.getIdx(),
                params: slide.export()
            })
        };
        this.onCopySlide = function (slide, params) {
            add({
                target: 'slide',
                action: 'copy',
                slide: slide.getIdx(),
                params: params
            })
        };
        // action을 추가하진 않고, undo message를 보냄.
        this.sendUndo = function () {
            if (cur >= 0 && length > 0 && useOnline && !lockAction && roomid) {
                var action = {
                    target: 'undo'
                };
                online.sendMessage({
                    roomid: roomid,
                    msg: JSON.stringify(action),
                    username: username
                });
            }
        };
        this.sendRedo = function () {
            if (cur < length - 1 && useOnline && !lockAction && roomid) {
                var action = {
                    target: 'redo'
                };
                online.sendMessage({
                    roomid: roomid,
                    msg: JSON.stringify(action),
                    username: username
                });
            }
        };
    };
    var actionManager = new ActionManager();


    /////////////////////////////////////////////////////////////////
    ////
    ////    Event binding
    ////
    /////////////////////////////////////////////////////////////////


    /** events **/

    var onZoom = function () {
        if (!isFullscreen) {
            slideManager.full();
        }
    };
    var onExit = function () {
        if (isFullscreen) {
            slideManager.unfull();
            isFullscreen = false;
        }
    };
    var onNewSlide = function () {
        slideManager.new();
    };
    var onDelSlide = function () {
        slideManager.del();
    };
    var onUpSlide = function () {
        slideManager.up();
    };
    var onDownSlide = function () {
        slideManager.down();
    };
    var onUndo = function () {
        actionManager.sendUndo();
        actionManager.prev();
    };
    var onRedo = function () {
        actionManager.sendRedo();
        actionManager.next();
    };
    var onSave = function () {
        var fName = prompt('파일명을 입력해주세요.');
        if (fName == null || fName === defaultName) {
            alert('올바르지 않은 파일명입니다.')
            return;
        }
        fileName.text(fName);


        var postData = JSON.stringify(slideManager.export());
        console.log('postData:', postData.length);

        $.post("/hashstore/put",
            {
                cid: 'ambasa',
                token : token,
                akey: fName,
                value: postData
            }, function (data) {
                if (data.resultCode == 0) {
                    alert('저장하였습니다.');
                }
                else {
                    console.log(data.msg);
                    alert('실패하였습니다.');
                }
            });
    };
    var onLocalSave = function () {
        var fName = prompt('파일명을 입력해주세요.');
        if (fName == null || fName === defaultName) {
            alert('올바르지 않은 파일명입니다.');
            return;
        }
        localStorage.setItem('abs-params-' + fName, JSON.stringify(slideManager.export()));
        alert('저장하였습니다.');
    };
    var onLoad = function (fName) {
        if (typeof fName !== 'string') {
            var fName = prompt('파일명을 입력해주세요.');
            if (fName == null)
                return;
        }
        var param = {
            cid: 'ambasa',
            token: token,
            key: fName,
        };
        $.get("/hashstore/get", param)
            .done(function (data) {
                if (data.info.length > 0) {
                    lock();
                    var params = JSON.parse(data.info[0].value);
                    fileName.text(fName);
                    slideManager.load(params);
                    actionManager.clear();
                    unlock();
                } else {
                    alert('해당 파일을 불러올 수 없습니다.');
                }
            });
    };
    var onLocalLoad = function (fName) {
        if (typeof fName !== 'string') {
            var fName = prompt('파일명을 입력해주세요.');
            if (fName == null)
                return;
        }
        var params = JSON.parse(localStorage.getItem('abs-params-' + fName));
        if (params == undefined) {
            alert('파일을 찾을 수 없습니다.');
            return;
        }
        lock();
        fileName.text(fName);
        slideManager.load(params);
        actionManager.clear();
        unlock();
    };
    var onEnter = function (fName, userId) {
        var param = {
            cid: 'ambasa',
            hashkey: userId,
            key: fName,
        };
        // var params = JSON.parse(localStorage.getItem('abs-params-' + fName));
        $.get("/hashstore/get", param)
            .done(function (data) {
                if (data.info.length > 0) {
                    lock();
                    var params = JSON.parse(data.info[0].value);
                    fileName.text(fName);
                    slideManager.load(params);
                    actionManager.clear();
                    unlock();
                } else {
                    alert('해당 파일을 불러올 수 없습니다.');
                }
            });
        // localStorage.removeItem("ambasa");
    };
    var onDelete = function () {
        if (curObj && !isEdit) {
            curSlide.removeObj(curObj.getId());
        }
        // else if (curSlide) {
        //     slideManager.del()
        // }
    };
    var onCopy = function () {
        if (curObj) {
            copyParam = {
                type: 'object',
                param: curObj.getParams()
            };
        } else if (curSlide) {
            copyParam = {
                type: 'slide',
                param: curSlide.export()
            }
        }
    };
    var onPaste = function () {
        if (typeof copyParam !== 'object')
            return;
        if (copyParam.type === 'object') {
            var param = $.extend({}, copyParam.param);
            param.id = idGenerator.get();
            var obj = absObject(param);
            obj.focus();
            curSlide.append(obj);
            syncBlock();
        }
        else if (copyParam.type === 'slide') {
            var params = copyParam.param;
            slideManager.copy(params);
        }

    };
    var onAnimationViewer = function () {
        slideEditor.width(slideEditorWidthAni).paddingLeft(sbgMaringLeftAni);
        animationViewer.displayInlineBlock();
    };
    var offAnimationViewer = function () {
        slideEditor.width(slideEditorWidth).paddingLeft(sbgMarginLeft);
        animationViewer.displayNone();
    };

    /** key-event binding **/
    $(window).keydown(function (event) {
        // delete
        if (event.which === 8) {
            onDelete();
        }
        // esc
        if (event.which === 27) {
            if (isFullscreen && curSlide) {
                event.preventDefault();
                onExit();
            }
        }
        // F5
        else if (event.which === 116) {
            event.preventDefault();
            onZoom();
        }
        // Enter
        /*       else if (event.which === 13 && !curObj) {
         event.preventDefault();
         slideManager.new();
         }*/
        // up or left key
        else if ((event.which === 38 || event.which === 37) && isFullscreen) {
            event.preventDefault();
            slideManager.prev();
        }
        // down or right key or space bar
        else if ((event.which === 40 || event.which === 39 || event.which === 32) && isFullscreen) {
            event.preventDefault();
            slideManager.next();
        }
        else if (!event.shiftKey && !isFullscreen && curObj && event.which >= 37 && event.which <= 40) {
            var move = 5;
            // var param = curObj.getParams();
            var dv = curObj.div();
            if (event.altKey)
                move = 1;
            // left
            if (event.which === 37) {
                event.preventDefault();
                dv.css('left', parseInt(dv.left()) - move);
                actionManager.onStyle(curObj, ['left']);
                syncBlock();
            }
            // up
            else if (event.which === 38) {
                event.preventDefault();
                dv.css('top', parseInt(dv.top()) - move);
                actionManager.onStyle(curObj, ['top']);
                syncBlock();
            }
            // right
            else if (event.which === 39) {
                event.preventDefault();
                dv.css('left', parseInt(dv.left()) + move);
                actionManager.onStyle(curObj, ['left']);
                syncBlock();
            }
            // down
            else if (event.which === 40) {
                event.preventDefault();
                dv.css('top', parseInt(dv.top()) + move);
                actionManager.onStyle(curObj, ['top']);
                syncBlock();
            }
        }
        /** Ctrl Key **/
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
        /** Shift key **/
        else if (event.shiftKey) {
            // Shift + up
            if (event.which === 38 && !isFullscreen && curObj) {
                event.preventDefault();
                curObj.incZidx();
            }
            // Shift + down
            else if (event.which === 40 && !isFullscreen && curObj) {
                event.preventDefault();
                curObj.decZidx();
            }
        }
    });

    /** mouse-evnet binding **/

    // 다른 곳 클릭시 context-menu hide
    $(document).bind("mousedown", function (e) {
        if (isFullscreen) {
            // slideManager.next();
            return;
        }
        if (!$(e.target).parents("#abs-slide-context-menu").length > 0) {
            $("#abs-slide-context-menu").hide(100);
        }
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


    /////////////////////////////////////////////////////////////////
    ////
    ////    Define classes
    ////
    /////////////////////////////////////////////////////////////////


    /** id generator **/

    var IdGenerator = function (prefix) {
        var id = 0;
        this.get = function () {
            return prefix + id++;
        };
        this.set = function (_id) {
            _id = parseInt(_id.slice(4, _id.length));
            if (id <= _id)
                id = _id + 1;
        };
        return this;
    };
    var idGenerator = new IdGenerator('ABS-');
    var idSlideGenerator = new IdGenerator('ABSlide');

    /** ABS Object **/

    var ABSObject = function (_params, isClone) {
        var that = this, params = {};
        var dv = div().class('abs-object').size(100, 100).zIndex(10)
            .position('absolute').left(-sbgMarginLeft + 150).top(-sbgMarginTop + 10);
        dv.$.data('ambasa', this);

        var id, moduleName, iframeUrl, clickCode, hoverCode;


        // if (params.style === undefined)
        //     params.style = {};
        // set id
        if (typeof _params === 'object' && _params.id) {
            id = _params.id;
            idGenerator.set(id);
        }
        else {
            id = idGenerator.get();
            params.id = id;
        }

        // default
        clickCode = 'function(dv, e) {\n\t// var other = getDivById("'+id+'")\n}';
        params.click = clickCode;
        hoverCode = 'dv.hover(function () {\n\t//hover in\n}, function () {\n\t//hover out\n})';
        params.hover = hoverCode;

        // initialize if params given
        /**
         * params = {
         *  type
         *  media
         *  click
         *  hover
         *  style
         *  id
         *  ...
         * }
         */
        if (_params) {
            params = $.extend({}, _params);
            setAllStyles(dv, params.style);
            if (params.media !== undefined) {
                switch (params.type) {
                    case 'text':
                        dv.text(params.media);
                        break;
                    case 'image':
                        dv.backgroundImage(params.media);
                        break;
                    case 'video':
                        dv.video(id, params.media);
                        break;
                    case 'audio':
                        dv.audio(id, params.media);
                        break;
                    case 'html':
                        if (isClone)
                            dv.html(params.media);
                        else {
                            dv.tinymce({
                                inline: true,
                                plugins: "textcolor",
                                toolbar: "styleselect fontselect fontsizeselect | bullist numlist outdent indent | forecolor backcolor",
                                width: '100%'
                            }, function (child) {
                                child.focusin(function () {
                                    lockDel();
                                }).focusout(function () {
                                    unlockDel();
                                    actionManager.onMedia(that, 'html');
                                })
                            });
                            dv.text(params.media);
                        }
                        break;
                    case 'ace':

                        var viewerWrapper = div().border('10px ridge white').position('absolute').resizable().draggable().zIndex(15);
                        var viewer = div().appendTo(viewerWrapper).size('100%', '100%').overflowAuto().color('white');
                        // ace run button
                        div().appendTo(dv).size(20, 20).image('../images/abs-play.png')
                            .position('absolute').top(-20).right(40).cursorPointer()
                            .click(function () {
                                var ctext = '(function(){' + dv.text() + '\n})();';
                                var acode = {ctext: ctext, deps: [], cid: 'none'};
                                localStorage.setItem('acode', JSON.stringify(acode));
                                // set viewer
                                viewerWrapper.size(dv.widthPixel(), dv.heightPixel()).top(0).left(0).appendTo(dv).displayInlineBlock();
                                viewer.empty().iframe('/?app=viewer');
                                viewer.$iframe.appendTo(viewer.$);
                            });
                        div().appendTo(dv).size(20, 20).padding(3).image('../images/abs-stop.png')
                            .position('absolute').top(-23).right(20).cursorPointer()
                            .click(function () {
                                viewerWrapper.displayNone();
                            });
                        // ace full button
                        div().appendTo(dv).size(20, 20).padding(3).image('../images/abs-fullscreen2.png')
                            .position('absolute').top(-23).right(0).cursorPointer()
                            .click(function () {
                                var ctext = '(function(){' + dv.text() + '\n})();';
                                var acode = {ctext: ctext, deps: [], cid: 'none'};
                                localStorage.setItem('acode', JSON.stringify(acode));
                                window.open('/?app=viewer')
                            });
                        dv.$ace = div().aceEditor().text(params.media).size('100%', '100%')
                            .focusin(function () {
                                lockDel();
                            }).focusout(function () {
                                unlockDel();
                                actionManager.onMedia(that, 'ace');
                            });
                        dv.text = function (txt) {
                            return dv.$ace.text(txt)
                        };
                        break;
                    case 'module':
                        moduleName = params.media;
                        if (moduleName !== '') {
                            require(['/jsloader/module/' + moduleName], function (module) {
                                if (module && module.appendTo)
                                    module.appendTo(dv);
                            });
                        }
                        break;
                    case 'iframe':
                        iframeUrl = params.media;
                        if (iframeUrl !== '') {
                            dv.iframe(iframeUrl);
                        }
                        break;
                }
            }
            if (params.click)
                clickCode = params.click;
            // TODO : hover
            if (params.hover)
                hoverCode = params.hover;
        }
        // set click
        dv.click(function (dv, e) {
            if (clickCode)
                eval('(' + clickCode + ')(dv,e)');
        });
        dv.hover(function () {
            if (hoverCode)
                eval(hoverCode);
        });


        // additional initializtion
        dv.id(id);

        if (isClone !== true) {
            dv.resizable({handles: 'n, s, e, w, ne, se, nw, sw'}).draggable().cursorMove();
            $(dv.$.children().removeClass('ui-icon')[5]).css('width', '9px').css('height', '9px').css('right', '-5px').css('bottom', '-5px');
            dv.mousedown(function (e) {
                that.focus();
            }).mouseup(function () {
                var style1 = getParams(dv).style, style2 = params.style;
                if (style1.top !== style2.top || style1.left !== style2.left || style1.width !== style2.width || style1.height !== style2.height) {
                    actionManager.onStyle(that, ['top', 'left', 'width', 'height']);
                    syncBlock();
                }
            });
            dv.setContextMenu(id);
        }
        if (dv.$ace)
            dv.$ace.appendTo(dv);

        this.focus = function () {
            if (curObj)
                curObj.deactive();
            curObj = that;
            curDiv = curObj.div();
            if (!isFullscreen)
                curObj.active();
        };
        this.active = function () {
            dv.$.children('.ui-resizable-handle:lt(4)').css('border', '1px dotted gray');
            dv.$.children('.ui-resizable-handle:gt(3)').css('border', '1px solid black').css('background-color', 'white');
            objStatus.text('id : ' + id);
        };
        this.deactive = function () {
            dv.$.children('.ui-resizable-handle:lt(9)').css('border', 'none').css('background-color', 'initial');
            objStatus.text('');
        };
        this.remove = function () {
            dv.remove();
            curObj = undefined;
            curDiv = undefined;
            actionManager.onDelObj(that);
            syncBlock();

        };
        this.div = function () {
            return dv;
        };

        this.setParams = function () {
            var dvParam = getParams(dv);
            params.id = dvParam.id;
            params.style = dvParam.style;
            switch (params.type) {
                case 'text':
                case 'html':
                case 'ace':
                    params.media = dvParam.text;
                    break;
                case 'image':
                    if (dvParam.style['background-image'])
                        params.media = dvParam.style['background-image'];
                    break;
                case 'video':
                    if (dv.$video && dv.$video.attr('src'))
                        params.media = dv.$video.attr('src');
                    break;
                case 'audio':
                    if (dv.$audio && dv.$audio.attr('src'))
                        params.media = dv.$audio.attr('src');
                    break;
                case 'module':
                    params.media = moduleName;
                    break;
                case 'iframe':
                    params.media = iframeUrl;
                    break;
            }
            params.click = clickCode;
            params.hover = hoverCode;
        };
        this.getParams = function () {
            return params;
        };
        this.getId = function () {
            return id;
        };
        this.incZidx = function () {
            dv.zIndex(parseInt(dv.zIndex()) + 1);
            actionManager.onStyle(this, ['z-index']);
        };
        this.decZidx = function () {
            dv.zIndex(parseInt(dv.zIndex()) - 1);
            actionManager.onStyle(this, ['z-index']);
        };
        this.loadModule = function (name) {
            moduleName = name;
            if (name == '') {
                dv.$.children(':gt(7)').remove();
            }
            else {
                require(['/jsloader/module/' + name], function (module) {
                    if (module && module.appendTo)
                        module.appendTo(dv);
                });
            }
        };
        this.loadIframe = function (url) {
            iframeUrl = url;
            dv.iframe(url);
        };
        this.click = function (codeStr) {
            clickCode = codeStr;
        };
        this.hover = function (codeStr) {
            hoverCode = codeStr;
        };
        return this;
    };

    var absObject = function (params, isClone) {
        var obj = new ABSObject(params, isClone);
        actionManager.onNewObj(obj);
        return obj;
    };


    /** Slide **/

    var Slide = function () {
        var that = this;

        // style slide block
        var blockWrapperHeight = 130, blockHeight = blockWrapperHeight * 0.85, slideViewerWidth = blockHeight * sbgWidth / sbgHeight;
        var blockWrapper = div().appendTo(slideList).size('100%', blockWrapperHeight).paddingTop(blockWrapperHeight / 10)
            .setSlideContextMenu(this);
        var block = div().appendTo(blockWrapper);
        var numberViewer = div().appendTo(block).size(10, blockHeight).margin(5).text('1');
        var slideViewerWrapper = div().size(slideViewerWidth + 4, blockHeight + 4).appendTo(block);
        var slideViewer = div().appendTo(slideViewerWrapper).size(slideViewerWidth, blockHeight).color('white').overflowAuto();
        var slideId = idSlideGenerator.get();
        var slideBackground = getSlideBackground().appendTo(slideEditor).id(slideId);
        slideBackground.$.data('abs-slide', this);

        // set animation viewer
        var aniViewer = div().size('100%', '100%').appendTo(animationViewer).color('gray');
        var absAnimation = ABSanimation.getInstance();
        absAnimation.init(aniViewer, function () {
            return curObj && curObj.getId()
        }, function () {
            return slideId;
        });
        absAnimation.append();
        var animationManager = absAnimation.animationManager();


        // ABS Objects
        var objs = {};

        blockWrapper.click(function () {
            that.focus();
            that.syncBlock();
        });

        this.get = function (id) {
            return objs[id];
        };
        this.removeObj = function (id) {
            objs[id].remove();
            delete objs[id];
        };
        this.focus = function () {
            if (curSlide)
                curSlide.deactive();
            curSlide = that;
            that.active();
        };
        this.display = function () {
            slideBackground.displayInlineBlock();
        };
        this.displayNone = function () {
            slideBackground.displayNone();
        };
        this.active = function () {
            slideViewerWrapper.border('2px solid #BF360C').padding(0);
            slideBackground.displayInlineBlock();
            aniViewer.displayInlineBlock();
            pageCur.text(numberViewer.text());
            curBackground = slideBackground;
        };
        this.deactive = function () {
            slideViewerWrapper.border(borderGray).padding(1);
            slideBackground.displayNone();
            aniViewer.displayNone();
        };
        this.play = function () {
            if (curObj)
                curObj.deactive();
            curObj = undefined;
            curDiv = undefined;
            slideShowManager.play(that.export().params);
            absAnimation.initShowtime();
        };
        this.setIdx = function (idx) {
            numberViewer.text(idx);
        };
        this.getIdx = function () {
            return parseInt(numberViewer.text());
        };
        this.getBlockWrapper = function () {
            return blockWrapper;
        };
        // 중간에 slide를 insert한 경우 순서를 맞춰 보여주기 위해서 detach와 attach를 한다.
        this.detach = function () {
            blockWrapper.detach();
        };
        this.attach = function () {
            blockWrapper.appendTo(slideList);
        };
        this.remove = function () {
            blockWrapper.remove();
            slideBackground.remove();
            aniViewer.remove();
            refresh();
        };
        this.syncBlock = function (callback) {
            if (curSlide)
                curSlide.displayNone();
            that.display();
            html2canvas(slideBackground.htmlElement(), {
                onrendered: function (canvas) {
                    slideViewer.image(canvas.toDataURL("image/png"));
                    slideViewer.$image.load(function () {
                        if (typeof callback === 'function') {
                            callback();
                        }
                        that.displayNone();
                        if (curSlide)
                            curSlide.display();
                    });
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
            for (var id in objs) {
                params[id] = objs[id].getParams();
            }
            var animationQueue = absAnimation.export();
            return {
                id:slideId,
                params: params,
                aniQueue: animationQueue
            };
        };
        this.load = function (slideParam) {
            if (slideParam.id)
                slideId = slideParam.id;
            slideBackground.id(slideId);
            var params = slideParam.params;
            var aniQueue = slideParam.aniQueue;
            absAnimation.import(aniQueue);
            for (var id in params) {
                var obj = absObject(params[id]);
                this.append(obj);
                syncBlock();
            }
        };

        // play animation;
        this.playNext = function () {
            if (animationManager.hasNext()) {
                console.log('play next - animation called');
                animationManager.next();
                return true;
            }
            return false;
        };
        this.playBack = function () {
            if (animationManager.hasBack()) {
                console.log('play back - animation called');
                animationManager.back();
                return true;
            }
            return false;
        }
    };


    /** Slide Manager **/

    var SlideManager = function () {
        var slides = [];

        this.new = function () {
            var slide = new Slide();
            slide.setIdx(slides.push(slide));
            slide.focus();
            syncBlock();
            actionManager.onNewSlide(slides.length);
            pageTotal.text(slides.length);
        };
        this.copy = function (slideParam) {
            var slide = new Slide();
            slide.focus();
            curSlide = slide;
            slide.setIdx(slides.push(slide));

            // 새로운 id의 오브젝트들을 생성
            var params = {};
            for (var id in slideParam.params) {
                var newId = idGenerator.get();
                params[newId] = $.extend({}, slideParam.params[id]);
                params[newId].id = newId;
            }
            var newSlideParam = {
                params: params,
                aniQueue: []
            };
            slide.load(newSlideParam);
            syncBlock();
            actionManager.onCopySlide(slide, slideParam);
            pageTotal.text(slides.length);
        };
        this.insert = function (idx, params) {
            // push back
            for (var i = slides.length - 1; i >= idx - 1; i--) {
                slides[i + 1] = slides[i];
                slides[i + 1].setIdx(i + 2);
            }
            var slide = new Slide();
            slide.setIdx(idx);
            slide.load(params);
            slide.focus();
            syncBlock();
            slides[idx - 1] = slide;
            for (i = 0; i < slides.length; i++)
                slides[i].detach();
            for (i = 0; i < slides.length; i++)
                slides[i].attach();
        };

        // curSlide을 지운다.
        this.del = function (idx) {
            if (idx !== undefined) {
                var slide = slides.splice(idx - 1, 1)[0];
                slide.remove();
                for (var i = idx; i < slides.length; i++) {
                    slides[i].setIdx(i + 1);
                }
                curSlide = undefined;
                pageCur.text(0);
                pageTotal.text(slides.length);
                return;
            }
            if (curSlide) {
                actionManager.onDelSlide(curSlide);
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
        this.up = function () {
            if (curSlide && curSlide.getIdx() > 1) {
                // change block order in block list
                var idx = curSlide.getIdx();
                var prev = slides[idx - 2].getBlockWrapper();
                prev.$.insertAfter(curSlide.getBlockWrapper().$);

                // change order in array slides
                var tmp = slides[idx - 1];
                slides[idx - 1] = slides[idx - 2];
                slides[idx - 2] = tmp;

                // change index order in block list
                slides[idx - 1].setIdx(idx);
                slides[idx - 2].setIdx(idx - 1);
            }
        };
        this.down = function () {
            if (curSlide && curSlide.getIdx() < slides.length) {
                // change block order in block list
                var idx = curSlide.getIdx();
                var next = slides[idx].getBlockWrapper();
                curSlide.getBlockWrapper().$.insertAfter(next.$);

                // change order in array slides
                var tmp = slides[idx - 1];
                slides[idx - 1] = slides[idx];
                slides[idx] = tmp;

                // change index order in block list
                slides[idx - 1].setIdx(idx);
                slides[idx].setIdx(idx + 1);
            }
        };
        this.next = function () {
            if (!curSlide.playNext()) {
                var next = curSlide.getIdx();
                if (next < slides.length) {
                    curSlide.deactive();
                    curSlide = slides[next];
                    curSlide.focus();
                    if (isFullscreen)
                        curSlide.play();
                }
            }
        };
        this.prev = function () {
            if (!curSlide.playBack()) {
                var prev = curSlide.getIdx() - 2;
                if (prev >= 0) {
                    curSlide.deactive();
                    curSlide = slides[prev];
                    curSlide.focus();
                    if (isFullscreen)
                        curSlide.play();
                }
            }
        };
        this.full = function () {
            if (curSlide) {
                parent.displayNone();
                curSlide.play();
                isFullscreen = true;
            }
        };
        this.unfull = function () {
            parent.displayInlineBlock();
            slideShowManager.stop();
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
            isLoading = true;
            this.clear();
            var visit = [];
            for (var i = 0; i < params.length; i++) {
                this.new();
                slides[i].load(params[i]);
                visit[i] = false;
            }
            syncBlocks(slides, visit, 0);
        };
        this.get = function (id) {
            return slides[id - 1];
        };
    };

    /** Slide Show Manager **/


    var SlideShowManager = function () {
        var ww = window.outerWidth, wh = window.outerHeight, zoomRatio = 1;
        var fullscreenViewer = div().appendTo(root).size(ww, wh).displayNone().color('black');
        if (wh * sbgWidth > ww * sbgHeight) {
            zoomRatio = ww / sbgWidth;
            fullscreenViewer.paddingTop((wh - sbgHeight * zoomRatio) / 2);
        }
        else {
            zoomRatio = wh / sbgHeight;
            fullscreenViewer.paddingLeft((ww - sbgWidth * zoomRatio) / 2);
        }

        var slideBackground = getSlideBackground().appendTo(fullscreenViewer).css('zoom', (100 * zoomRatio) + '%');

        this.play = function (params) {
            lock();
            // remove previous objects
            var children = slideBackground.children();
            for (var i = 0; i < children.length; i++) {
                children[i].remove();
            }

            // append current objects
            for (var id in params) {
                var param = $.extend({}, params[id]);
                param.id = param.id + '-clone';
                absObject(param, true).div().appendTo(slideBackground).cursorDefault();
            }
            fullscreenViewer.displayInlineBlock();
            unlock();
        };
        this.stop = function () {
            fullscreenViewer.displayNone();
        };
    };


    /////////////////////////////////////////////////////////////////
    ////
    ////    Style UI
    ////
    /////////////////////////////////////////////////////////////////


    /** basic setting for layout **/

        //var w = window.outerWidth, h = window.outerHeight;
//var w = 1280, h = 800;
    var w = window.outerWidth, h = window.outerHeight, zoom = window.innerWidth/w*100;
    var root = div().append().size(w,h).css('zoom',zoom+'%');


    var menuBarWidth = w, menuBarHeight = 100, statusBarWidth = w, statusBarHeight = 30,
        slideListWidth = 220, slideListHeight = h - menuBarHeight - statusBarHeight,
        slideEditorWidth = w - slideListWidth, slideEditorHeight = slideListHeight;

    var parent = div().appendTo(root).size(w, h);
    var menuBar = div().appendTo(parent).size(menuBarWidth, menuBarHeight).borderBottom(borderGray);
    var slideList = div().appendTo(parent).size(slideListWidth, slideListHeight).borderRight(borderGray).color(slideListColor).overflowAuto();
    var slideEditor = div().appendTo(parent).size(slideEditorWidth, slideEditorHeight).color(slideEditorColor).position('absolute').overflowHidden();

    // animation viewer
    var animationViewerWidth = 250;
    var animationViewer = div().appendTo(parent).size(animationViewerWidth, slideEditorHeight).color('white').border(1).floatRight();
    // .displayNone();

    // status bar
    var statusBar = div().appendTo(parent).size(statusBarWidth, statusBarHeight).color(statusBarColor).borderTop(borderGrayStrong).padding(4);

    // blank
    var blank = div().displayNone();
    var refresh = function () {
        blank.appendTo(root);
    };


    /** set slide background **/

        // calculate sbg width and height
    var dw = 1280, dh = 800;
    var sbgMargin = slideEditorWidth / 8, ratio = 1; // 전체 화면과 Editor 상 background 사이의 비율
    var sbgMaxWidth = slideEditor.widthPixel() - 2 * sbgMargin, sbgMaxHeight = slideEditor.heightPixel() - 2 * sbgMargin;
    if (dh * sbgMaxWidth < dw * sbgMaxHeight)
        ratio = dw / sbgMaxWidth;

    // var sbgMargin = slideEditorWidth / 8, ratio = 5/3; // 전체 화면과 Editor 상 background 사이의 비율
    // var sbgMaxWidth = slideEditor.widthPixel() - 2 * sbgMargin, sbgMaxHeight = slideEditor.heightPixel() - 2 * sbgMargin;
    var sbgWidth = dw * 0.6, sbgHeight = dh * 0.6, ratio;
    if (sbgHeight * slideEditorWidth < sbgWidth * slideEditorHeight)
        ratio = sbgWidth / slideEditorWidth;
    else
        ratio = sbgHeight / slideEditorHeight;
    // var dw = 1280, dh = 800;
    // var sbgWidth = dw, sbgHeight = dh;

    var sbgMarginLeft = (slideEditorWidth - sbgWidth) / 2, sbgMarginTop = (slideEditorHeight - sbgHeight) / 2;
    var slideEditorWidthAni = slideEditorWidth - animationViewerWidth, sbgMaringLeftAni = (slideEditorWidthAni - sbgWidth) / 2; // animationViewer가 나왔을 때의 width와 margin
    var getSlideBackground = function () {
        return div().appendTo(slideEditor).size(sbgWidth, sbgHeight).position('absolute').color('white').boxShadow('0px 5px 20px #888888');
    };
    slideEditor.paddingLeft(sbgMarginLeft).paddingTop(sbgMarginTop);


    /** set context menu **/

    // for ABS Object
    ABSdeco.initContextMenu(actionManager);
    ABSdeco.setKeyLocker({
        lock: lockDel,
        unlock: unlockDel
    });

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
    var contextMenuBar = div().appendTo(root).id('abs-slide-context-menu').width(80).zIndex(1000).position('absolute')
        .color('#cccccc').border('1px solid gray').borderRadius(2).overflowHidden().displayNone();
    var decoMenu = function (dv) {
        dv.size('100%', 25).padding(3).paddingLeft(10).cursorPointer().hoverColor('#999999', '#cccccc');
    };
    div().appendTo(contextMenuBar).deco(decoMenu).text('추가').click(function () {
        slideManager.new();
        $("#abs-slide-context-menu").hide(100);
    });
    div().appendTo(contextMenuBar).deco(decoMenu).text('삭제').click(function () {
        slideManager.del();
        $("#abs-slide-context-menu").hide(100);
    });
    div().appendTo(contextMenuBar).deco(decoMenu).text('위로').click(function () {
        slideManager.up();
        $("#abs-slide-context-menu").hide(100);
    });
    div().appendTo(contextMenuBar).deco(decoMenu).text('아래').click(function () {
        slideManager.down();
        $("#abs-slide-context-menu").hide(100);
    });


    /** menu bar **/

    var leftMenuBarWrapper = div().appendTo(menuBar).size('20%', '100%');
    var centerMenuBarWrapper = div().appendTo(menuBar).size('50%', '100%');
    var fileInfoHeader = div().appendTo(leftMenuBarWrapper).size('100%', 60);
    var centerTopMenuBar = div().appendTo(centerMenuBarWrapper).size('100%', 55);
    var defaultName = "제목 없는 프레젠테이션";
    var fileName = div().appendTo(fileInfoHeader).size(200, 30).margin(20).text(defaultName).fontColor('gray').fontSize(20);

    var slideMenuBar = div().appendTo(leftMenuBarWrapper).size('100%', 40);
    var decoSlideMenuButton = function (div) {
        div.size(25, 25).marginLeft(15).cursorPointer();
    };
    var decoSlideListButton = function (div) {
        div.size(20, 20).marginLeft(10).cursorPointer();
    };

    var localSaveButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/localSave.png').click(onLocalSave);
    var localLoadButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/localLoad.png').click(onLocalLoad);
    var saveButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/save.png').click(onSave);
    var loadButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/load.png').click(onLoad);
    var undoButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/undo.png').click(onUndo);
    var redoButton = div().appendTo(slideMenuBar).deco(decoSlideMenuButton).image('../images/redo.png').click(onRedo);

    // slidelist buttons
    var slideListButtons = div().appendTo(slideList).color('white').size('100%', 40).borderBottom(borderGray).padding(10);
    var newSlideButton = div().appendTo(slideListButtons).deco(decoSlideListButton).image('../images/newslide.png').click(onNewSlide);
    var delSlideButton = div().appendTo(slideListButtons).deco(decoSlideListButton).image('../images/delslide.png').click(onDelSlide);
    var upSlideButton = div().appendTo(slideListButtons).deco(decoSlideListButton).image('../images/arrowUp.png').click(onUpSlide);
    var downSlideButton = div().appendTo(slideListButtons).deco(decoSlideListButton).image('../images/arrowDown.png').click(onDownSlide);

    // object menu bar
    var objMenuBar = div().appendTo(centerMenuBarWrapper).height(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
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
            var obj = absObject({
                type: 'text',
                style: {
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': 'black',
                }
            });
            obj.focus();
            curSlide.append(obj);
        }
    });
    var rectSmooth = div().deco(decoObjMenu).borderRadius(4).click(function () {
        if (curSlide) {
            var obj = absObject({
                type: 'text',
                style: {
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': 'black',
                    'border-radius': '10px'
                }
            });
            obj.focus();
            curSlide.append(obj);
        }
    });
    var circle = div().deco(decoObjMenu).borderRadius('100%').click(function () {
        if (curSlide) {
            var obj = absObject({
                type: 'text',
                style: {
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': 'black',
                    'border-radius': '100%'
                }
            });
            obj.focus();
            curSlide.append(obj);
        }
    });

    var styleMenuBar = div().appendTo(centerMenuBarWrapper).height(30).marginLeft(30).margin(5).border(borderGray).borderRadius(3).overflowHidden();
    var decoStyleMenu = function (dv) {
        var wrapper = div().appendTo(styleMenuBar).class('abs-option').size(28, 28).hoverColor('#eeeeee', 'white').cursorPointer();
        dv.appendTo(wrapper).size(15, 15).border(1);
        wrapper.alignMiddle();
        dv.click = function (fn) {
            wrapper.click(fn);
            return dv;
        }
    };

    // color options
    var colors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'];
    var getColorFn = function (c) {
        return function () {
            if (curDiv) {
                curDiv.color(c);
                actionManager.onStyle(curObj, ['background-color']);
                syncBlock();
            }
        }
    };
    for (var i = 0; i < colors.length; i++) {
        div().deco(decoStyleMenu).color(colors[i]).click(getColorFn(colors[i]));
    }

    // type obj
    var typeObjBar = div().appendTo(centerTopMenuBar).height(30).border(1).margin(20).marginLeft(5).border(borderGray).borderRadius(4).overflowAuto();
    var decoTypeObj = function (dv) {
        dv.height('100%').fontColor('#555555').padding(5).cursorPointer().class('abs-option').hoverColor('#dddddd','white');
    };
    div().appendTo(typeObjBar).deco(decoTypeObj).text('Text').click(function () {
        if (curSlide) {
            var obj = absObject({
                type: 'html',
                style: {
                    width: '200px',
                    height: '120px'
                },
                media: ''
            });
            obj.focus();
            // tinymce option과 콜백 함수 전달
            curSlide.append(obj);
        }
    });
    div().appendTo(typeObjBar).deco(decoTypeObj).text('Image').click(function () {
        if (curSlide) {
            var obj = absObject({type: 'image', media: 'none'});
            obj.focus();
            curSlide.append(obj);
        }
    });
    div().appendTo(typeObjBar).deco(decoTypeObj).text('video').click(function () {
        if (curSlide) {
            var obj = absObject({type: 'video', media: ''});
            obj.focus();
            curSlide.append(obj);
        }
    });
    div().appendTo(typeObjBar).deco(decoTypeObj).text('Audio').click(function () {
        if (curSlide) {
            var obj = absObject({type: 'audio', media: ''});
            obj.focus();
            curSlide.append(obj);
        }
    });
    div().appendTo(typeObjBar).deco(decoTypeObj).text('IDE').click(function () {
        if (curSlide) {
            var obj = absObject({
                type: 'ace', media: '', style: {
                    width: '300px',
                    height: '120px'
                }
            });
            obj.focus();
            curSlide.append(obj);
        }
    });
    div().appendTo(typeObjBar).deco(decoTypeObj).text('Module').click(function () {
        if (curSlide) {
            var obj = absObject({
                type: 'module', media: '', style: {
                    width: '300px',
                    height: '400px'
                }
            });
            obj.focus();
            curSlide.append(obj);
        }
    });
    div().appendTo(typeObjBar).deco(decoTypeObj).text('Iframe').click(function () {
        if (curSlide) {
            var obj = absObject({
                type: 'iframe', media: '', style: {
                    width: '300px',
                    height: '400px',
                    border: '10px ridge white'
                }
            });
            obj.focus();
            curSlide.append(obj);
        }
    });


    /** set telegram **/
    var showTelegram = false;
    var onTelegram = function () {
        if (showTelegram)
            teleWrapper.fadeOut(300);
        else
            teleWrapper.fadeIn(300);
        showTelegram = !showTelegram;
    };
    var teleWrapper = div();
    if (useOnline)
        teleWrapper.appendTo(parent).iframe('/?app=telegram').border('8px ridge #dddddd').position('absolute')
            .draggable().resizable().top(100).left(30).displayNone().color('white');


    // animation viewer switch
    var isAniViewerOn = false;
    var switchAnimationViewer = function () {
        if (isAniViewerOn)
            offAnimationViewer();
        else
            onAnimationViewer();
        isAniViewerOn = !isAniViewerOn;
    };
    var buttonTelegram = div().appendTo(centerTopMenuBar).class('abs-option').margin(5).marginTop(20).padding(3).border(borderGray).borderRadius(4)
        .text('Telegram').fontColor('gray').floatRight().cursorPointer().hoverColor('#eeeeee', 'white')
        .click(onTelegram);

    var buttonAnimation = div().appendTo(centerTopMenuBar).class('abs-option').margin(5).marginTop(20).padding(3).border(borderGray).borderRadius(4)
        .text('Animation').fontColor('gray').floatRight().cursorPointer().hoverColor('#eeeeee', 'white')
        .click(switchAnimationViewer);


    var rightMenuBarWrapper = div().appendTo(menuBar).size('30%', '100%').padding(10);
    var userBar = div().appendTo(rightMenuBarWrapper).size('100%', '30%').border(borderGray).borderRadius(3)
        .text(username + '@amba.com').fontColor('gray').textAlignRight().paddingRight(10);
    var membersViewer = div().appendTo(rightMenuBarWrapper).size('100%', '70%').border(borderGray).borderRadius(3)
        .fontColor('gray').padding(10);
    var MemberManager = function () {
        var cntMember = 0;
        var members = [];
        this.insertMember = function (name) {
            for (var i = 0; i < members.length; i++) {
                if (members[i] === name)
                    return;
            }
            members.push(name);
            var member = div().appendTo(membersViewer).floatRight().size(60, '100%').margin(5).displayNone().fadeIn(400).overflowHidden();
            div().appendTo(member).size('100%', '90%').text(name).textAlignCenter();
            div().appendTo(member).size('100%', '10%').color(colors[(++cntMember * 11) % 15]);
        };
        this.setMembers = function (members) {
            for (var i = 0; i < members.length; i++) {
                this.insertMember(members[i]);
            }
        };
        this.getMembers = function () {
            return members;
        }
    };


    /** status bar **/

    var slideStatus = div().appendTo(statusBar).marginLeft(15);
    div().appendTo(slideStatus).text('Slide ').fontColor('#555555').marginLeft(5);
    var pageCur = div().appendTo(slideStatus).text('1').fontColor('#555555').marginLeft(5);
    div().appendTo(slideStatus).text(' of ').fontColor('#555555').marginLeft(5);
    var pageTotal = div().appendTo(slideStatus).text('1').fontColor('#555555').marginLeft(5);
    var objStatus = div().appendTo(statusBar).float('right').marginRight(20).fontColor('#555555');
    var showButton = div().appendTo(statusBar).size(20, 20).marginLeft(w - 300).cursorPointer().image('../images/abs-fullscreen.png').click(onZoom);


    /////////////////////////////////////////////////////////////////
    ////
    ////    Initialization
    ////
    /////////////////////////////////////////////////////////////////


    /** Initialize **/

    var slideManager = new SlideManager();
    var slideShowManager = new SlideShowManager();
    var curSlide, curBackground, curObj, curDiv;
    var isFullscreen = false, isLoading = false;
    var copyParam, lockAction = false;
    var memberManager = new MemberManager();

    var init = function () {
        lock();
        slideManager.new();
        unlock();

        memberManager.insertMember(username);

        if (AB.fName !== undefined) {
            var userId = localStorage.getItem("ambasa");
            joinOnline(AB.fName);
            if (userId)
                onEnter(AB.fName, userId);
            else
                onLoad(AB.fName);
        }
    };

    $(document).ready(init);
});
