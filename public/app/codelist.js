$(document).ready(function () {

    // initialize variables
    var basicColor = '#11bb55';
    var username = prompt("Enter your username").toLowerCase();
    var currentBlock, currentId, title, description, date, code, saveButton;

    var parent = div().append().size(outerWidth, outerHeight);

    var sidebar = div().appendTo(parent).size('5%', outerHeight).color('white');
    var content = div().appendTo(parent).size('95%',outerHeight);
    var projectList = div().appendTo(content).zIndex(-1).size('30%',outerHeight).border(1).borderOption('#aaaaaa','color');
        projectList.color('#eaeaea').position('absolute').left(content.positionLeft()).top(content.positionTop()).opacity(0);
    var codelist = div().appendTo(content).zIndex('1').size('25%', outerHeight).border(1).borderOption('#aaaaaa','color');
    var codeWrapper = div().appendTo(content).zIndex('1').size('65%', outerHeight).padding(20).color('white');
    var blank = div();

    // design sidebar

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
        + "-" + curr_year + "  " + curr_hour + ":" + curr_min + ":" + curr_sec);
    }


    // define index manager
    var IdManager = function () {

        var index = [];
        this.getIndex = function (fn) {
            $.get("/codes/index/get", {username: username})
                .done(function (data) {
                    index = data['index[]'];
                    if (index === undefined)
                        index = [];
                    else if (typeof index == "string")
                        index = [index];
                })
                .done(function () {
                    if (typeof fn === "function")
                        fn(index);
                });
        };

        this.updateIndex = function () {
            $.post("/codes/index/update", {username: username, index: index})
        };

        this.getNextIndex = function () {
            if (index.length === 0)
                return 1;
            return Number(index[index.length - 1]) + 1;
        };

        this.removeIndex = function (id) {
            for (var i=0; i<index.length; i++) {
                if (index[i] == id) {
                    index.splice(i,1);
                    break;
                }
            }
            this.updateIndex();
        };

        this.pushIndex = function (idx) {
            index.push(idx);
            // this.updateIndex();
        };
    };

    // initialize id manager, block manager
    var idManager = new IdManager();


    // codelist에 새로운 block을 추가하고, 이를 리턴하는 함수
    var newBlock = function (id) {
        var blockWrapper = div().appendTo(listWrapper).padding(10).size('100%', '100px').borderOption('1px solid', 'bottom').borderOption('rgb(200,200,200)', 'color').color('#fafafa');

        // remove functionality
        var removeButton = div().appendTo(blockWrapper).size(10, 15).text('X').fontColor('gray').float('right').marginRight(20).cursorPointer();
        var onRemove = function () {
            blockWrapper.remove();
            title.text('').editable(false);
            description.text('').editable(false);
            date.text('');
            code.text('').editable(false);
            saveButton.visibility('hidden');
            idManager.removeIndex(id);
            blank.appendTo(parent);
            deleteBlock(id);
        };
        removeButton.click(onRemove);

        var block = {
            title: div().appendTo(blockWrapper).size('100%', '30px').text('Title').fontSize(20).fontColor('#333333').fontBold(),
            date: div().appendTo(blockWrapper).size('100%', '15px').text(getCurrentDate()).fontSize(12).fontColor('gray'),
            description: div().appendTo(blockWrapper).size('100%', '35px').text('description').fontSize(16).fontColor('gray'),
            code: "code"
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
            clicked = 0;
        };
        var onClick = function () {
            title.editable(true).text(block.title.text());
            description.editable(true).css('outline', 'none').text(block.description.text());
            date.text(block.date.text());
            code.editable(true).text(block.code);
            saveButton.visibility('visible');
            currentBlock = block;
            currentId = id;
        }
        blockWrapper.hover(onHover, offHover).click(onClick);

        return block;
    };


    var onAdd = function () {
        var id = idManager.getNextIndex();
        var block = newBlock(id);
        idManager.pushIndex(id);
        saveBlock(id, block);
    };


    // post를 보내 file system에 block을 저장.
    var saveBlock = function (id, block) {

        $.post("/codes/code/update", {
            username: username,
            id: id,
            title: block.title.text(),
            date: block.date.text(),
            desc: block.description.text(),
            code: block.code
        })
            .done(function () {
                idManager.updateIndex();
            });
    };

    var deleteBlock = function (id) {
        $.post("/codes/code/delete", {
            username: username,
            id: id
        });
    };

    var onSave = function () {
        currentBlock.title.text(title.text());
        currentBlock.description.text(description.text());
        currentBlock.code = code.text();
        var curDate = getCurrentDate();
        currentBlock.date.text(curDate);
        date.text(curDate);

        saveBlock(currentId, currentBlock);
    };


    // initialize codelist
    var getBlock = function (id) {
        $.get("/codes/code/get", {username: username, id: id})
            .done(function (data) {
                var block = newBlock(id);
                block.title.text(data.title);
                block.date.text(data.date);
                block.description.text(data.desc);
                block.code = data.code;
            });
    };
    var getAllBlocks = function (index) {
        for (var i = 0; i < index.length; i++) {
            getBlock(Number(index[i]));
        }
    };
    idManager.getIndex(getAllBlocks);

    // create project list

    var projectHide=true;
    var onProject = function () {

        projectHide = !projectHide;
        if(projectHide)
            projectList.animate({opacity:0,'z-index':-1},300);
        else {
            projectList.zIndex(2);
            projectList.animate({opacity:1},300);
        }


    };

    var decoButton = function (div) {
        div.size(30, 30).margin(15).border(1).borderColor(basicColor).borderOption('100%', 'radius')
            .fontBold().fontSize(28).fontColor('green').textAlign('center').verticalAlign('middle').cursorPointer();
    };

    // design sidebar
    var addCodeButton = div().appendTo(sidebar).deco(decoButton).marginTop(40).text('+').click(onAdd);
    var projectButton = div().appendTo(sidebar).deco(decoButton).marginTop(10).text('P').click(onProject);


    // design projectlist
    var projectHeader = div().appendTo(projectList).size('100%', '150px').color('#bbbbbb');
    var projectHeaderTitle = div().appendTo(projectHeader).size('100%', '40px').marginTop(40).text('Project List').fontSize(28).textAlignCenter();
    var projectName = div().appendTo(projectHeader).size('100%', '50px').marginTop(20).text('project').fontSize(22).fontColor('gray').textAlignCenter();
    var projectListWrapper = div().appendTo(projectList).size('100%', projectList.heightPixel() - projectHeader.heightPixel()).borderOption('1px solid gray', 'top').overflow('scroll');


    // design codelist
    var listHeader = div().appendTo(codelist).size('100%', '120px').color('#dddddd');
    var listHeaderTitle = div().appendTo(listHeader).size('100%', '40px').marginTop(20).text('Code List').fontSize(28).textAlignCenter();
    var listName = div().appendTo(listHeader).size('100%', '50px').marginTop(20).text(username).fontSize(20).fontColor('darkgray').textAlignCenter();
    var listWrapper = div().appendTo(codelist).size('100%', codelist.heightPixel() - listHeader.heightPixel()).borderOption('1px solid gray', 'top').overflow('scroll').color('white');

    // design codeWrapper
    var wrapperHeader = div().appendTo(codeWrapper).size('95%', '60px').padding(20).borderOption('1px solid gray', 'bottom');
    description = div().size('600px', '60px').appendTo(wrapperHeader).fontSize(20).fontBold().fontColor('gray').overflow('scroll');
    saveButton = div().appendTo(wrapperHeader).size(50, 20).padding(5).color('#05aa33').text('Save').fontColor('white').textAlignCenter().fontSize(18).verticalAlign('middle')
        .borderOption(5, 'radius').float('right').visibility('hidden').click(onSave).cursorPointer();
    date = div().appendTo(wrapperHeader).fontSize(18).fontColor('gray').clear('right').float('right');

    title = div().size('600px', '40px').appendTo(codeWrapper).fontSize(30).fontBold().margin(20).fontColor('#05aa33').overflow('scroll');
    code = div().appendTo(codeWrapper).size('95%', '80%').marginTop(10).padding(20).fontSize(20).overflow('scroll');

});
