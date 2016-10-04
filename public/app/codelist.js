$(document).ready(function () {

    /* initialize variables */

    var basicColor = '#11bb55';
    // var username = prompt("Enter your username").toLowerCase();
    var username = 'yeongjinoh';
    var uid = 2;
    var currentBlock, currentCode, saveButton, currentCodeManager;

    var parent = div().append().size(outerWidth, outerHeight);
    var sidebar = div().appendTo(parent).size('5%', outerHeight).color('white');
    var content = div().appendTo(parent).size('95%', outerHeight);
    var projectList = div().appendTo(content).zIndex(2).size('30%', outerHeight).border(1).borderOption('#aaaaaa', 'color');
    projectList.color('#eaeaea').position('absolute').left(content.positionLeft()).top(content.positionTop());
    var codelist = div().appendTo(content).zIndex(1).size('25%', outerHeight).border(1).borderOption('#aaaaaa', 'color');
    var codeWrapper = div().appendTo(content).zIndex(1).size('65%', outerHeight).padding(20).color('white');
    var blank = div();


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

    /** define Project, Code classes **/

        // Q. insert, update date는 db에 들어간 시간을 기준? 클라이언트 리퀘스트 기준?
    var Project = function (project) {
            this.pid = project.pid;
            this.uid = project.uid;
            this.title = project.title;
            this.main_cid = project.main_cid;
            this.description = project.description;
            this.ipt_date = project.ipt_date.slice(0, 10);
            this.upt_date = project.upt_date.slice(0, 10);
            this.codeManager;
        };

    // project의 codeManager를 세팅하고, codelist를 현재 project 하위의 코드들로 세팅합니다.
    var resetCodes = function (project) {
        if (project.codeManager) {
            project.codeManager.resetCodelist();
        } else {
            console.log(project.pid);
            project.codeManager = new CodeManager(project.pid);
            project.codeManager.init();
        }
        currentCodeManager = project.codeManager;
        // console.log(currentCodeManager);
    };

    // uid, pid, title, ctext, description, ipt_date, upt_date
    var Code = function (pid, cid) {
        this.cid = cid;
        this.uid = uid;
        this.pid = pid;
        this.title = "Title " + cid;
        this.ctext = "Code";
        this.description = "description";
        this.iptDate = getCurrentDate();
        this.uptDate = this.iptDate;
    };

    /** define ProjectManager, CodeManager classes **/

    var ProjectManager = function () {

        var projects = [];
        var that = this;

        this.init = function () {
            that.getProjects()
                .done(function () {
                    for (var i = 0; i < projects.length; i++) {
                        newProjectBlock(projects[i]);
                    }
                    ;
                });
        };

        this.getProjects = function () {
            return $.get("/projects", {uid: uid})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        projects = data.projects.map(buildProject);
                    } else {
                        alert(data.msg);
                    }
                    return projects;
                });
        };

        this.createProject = function () {
            var currentDate = getCurrentDate();
            var defaultProject = {
                uid: uid,
                title: "new project " + projects.length,
                description: "description",
                ipt_date: currentDate,
                upt_date: currentDate
            };
            var project = buildProject(defaultProject);
            return $.post("/projects", project)
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

        this.deleteProject = function (pid) {

            $.post("/projects/delete", {uid:uid, pid:pid})
                .done(function (data) {
                    if (data.resultCode === 0) {
                        // remove from array;
                        for (var i = 0; i < projects.length; i++) {
                            if (projects[i].pid == pid) {
                                projects.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        alert(data.msg);
                    }
                });
        };

        this.getNextIndex = function () {
            if (projects.length === 0)
                return 1;
            var lastProject = projects[projects.length - 1];
            return parseInt(lastProject.pid) + 1;
        };

    };


    var CodeManager = function (pid) {

        var codes = [];
        var that = this;
        var basicURL = "/projects/" + pid + "/codes";

        this.init = function () {
            that.getCodes()
                .done(that.resetCodelist);
        };

        this.resetCodelist = function () {
            listWrapper.empty()
            for (var i = 0; i < codes.length; i++) {
                newCodeBlock(codes[i]);
            }
            ;
            // currentCodeManager = that;
        };

        this.getCodes = function () {
            return $.get(basicURL, {uid: uid})
                .done(function (data) {
                    codes = data;
                    if (codes === undefined || codes === "[]")
                        codes = [];
                    // TODO : correct type checking
                    // else if (codes === "[]")
                    //     codes = [codes];
                    return codes;
                });
        };

        this.getCode = function (cid) {
            return $.get(basicURL + '/' + cid, {uid: uid})
                .done(that.updateCode);
        };

        this.createCode = function () {
            var code = new Code(pid, that.getNextIndex());
            codes.push(code);
            $.post(basicURL, code);
            return code;
        };

        this.updateCode = function (newCode) {
            for (var i = 0; i < codes.length; i++) {
                if (codes[i].cid == newCode.cid) {
                    codes[i] = newCode;
                    break;
                }
            }
            $.post(basicURL + '/' + newCode.cid + "/update", newCode);
            return newCode;
        };

        this.deleteCode = function (cid) {

            // remove from array;
            for (var i = 0; i < codes.length; i++) {
                if (codes[i].cid == cid) {
                    codes.splice(i, 1);
                    break;
                }
            }
            $.post(basicURL + "/" + cid + "/delete", {uid: uid});
        };

        this.getNextIndex = function () {
            if (codes.length === 0)
                return 1;
            var lastCode = codes[codes.length - 1];
            return parseInt(lastCode.cid) + 1;
        };
    };

    /** project buider**/
    var buildProject = function (obj) {
        return new Project(obj);
    };

    /** define newProjectBlock, newCodeBlock functions **/

        // 주어진 project object로 부터 project block을 생성 및 append
    var newProjectBlock = function (project) {
            var blockWrapper = div().appendTo(projectListWrapper).padding(10).size('100%', '70px').borderOption('1px solid', 'bottom').borderOption('rgb(200,200,200)', 'color');

            // remove functionality
            var removeButton = div().appendTo(blockWrapper).size(10, 15).text('X').fontColor('gray').float('right').marginRight(20).cursorPointer();
            var onRemove = function () {
                blockWrapper.remove();
                blank.appendTo(parent);
                projectManager.deleteProject(project.pid);
            };
            removeButton.click(onRemove);

            var block = {
                title: div().appendTo(blockWrapper).size('100%', '30px').text(project.title).fontSize(20).fontColor('#333333').fontBold(),
                iptDate: div().appendTo(blockWrapper).size('100%', '15px').text(project.ipt_date).fontSize(12).fontColor('gray'),
            };

            var onHover = function () {
                blockWrapper.color(basicColor);
                block.title.fontColor('white');
                block.iptDate.fontColor('white');
            };
            var offHover = function () {
                blockWrapper.color('inherit');
                block.title.fontColor('#333333');
                block.iptDate.fontColor('gray');
                removeButton.color('inherit');
            };
            var onClickProject = function () {
                listHeaderTitle.text(block.title.text());
                projectList.animate({opacity: 0, 'z-index': -1}, 300);
                projectAddButton.animate({display: 'none', opacity: 0}, 300);
                projectHide = true;
                resetCodes(project);
            };
            blockWrapper.hover(onHover, offHover);
            block.title.click(onClickProject).cursorPointer();
            // return block;
        };


    // codelist에 새로운 block을 추가하고, 이를 리턴하는 함수
    var newCodeBlock = function (code) {
        var blockWrapper = div().appendTo(listWrapper).padding(10).size('100%', '100px').borderOption('1px solid', 'bottom').borderOption('rgb(200,200,200)', 'color').color('#fafafa');

        // remove functionality
        var removeButton = div().appendTo(blockWrapper).size(10, 15).text('X').fontColor('gray').float('right').marginRight(20).cursorPointer();
        var onRemove = function () {
            blockWrapper.remove();
            titleEditor.text('').editable(false);
            descEditor.text('').editable(false);
            dateEditor.text('');
            codeEditor.text('').editable(false);
            saveButton.visibility('hidden');
            currentCodeManager.deleteCode(code.cid);
            blank.appendTo(parent);
            // deleteCodeBlock(id);
        };
        removeButton.click(onRemove);

        var block = {
            title: div().appendTo(blockWrapper).size('100%', '30px').text(code.title).fontSize(20).fontColor('#333333').fontBold(),
            date: div().appendTo(blockWrapper).size('100%', '15px').text(code.uptDate).fontSize(12).fontColor('gray'),
            description: div().appendTo(blockWrapper).size('100%', '35px').text(code.description).fontSize(16).fontColor('gray'),
            refresh: function () {
                this.title.text(code.title);
                this.date.text(code.uptDate);
                this.description.text(code.description);
            }
        };

        var onHover = function () {
            blockWrapper.color(basicColor);
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
            titleEditor.editable(true).text(code.title);
            descEditor.editable(true).css('outline', 'none').text(code.description);
            dateEditor.text(code.uptDate);
            if (code.ctext == undefined) {
                currentCodeManager.getCode(code.cid)
                    .done(function (code) {
                        codeEditor.editable(true).text('');
                        codeEditor.text(code.ctext);
                        saveButton.visibility('visible');
                        currentCode = code;
                        currentBlock = block;
                    })
            } else {
                codeEditor.editable(true).text('');
                codeEditor.text(code.ctext);
                saveButton.visibility('visible');
                currentCode = code;
                currentBlock = block;
            }

        };

        blockWrapper.hover(onHover, offHover).click(onClickCode);

        return block;
    };


    /** on click events **/

    var onAddCode = function () {
        var code = currentCodeManager.createCode();
        newCodeBlock(code);
    };

    var onAddProject = function () {
        projectManager.createProject()
            .done(function (data) {
                if (data.resultCode === 0)
                    newProjectBlock(data.project);
            });

    }

    var onSave = function () {
        currentCode.title = titleEditor.text();
        currentCode.uptDate = getCurrentDate();
        currentCode.description = descEditor.text();
        currentCode.ctext = codeEditor.text();
        currentBlock.refresh();
        currentCodeManager.updateCode(currentCode);
    };


    /** initialization **/

    var projectManager = new ProjectManager();
    // var codeManager = new CodeManager();
    projectManager.init();


    // create project list
    var projectHide = false;
    var onProject = function () {
        projectHide = !projectHide;
        if (projectHide) {
            projectList.animate({opacity: 0, 'z-index': -1}, 300);
            projectAddButton.animate({display: 'none', opacity: 0}, 300);
        }
        else {
            projectList.zIndex(2);
            projectList.animate({opacity: 1}, 300);
            projectAddButton.display('inline-block')
            projectAddButton.animate({opacity: 1}, 300);
        }
    };


    /** design **/

        // design sidebar
    var decoButton = function (div) {
            div.size(30, 30).margin(15).border(1).borderColor(basicColor).borderOption('100%', 'radius')
                .fontBold().fontSize(28).fontColor('green').textAlign('center').verticalAlign('middle').cursorPointer();
        };
    var addCodeButton = div().appendTo(sidebar).deco(decoButton).marginTop(40).text('+').click(onAddCode);
    var projectButton = div().appendTo(sidebar).deco(decoButton).marginTop(10).text('P').fontSize(20).size(20, 20).padding(5).click(onProject);
    var projectAddButton = div().appendTo(sidebar).deco(decoButton).marginTop(10).text('new').fontSize(12).size(20, 20)
        .padding(5).click(onAddProject);

    // design projectlist
    var projectHeader = div().appendTo(projectList).size('100%', '150px').color('#bbbbbb');
    var projectHeaderTitle = div().appendTo(projectHeader).size('100%', '40px').marginTop(40).text('Project List').fontSize(28).textAlignCenter();
    var projectName = div().appendTo(projectHeader).size('100%', '50px').marginTop(20).text('project').fontSize(22).fontColor('gray').textAlignCenter();
    var projectListWrapper = div().appendTo(projectList).size('100%', projectList.heightPixel() - projectHeader.heightPixel()).borderOption('1px solid gray', 'top').overflow('scroll');


    // design codelist
    var listHeader = div().appendTo(codelist).size('100%', '120px').color('#dddddd');
    var listHeaderTitle = div().appendTo(listHeader).size('100%', '40px').marginTop(20).text('Project name').fontSize(28).textAlignCenter();
    var listName = div().appendTo(listHeader).size('100%', '50px').marginTop(20).text(username).fontSize(20).fontColor('darkgray').textAlignCenter();
    var listWrapper = div().appendTo(codelist).size('100%', codelist.heightPixel() - listHeader.heightPixel()).borderOption('1px solid gray', 'top').overflow('scroll').color('white');

    // design codeWrapper
    var wrapperHeader = div().appendTo(codeWrapper).size('95%', '60px').padding(20).borderOption('1px solid gray', 'bottom');
    var descEditor = div().size('600px', '60px').appendTo(wrapperHeader).fontSize(20).fontBold().fontColor('gray').overflow('scroll');
    saveButton = div().appendTo(wrapperHeader).size(50, 20).padding(5).color('#05aa33').text('Save').fontColor('white').textAlignCenter().fontSize(18).verticalAlign('middle')
        .borderOption(5, 'radius').float('right').visibility('hidden').click(onSave).cursorPointer();
    var dateEditor = div().appendTo(wrapperHeader).fontSize(18).fontColor('gray').clear('right').float('right');

    var titleEditor = div().size('600px', '40px').appendTo(codeWrapper).fontSize(30).fontBold().margin(20).fontColor('#05aa33').overflow('scroll');
    var codeEditor = div().appendTo(codeWrapper).size('95%', '80%').marginTop(10).padding(20).fontSize(20).overflow('scroll');

});
