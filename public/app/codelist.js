$(document).ready(function(){

    // initialize variables
    var basicColor = '#11bb55';
    // var editFlag = false;
    var currentBlock, title, description, date, code, saveButton;

    var parent = div().append().size('100%','100%');
    var sidebar = div().appendTo(parent).size('5%','100%');
    var codelist = div().appendTo(parent).size('25%','100%').border(1);
    var codeWrapper = div().appendTo(parent).size('65%','100%').padding(20);

    // design sidebar

    var addZeroIfNeeded = function (num) {
        num = parseInt(num);
        return num < 10? '0'+num : num;
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


    var onAdd = function () {
        var blockWrapper = div().appendTo(listWrapper).padding(10).size('100%','100px').borderOption('1px solid','bottom').borderOption('rgb(200,200,200)','color').color('#fafafa');
        var removeButton = div().appendTo(blockWrapper).size(10,15).text('X').textColor('gray').float('right').marginRight(20).textCursorPointer();
        var onRemove = function () {
            clicked +=1 ;
            if (clicked > 1) {
                blockWrapper.remove();
                title.text('').editable(false);
                description.text('').editable(false);
                date.text('');
                code.text('').editable(false);
                saveButton.visibility('hidden');
            } else {
                removeButton.color('orange');
            }
        };
        removeButton.click(onRemove);


        var clicked = 0;
        var block = {
            title : div().appendTo(blockWrapper).size('100%','30px').text('Title').textSize(20).textColor('#333333').textBold(),
            date : div().appendTo(blockWrapper).size('100%','15px').text(getCurrentDate()).textSize(12).textColor('gray'),
            description :  div().appendTo(blockWrapper).size('100%','35px').text('description').textSize(16).textColor('gray'),
            code : "code"
        };
        var onHover = function () {
            blockWrapper.color(basicColor);
            block.title.textColor('white');
            block.date.textColor('white');
            block.description.textColor('white');
        };
        var offHover = function () {
            blockWrapper.color('#fafafa');
            block.title.textColor('#333333');
            block.date.textColor('gray');
            block.description.textColor('gray');
            removeButton.color('inherit');
            clicked = 0;
        };
        var onClick = function () {
            title.editable(true).text(block.title.text());
            description.editable(true).css('outline','none').text(block.description.text());
            date.text(block.date.text());
            code.editable(true).text(block.code);
            saveButton.visibility('visible');
            currentBlock = block;
        }
        blockWrapper.hover(onHover,offHover).click(onClick);
    };

    var addButton = div().appendTo(sidebar).size(30,30).margin(15).marginTop(40).text('+').textBold().textSize(28).textColor('green').border(1).borderColor(basicColor).borderOption('100%','radius')
        .textAlign('center').verticalAlign('middle').click(onAdd).textCursorPointer();

    var onSave = function () {
        currentBlock.title.text(title.text());
        currentBlock.description.text(description.text());
        currentBlock.code = code.text();
        var curDate = getCurrentDate();
        currentBlock.date.text(curDate);
        date.text(curDate);
    }

    // design codelist
    var listHeader = div().appendTo(codelist).size('100%','120px').color('#dddddd');
    var listHeaderTitle = div().appendTo(listHeader).size('100%','40px').marginTop(20).text('Code List').textSize(28).alignCenter();
    var listName = div().appendTo(listHeader).size('100%','50px').marginTop(20).text('javascript').textSize(20).textColor('gray').alignCenter();
    var listWrapper = div().appendTo(codelist).size('100%',codelist.heightPixel()-listHeader.heightPixel()).borderOption('1px solid gray','top').overflow('scroll');

    // design codeWrapper
    var wrapperHeader = div().appendTo(codeWrapper).size('95%', '60px').padding(20).borderOption('1px solid gray','bottom');
    description = div().size('600px','60px').appendTo(wrapperHeader).textSize(20).textBold().textColor('gray').overflow('scroll');
    saveButton = div().appendTo(wrapperHeader).size(50,20).padding(5).color('#05aa33').text('Save').textColor('white').alignCenter().textSize(18).verticalAlign('middle')
        .borderOption(5,'radius').float('right').visibility('hidden').click(onSave).textCursorPointer();
    date = div().appendTo(wrapperHeader).marginTop(20).textSize(18).textColor('gray').clear('right').float('right');

    title = div().size('600px','40px').appendTo(codeWrapper).textSize(30).textBold().margin(20).textColor('#05aa33').overflow('scroll');
    code = div().appendTo(codeWrapper).size('95%', '80%').marginTop(10).padding(20).textSize(20).overflow('scroll');

});
