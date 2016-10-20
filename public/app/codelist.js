(function () {

    /** initialize variables **/

    var basicColor = 'rgb(17,187,85)', basicColorWeak = 'rgb(17,187,85,0.6)',
        projectColor = '#C8E6C9', moduleColor = '#B2DFDB', buttonColor = '#05aa33',
        basicBlue = '#03A9F4', basicBlueWeak = '#B3E5FC', basicBlueStrong = '#1565C0';
    var currentCodeBlock, currentCode, currentCodeManager, curProject, curProjectBlock;
    var projectHide = false, moduleHide = true;
    var fadeDuration = 300;

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


    /** basic functions **/

    var addZeroIfNeeded = function (num) {
        num = parseInt(num);
        return num < 10 ? '0' + num : num;
    };
    var getCurrentDate = function () {
        var date = new Date();
        var curr_date = addZeroIfNeeded(date.getDate());
        var curr_month = addZeroIfNeeded(date.getMonth() + 1);
        var curr_year = date.getFullYear();
        return curr_year + "-" + curr_month + "-" + curr_date;
    };

    var fadeInAfterOut = function (inObj, outObj, duration) {
        if (duration === undefined)
            duration = fadeDuration / 2;
        outObj.fadeOut(duration, function () {
            inObj.fadeIn(duration);
        })
    };

    // list 내의 block을 지울 때, UI가 깨지는 것을 방지하기 위해 dummy div를 append 합니다.
    var refreshList = function () {
        blank.append();
    };


    /** define Project, Code classes **/

    var Project = function (project) {
        this.pid = project.pid;
        this.title = project.title;
        this.main_cid = project.main_cid;
        this.description = project.description;
        this.upt_date = project.upt_date.slice(0, 10);
        this.codeManager;
    };

    var Code = function (code) {
        this.cid = code.cid;
        this.pid = code.pid;
        this.title = code.title;
        this.ctext = code.ctext;
        this.mstatus = code.mstatus || 0;
        this.deps = code.deps || [];
        this.description = code.description;
        this.upt_date = code.upt_date.slice(0, 10);
    };

    var Module = function (module) {
        this.author = module.author;
        this.title = module.title;
        this.description = module.description;
        this.upt_date = module.upt_date.slice(0, 10);
        this.selected = false;
    };

    var buildProject = function (obj) {
        return new Project(obj);
    };

    var buildCode = function (obj) {
        return new Code(obj);
    };

    var buildModule = function (obj) {
        return new Module(obj);
    };


    /** define ProjectManager, CodeManager classes **/
        // 모든 유저는 하나의 project manager를 가지고 project를 관리합니다.
    var ProjectManager = function () {

            var projects = [];
            var that = this;

            this.init = function () {
                that.getProjects()
                    .done(function () {
                        for (var i = 0; i < projects.length; i++) {
                            newProjectBlock(projects[i]);
                        }
                    });
            };

            this.getProjects = function () {
                return $.get("/projects", {token: token})
                    .done(function (data) {
                        if (data.resultCode === 0) {
                            projects = data.projects.map(buildProject);
                        } else {
                            alert(data.msg);
                        }
                    });
            };

            this.createProject = function () {
                var currentDate = getCurrentDate();
                var defaultProject = {
                    title: prompt("프로젝트 명을 입력해주세요."),
                    description: "project description",
                    upt_date: currentDate
                };
                var project = buildProject(defaultProject);
                return $.post("/projects", {token: token, project: JSON.stringify(project)})
                    .done(function (data) {
                        if (data.resultCode === 0) {
                            project.pid = data.pid;
                            projects.push(project);
                        } else {
                            alert(data.msg);
                        }
                        data.project = project;
                        return data;
                    });
            };


            this.updateProject = function (newProject, resolve, reject) {
                $.post("/projects/update", newProject)
                    .done(function (data) {
                        if (data.resultCode === 0) {
                            if (typeof resolve === 'function')
                                resolve();
                        } else {
                            alert(data.msg);
                            if (typeof reject === 'function')
                                reject();
                        }
                    });
            };

            this.deleteProject = function (pid, resolve) {
                $.post("/projects/delete", {token: token, pid: pid})
                    .done(function (data) {
                        if (data.resultCode === 0) {
                            // remove from array;
                            for (var i = 0; i < projects.length; i++) {
                                if (projects[i].pid == pid) {
                                    projects.splice(i, 1);
                                    break;
                                }
                            }
                            if (typeof resolve == 'function')
                                resolve();
                        } else {
                            alert(data.msg);
                        }
                    });
            };
        };

    // 각각의 project는 하나의 code manager를 가지고 code들을 관리합니다.
    var CodeManager = function (pid) {

        var codes = [];
        var that = this;

        this.init = function () {
            that.getCodes()
                .done(that.resetCodelist);
        };

        this.resetCodelist = function () {
            listWrapper.empty();
            for (var i = 0; i < codes.length; i++) {
                newCodeBlock(codes[i]);
            }
        };

        this.getCode = function (code, resolve, reject) {
            $.get('/projects/codes/code', {cid: code.cid})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        // copy properties
                        for (var prop in data.code) {
                            if (data.code.hasOwnProperty(prop)) {
                                code[prop] = data.code[prop];
                            }
                        }
                        if (typeof code['upt_date'] === 'string' && code['upt_date'].length > 10)
                            code['upt_date'] = code['upt_date'].slice(0, 10);
                        code['deps'] = JSON.parse(code['deps']);
                        if (typeof resolve === "function")
                            resolve();
                    } else {
                        alert(data.msg);
                        if (typeof resolve === "function")
                            reject();
                    }
                });
        };

        this.getCodes = function () {
            return $.get("/projects/codes", {pid: pid})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        codes = data.codes.map(buildCode);
                    } else {
                        alert(data.msg);
                    }
                });
        };

        this.createCode = function () {
            var currentDate = getCurrentDate();
            var defaultCode = {
                pid: pid,
                title: prompt("코드 명을 입력해주세요."),
                ctext: "// write code here",
                description: "code description",
                upt_date: currentDate
            };
            var code = buildCode(defaultCode);
            return $.post("/projects/codes", {token: token, code: JSON.stringify(code)})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        code.cid = data.cid;
                        codes.push(code);
                    } else {
                        alert(data.msg);
                    }
                    data.code = code;
                    return data;
                });
        };

        this.updateCode = function (uptCode, resolve, reject) {
            $.post("/projects/codes/update", uptCode)
                .done(function (data) {
                    if (data.resultCode === 0) {
                        // update
                        currentCode.cid = data.newCid;
                        if (typeof resolve === 'function')
                            resolve();
                    } else {
                        alert(data.msg);
                        if (typeof reject === 'function')
                            reject();
                    }
                });
        };

        this.updateMstatus = function (uptCode, resolve, reject) {
            $.post("/projects/codes/mstatus/update", uptCode)
                .done(function (data) {
                    if (data.resultCode === 0) {
                        if (typeof resolve === 'function')
                            resolve();
                    } else {
                        alert(data.msg);
                        if (typeof reject === 'function')
                            reject();
                    }
                });
        };

        this.updateDeps = function (uptCode, resolve, reject) {
            $.post("/projects/codes/deps/update", {cid: uptCode.cid, deps: JSON.stringify(uptCode.deps)})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        if (typeof resolve === 'function')
                            resolve();
                    } else {
                        alert(data.msg);
                        if (typeof reject === 'function')
                            reject();
                    }
                });
        };

        this.deleteCode = function (cid) {
            // remove from array;
            for (var i = 0; i < codes.length; i++) {
                if (codes[i].cid == cid) {
                    codes.splice(i, 1);
                    break;
                }
            }
            $.post("/projects/codes/delete", {cid: cid});
        };
    };

    var ModuleManager = function () {

        // modules는 모듈명(key)와 모듈 객체(value)의 쌍으로 이루어진 JSON object
        var modules = {};

        // 현재 코드의 dependency를 임시 저장.
        var deps = [];
        var that = this;

        this.init = function () {
            that.getModules()
                .done(function () {
                    for (var prop in modules) {
                        if (modules.hasOwnProperty(prop)) {
                            newModuleBlock(modules[prop]);
                        }
                    }
                });
        };

        // 주어진 모듈이 없으면 추가하고 true를, 이미 있으면 제거하고 false를 리턴합니다.
        this.toggleModule = function (title) {
            for (var i = 0; i < deps.length; i++) {
                if (deps[i] === title) {
                    deps.splice(i, 1);
                    return false;
                }
            }
            deps.push(title);
            return true;
        };

        this.save = function (code) {
            code.deps = deps.slice();
        };

        // reset dependency of given code
        this.reset = function (code) {
            // 원래 코드의 dependency 초기화
            var i;
            for (i = 0; i < deps.length; i++) {
                if (modules[deps[i]]) {
                    modules[deps[i]].selected = false;
                    modules[deps[i]].setColor();
                }
            }
            // 현재 코드의 dependency 설정
            deps = code.deps.slice();
            for (i = 0; i < deps.length; i++) {
                if (modules[deps[i]]) {
                    modules[deps[i]].selected = true;
                    modules[deps[i]].setColor();
                }
            }
        };

        this.getModule = function (title) {
            return modules[title];
        };

        this.getModules = function () {
            return $.get("/modules", {token: token})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        data.modules.forEach(function (module) {
                            modules[module.title] = buildModule(module);
                        });
                    } else {
                        alert(data.msg);
                    }
                });
        };
    };

    /** define newProjectBlock, newCodeBlock functions **/

        // 주어진 project object로 부터 project block을 생성 및 append
    var newProjectBlock = function (project) {
            var blockWrapper = div().appendTo(projectListWrapper).padding(10).size('100%', 90)
                .borderOption('1px solid', 'bottom').borderOption('rgb(200,200,200)', 'color');
            var deleted = false;

            // remove functionality
            var removeButton = div().appendTo(blockWrapper).size(10, 15).text('X').fontColor('gray').float('right').cursorPointer()
                .click(function () {
                    if (confirm("프로젝트 [" + block.title.text() + "]를 정말로 삭제하시겠습니까?")) {
                        deleted = true;
                        projectManager.deleteProject(project.pid, function () {
                            blockWrapper.remove();
                            refreshList();
                            curProjectBlock = undefined;
                        });
                    }
                });

            var block = {
                title: div().appendTo(blockWrapper).size('100%', '30px').text(project.title).fontSize(20).fontColor('#333333').fontBold(),
                upt_date: div().appendTo(blockWrapper).size('100%', '15px').text(project.upt_date).fontSize(12).fontColor('gray'),
                description: project.description,
                syncWithEditor: function () {
                    project.title = projectTitle.text();
                    project.description = projectDesc.text();
                    project.upt_date = getCurrentDate();
                    this.title.text(project.title);
                    this.upt_date.text(project.upt_date);
                    this.description = project.description;
                },
                syncWithProject: function () {
                    projectTitle.text(project.title);
                    projectDesc.text(project.description);
                    this.title.text(project.title);
                    this.description = project.description;
                }
            };

            var onHover = function () {
                blockWrapper.color(basicColor);
                block.title.fontColor('white');
                block.upt_date.fontColor('white');
            };
            var offHover = function () {
                blockWrapper.color('inherit');
                block.title.fontColor('#333333');
                block.upt_date.fontColor('gray');
                removeButton.color('inherit');
            };
            var onClickProject = function () {
                if (!deleted) {
                    curProject = project;
                    curProjectBlock = block;
                    moduleDescWrapper.fadeOut(300);
                    projectTitle.text(block.title.text());
                    projectDesc.text(block.description);
                    clearCurrentCode();
                    resetCodes(project).then(closeProjectList);
                }
            };
            blockWrapper.hover(onHover, offHover).click(onClickProject).cursorPointer();
        };


    // codelist에 새로운 block을 추가하는 함수
    var newCodeBlock = function (code) {
        var blockWrapper = div().appendTo(listWrapper).padding(10).size('100%', 120).borderOption('1px solid', 'bottom')
            .borderOption('rgb(200,200,200)', 'color').color('#fafafa').cursorPointer();

        // remove functionality
        var removeButton = div().appendTo(blockWrapper).size(10, 15).text('X').fontColor('gray').float('right')
            .cursorPointer()
            .click(function () {
                if (confirm("코드 [" + block.title.text() + "]를 정말로 삭제하시겠습니까?")) {
                    blockWrapper.remove();
                    currentCodeManager.deleteCode(code.cid);
                    clearCurrentCode();
                    refreshList();
                }
            });

        // set viewer
        var viewerWrapper = div().width(codelist.widthPixel()).padding(3).backgroundColor('green').position('absolute').resizable().draggable().zIndex(5);
        var viewerHeader = div().appendTo(viewerWrapper);
        div().appendTo(viewerHeader).size(5, '100%'); // left space
        viewerHeader.size('100%', 33).paddingTop(6).color(projectColor).fontSize(18).fontBold().fontColor('green')
            .borderBottom('2px solid green').cursorDefault();
        var viewer = div().appendTo(viewerWrapper).size('100%', '100%').overflowAuto().backgroundColor('white');
        var viewerRemoveButton = div().appendTo(viewerHeader).size(13, 13).float('right').marginRight(5).cursorPointer()
            .image('../images/close.png')
            .click(function () {
                viewerWrapper.fadeOut().detach();
            });
        var viewerFullscreenButton = div().appendTo(viewerHeader).cssSameWith(viewerRemoveButton).size(11,11)
            .image('../images/fullscreen.png').click(onFullscreen);


        // trick to adjust resizing control point
        var virtualHeight = 35;
        viewerWrapper.borderTop(virtualHeight + 'px solid green');
        viewerHeader.marginTop(-virtualHeight);
        viewer.marginTop(-virtualHeight + 16);

        var block = {
            title: div().appendTo(blockWrapper).size('100%', '30px').text(code.title).fontSize(20).fontColor('#333333').fontBold().disableSelection(),
            date: div().appendTo(blockWrapper).size('100%', '15px').text(code.upt_date).fontSize(12).fontColor('gray').disableSelection(),
            description: div().appendTo(blockWrapper).size('100%', '35px').text(code.description).fontSize(16).fontColor('gray').disableSelection(),
            syncWithEditor: function () {
                code.title = titleEditor.text();
                code.description = descEditor.text();
                code.ctext = codeEditor.text();
                code.upt_date = getCurrentDate();
                this.title.text(code.title);
                this.date.text(code.upt_date);
                this.description.text(code.description);
            },
            syncWithCode: function () {
                titleEditor.text(code.title);
                descEditor.text(code.description);
                dateEditor.text(code.upt_date);
                codeEditor.text(code.ctext);
                setModuleButtonColor();
            },
            run: function () {
                // save code and dependencies
                var acode = '(function(){' + codeEditor.text() + '\n})();';
                localStorage.setItem('acode', acode);
                localStorage.setItem('adeps', JSON.stringify(code.deps));

                // set viewer
                viewer.empty().iframe('/?app=viewer');
                viewer.$iframe.appendTo(viewer.$); // attach again
                viewerHeader.text('  ' + titleEditor.text());
                viewerWrapper.append().displayNone().left(listWrapper.positionLeft()).top(listWrapper.positionTop()).fadeIn();
            },
            fullscreen: function () {
                var encCid = encodeURIComponent(currentCode.cid);
                window.open('/?cid=' + encCid);
            }
        };

        var onHover = function () {
            blockWrapper.color(basicColorWeak);
            block.title.fontColor('white');
            block.date.fontColor('white');
            block.description.fontColor('white');
        };
        var offHover = function () {
            blockWrapper.color('#fafafa');
            block.title.fontColor('#333333');
            block.date.fontColor('gray');
            block.description.fontColor('gray');
            removeButton.color('inherit');
        };
        var onClickCode = function () {

            if (currentCodeBlock === undefined)
                moduleListButton.fadeIn(fadeDuration);
            if (currentCodeBlock != block) {
                currentCode = code;
                currentCodeBlock = block;
                moduleDescWrapper.fadeOut(300);
                if (code.ctext === undefined) {
                    currentCodeManager.getCode(code, function () {
                        block.syncWithCode();
                        codeWrapper.displayInlineBlock();
                        resetDeps();
                    });
                } else {
                    block.syncWithCode();
                    codeWrapper.displayInlineBlock();
                    resetDeps();
                }
            }
        };
        blockWrapper.hover(onHover, offHover).click(onClickCode);
    };

    // modulelist에 새로운 block을 추가하는 함수
    var newModuleBlock = function (module) {

        // colors
        var selOnColor = basicBlue, selOffColor = basicBlueWeak, unselOnColor = basicColorWeak, unselOffColor = '#fafafa';
        module.setColor = function () {
            if (module.selected)
                blockWrapper.color(selOffColor);
            else
                blockWrapper.color(unselOffColor);
        };

        var blockWrapper = div().appendTo(moduleListWrapper).padding(10).size(moduleList.widthPixel(), 100).borderOption('1px solid', 'bottom')
            .borderOption('rgb(200,200,200)', 'color').color('#fafafa').cursorPointer();

        var block = {
            title: div().appendTo(blockWrapper).size('55%', '20px').text(module.title).fontSize(18).fontColor('#333333').fontBold().disableSelection(),
            date: div().appendTo(blockWrapper).size('40%', '15px').text(module.upt_date).fontSize(12).fontColor('gray')
                .textAlignRight().disableSelection().float('right'),
            author: div().appendTo(blockWrapper).size('30%', '15px').text('by ' + module.author).fontSize(12).fontColor('gray')
                .float('right').textAlignRight().disableSelection(),
            description: div().appendTo(blockWrapper).marginTop(8).size('70%', '35px').text(module.description)
                .fontSize(14).fontColor('gray').disableSelection()
        };

        var onHover = function () {
            if (module.selected)
                blockWrapper.color(selOnColor);
            else
                blockWrapper.color(unselOnColor);
            block.title.fontColor('#004D40');
            block.date.fontColor('white');
            block.author.fontColor('white');
            block.description.fontColor('white');
        };
        var offHover = function () {
            module.setColor()
            block.title.fontColor('#333333');
            block.date.fontColor('gray');
            block.author.fontColor('gray');
            block.description.fontColor('gray');
        };
        var onClickModule = function () {
            module.selected = moduleManager.toggleModule(module.title);
            module.setColor();
            block.title.fontColor('#333333');
            block.date.fontColor('gray');
            block.author.fontColor('gray');
            block.description.fontColor('gray');
        };
        blockWrapper.hover(onHover, offHover).click(onClickModule);
    };

    /** functions for code list and project list **/

        // project의 codeManager를 세팅하고, codelist를 현재 project 하위의 코드들로 세팅합니다.
    var resetCodes = function (project) {
            if (project.codeManager) {
                project.codeManager.resetCodelist();
            } else {
                project.codeManager = new CodeManager(project.pid);
                project.codeManager.init();
            }
            currentCodeManager = project.codeManager;

            return new Promise(function (resolve) {
                resolve();
            });
        };

    var resetDeps = function () {

        var marginRight = 10;
        var defaultWidth = 50, minWidthPerTag = 50;
        var deps = currentCode.deps;
        depsTags.empty().width(defaultWidth);
        for (var i = 0; i < deps.length; i++) {
            var tag = div().appendTo(depsTags).float('left').height(28).marginRight(marginRight).padding(5).color(basicBlue)
                .text(deps[i]).verticalAlign('middle').fontBold().fontColor('white').borderRadius(12).cursorPointer()
                .click((function (j) {
                    return function () {
                        moduleDescWrapper.fadeOut(50);
                        moduleDescTitle.text('[' + deps[j] + ']')
                        moduleDescContent.text(moduleManager.getModule(deps[j]).description);
                        moduleDescWrapper.fadeIn();
                    };
                })(i));
            depsTags.width(parseInt(depsTags.width()) + parseInt(tag.width()) + marginRight);
        }
        if (depsTags.width() < minWidthPerTag * deps.length)
            depsTags.width(minWidthPerTag * deps.length);
    };

    var clearCurrentCode = function () {
        currentCode = undefined;
        currentCodeBlock = undefined;
        moduleListButton.fadeOut(fadeDuration);
        codeWrapper.displayNone();
    };


    var openProjectList = function () {
        projectList.fadeIn(fadeDuration);
        closeModuleList();
        fadeInAfterOut(projectAddButton, addCodeButton);
        projectHide = false;
        offProjectEdit();
    };

    var closeProjectList = function () {
        projectList.fadeOut(fadeDuration);
        fadeInAfterOut(addCodeButton, projectAddButton);
        projectHide = true;
    };

    var openModuleList = function () {
        moduleManager.reset(currentCode);
        moduleList.fadeIn(fadeDuration);
        closeProjectList();
        moduleHide = false;
        offProjectEdit();
    };

    var closeModuleList = function () {
        moduleList.fadeOut(fadeDuration);
        moduleHide = true;
    };

    /** on click events **/

    var onAddCode = function () {
        currentCodeManager.createCode()
            .done(function (data) {
                if (data.resultCode === 0)
                    newCodeBlock(data.code);
            });
    };

    var onAddProject = function () {
        projectManager.createProject()
            .done(function (data) {
                if (data.resultCode === 0)
                    newProjectBlock(data.project);
            });
    };

    var onRun = function () {
        currentCodeBlock.run();
    };

    var onFullscreen = function () {
        currentCodeBlock.fullscreen();
    };

    var onModule = function () {
        var msg;
        var uptCode = buildCode(currentCode);
        if (uptCode.mstatus == 0)
            msg = '모듈화를 하시겠습니까?';
        else
            msg = '모듈화를 취소 하시겠습니까?';
        if (confirm(msg)) {
            if (uptCode.mstatus == 0) {
                // 모듈화
                uptCode.mstatus = 1;

            } else {
                // 모듈화 취소
                uptCode.mstatus = 0;
            }
            currentCodeManager.updateMstatus(uptCode, function () {
                currentCode.mstatus = uptCode.mstatus;
                currentCodeBlock.syncWithEditor();
                setModuleButtonColor();
            });
        }
    };

    var onSave = function () {
        var uptCode = buildCode(currentCode);
        uptCode.title = titleEditor.text();
        uptCode.upt_date = getCurrentDate();
        uptCode.description = descEditor.text();
        uptCode.ctext = codeEditor.text();
        uptCode.deps = JSON.stringify(uptCode.deps);
        currentCodeManager.updateCode(uptCode, function () {
            // update code block
            currentCodeBlock.syncWithEditor();
        });
    };

    var onProjectList = function () {
        if (projectHide)
            openProjectList();
        else if (currentCodeManager)
            closeProjectList();
    };

    var onProjectEdit = function () {
        projectTitle.editable(true);
        projectDesc.editable(true);
        fadeInAfterOut(projectSaveButton, projectEditButton, 200);
    };

    var offProjectEdit = function () {
        projectTitle.editable(false);
        projectDesc.editable(false);
        fadeInAfterOut(projectEditButton, projectSaveButton, 200);
    };

    var onProjectSave = function () {
        if (confirm("정말로 저장하시겠습니까?")) {
            var newProject = buildProject(curProject);
            newProject.title = projectTitle.text();
            newProject.description = projectDesc.text();
            projectManager.updateProject(newProject,
                function () {
                    curProjectBlock.syncWithEditor();
                },
                function () {
                    curProjectBlock.syncWithProject();
                }
            );
        } else {
            curProjectBlock.syncWithProject();
        }
        offProjectEdit();
    };


    var onModuleList = function () {
        if (moduleHide)
            openModuleList();
        else
            closeModuleList();
    };

    var onModuleSave = function () {
        moduleManager.save(currentCode);
        currentCodeManager.updateDeps(currentCode);
        resetDeps();
    };

    var onModuleDescWrapper = function () {
        // moduleDescWrapper.slideUp("slow");
        moduleDescWrapper.fadeOut();
    }

    var onLogout = function () {
        localStorage.clear('aauth');
        localStorage.clear('ainfo');
        $(location).attr('href', '/?app=signin');
    };


    /** design **/

        // basic layout
    var parent = div().append().size(outerWidth, '100%');
    var sidebar = div().appendTo(parent).size(outerWidth / 20, '100%').color('white');
    var content = div().appendTo(parent).size(outerWidth * 19 / 20, '100%');
    var projectList = div().appendTo(content).zIndex(3).size(outerWidth / 4, '100%').color(projectColor)
        .border(1).borderColor('#aaaaaa').position('absolute').left(content.positionLeft()).top(content.positionTop());
    var moduleList = div().appendTo(content).cssSameWith(projectList).color(moduleColor).displayNone();
    var codelist = div().appendTo(content).zIndex(1).size(outerWidth / 4, '100%').border(1).borderOption('#aaaaaa', 'color').paddingBottom(1);
    var codeWrapper = div().appendTo(content).zIndex(1).size(outerWidth * 14 / 20, '100%').padding(15).color('white').displayNone();
    var blank = div();

    // design sidebar
    var decoButton = function (div) {
        div.size(30, 30).margin(15).border(1).borderColor(basicColor).borderOption('100%', 'radius').marginTop(10)
            .fontBold().fontSize(20).fontColor('green').textAlign('center').verticalAlign('middle').cursorPointer();
    };
    var logoutButton = div().appendTo(sidebar).size(50, 24).margin(5).marginTop(15).color('green')
        .border(2).borderRadius(4).borderColor('green').textAlignCenter().text('logout').fontSize(14).fontColor('white')
        .cursorPointer().hoverColor('white', 'green').hoverTextColor('green', 'white').click(onLogout);
    var addCodeButton = div().appendTo(sidebar).deco(decoButton).marginTop(30).text('+').fontSize(18).click(onAddCode).displayNone();
    var projectAddButton = div().appendTo(sidebar).deco(decoButton).marginTop(30).text('new').paddingTop(3).fontSize(12).click(onAddProject);
    var projectListButton = div().appendTo(sidebar).deco(decoButton).text('P').click(onProjectList);
    var moduleListButton = div().appendTo(sidebar).deco(decoButton).text('M').click(onModuleList).displayNone();

    // design projectlist
    var projectHeader = div().appendTo(projectList).size('100%', 170).color('#white').borderBottom('3px solid green');
    var projectHeaderTitle = div().appendTo(projectHeader).size('100%', 40).marginTop(50).text('Project List').fontSize(28).textAlignCenter();
    var projectName = div().appendTo(projectHeader).size('100%', 50).marginTop(20).text(username).fontSize(22).fontColor('gray').textAlignCenter();
    var projectListWrapper = div().appendTo(projectList).size('100%', projectList.heightPixel() - projectHeader.heightPixel()).overflowAuto();


    // design modulelist
    var moduleHeader = div().appendTo(moduleList).size('100%', 170).color('#white').borderBottom('3px solid #26A69A');
    var moduleSaveButton = div().appendTo(moduleHeader).size(40, 20).margin(10).float('right').color(basicBlue)
        .borderRadius(2).text('Save').fontSize(12).fontColor('white').textAlignCenter().cursorPointer()
        .hoverColor(basicBlueWeak, basicBlue).hoverTextColor('blue', 'white').click(onModuleSave);
    var moduleHeaderTitle = div().appendTo(moduleHeader).size('100%', 40).text('Module List').fontSize(28).textAlignCenter();
    var moduleName = div().appendTo(moduleHeader).size('100%', 50).marginTop(20).text('AMBA').fontSize(22).fontColor('gray').textAlignCenter();
    var moduleListWrapper = div().appendTo(moduleList).size('100%', moduleList.heightPixel() - moduleHeader.heightPixel()).overflowAuto();


    // design codelist
    var listHeader = div().appendTo(codelist).size('100%', '150px').color(basicColor);
    var projectEditButton = div().appendTo(listHeader).size(10, 10).margin(10).marginBottom(20).float('right').color('green')
        .borderRadius(2).hoverColor(projectColor, 'green').cursorPointer().click(onProjectEdit);
    var projectSaveButton = div().appendTo(listHeader).cssSameWith(projectEditButton).size(40, 20).margin(10)
        .text('Save').fontSize(12).fontColor('white').textAlignCenter()
        .hoverColor(projectColor, 'green').hoverTextColor('green', 'white').displayNone().click(onProjectSave);
    var projectTitle = div().appendTo(listHeader).size('100%', '40px').text('Project name')
        .fontSize(28).fontBold().fontColor('white').textAlignCenter();
    var projectDesc = div().appendTo(listHeader).size('100%', '20px').marginTop(10).text(username).fontSize(20)
        .fontColor('#1B5E20').textAlignCenter();
    var listViewer = div().appendTo(codelist).size('100%', codelist.heightPixel() - listHeader.heightPixel())
        .borderOption('1px solid gray', 'top').overflowAuto().color('white');
    ;
    var listWrapper = div().appendTo(listViewer).width('100%');
    var moduleDescWrapper = div().prependTo(listViewer).size('100%').minHeight(100).padding(10).displayNone()
        .color(basicBlueWeak).borderBottom('1px solid ' + basicBlue).cursorPointer().click(onModuleDescWrapper);
    var moduleDescTitle = div().appendTo(moduleDescWrapper).size('100%', 20).fontSize(20).fontBold().fontColor(basicBlueStrong);
    var moduleDescContent = div().appendTo(moduleDescWrapper).size('100%').fontSize(12).marginTop(10).fontColor(basicBlue);

    // design codeWrapper
    var wrapperHeader = div().appendTo(codeWrapper).size('95%', 140).padding(10).borderOption('1px solid gray', 'bottom');
    var leftWrapperHeader = div().width('60%').appendTo(wrapperHeader).float('left');
    var rightWrapperHeader = div().width('35%').appendTo(wrapperHeader).float('right');
    var titleEditor = div().appendTo(leftWrapperHeader).size(600, 40).editable().fontSize(30).fontBold()
        .fontColor(basicColor).overflowAuto();
    var descEditor = div().appendTo(leftWrapperHeader).size(600, 45).editable().marginTop(10).marginLeft(10)
        .fontSize(20).fontBold().fontColor('gray').overflowAuto();
    var depsTagsWrapper = div().appendTo(leftWrapperHeader).size(600, 30).overflowYHidden().overflowXScroll();
    var depsTags = div().appendTo(depsTagsWrapper);
    var codeEditor = div().appendTo(codeWrapper).aceEditor().zIndex(1).size('95%', '80%').marginTop(10).padding(20)
        .fontSize(20).overflowAuto();
    var saveButton = div().appendTo(rightWrapperHeader).size(50, 25).padding(1).color(buttonColor)
        .text('Save').fontColor('white').textAlignCenter().fontSize(16).verticalAlign('middle')
        .border(2).borderColor(buttonColor).borderOption(5, 'radius').float('right').cursorPointer().click(onSave);
    var runButton = div().appendTo(rightWrapperHeader).cssSameWith(saveButton).text('Run').marginRight(20).click(onRun);
    var fullscreenButton = div().appendTo(rightWrapperHeader).cssSameWith(runButton).text('Full').click(onFullscreen);
    var moduleButton = div().appendTo(rightWrapperHeader).cssSameWith(runButton).text('Module').fontSize(13).click(onModule);
    var dateEditor = div().appendTo(rightWrapperHeader).marginTop(70).fontSize(18).fontColor('gray').clear('right').float('right');

    var setModuleButtonColor = function () {
        if (currentCode.mstatus == 1)
            moduleButton.color('white').fontColor('green');
        else
            moduleButton.color(buttonColor).fontColor('white');
    };

    /** initialization **/

    var projectManager = new ProjectManager();
    var moduleManager = new ModuleManager();
    projectManager.init();
    moduleManager.init();

})();