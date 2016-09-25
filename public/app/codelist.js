$(document).ready(function(){

    // initialize variables
    var basicColor = '#11bb55';
    // var editFlag = false;
    var currentBlock;

    var parent = div().append().size('100%','100%');
    var sidebar = div().appendTo(parent).size('5%','100%');
    var codelist = div().appendTo(parent).size('25%','100%').border(1).overflow('scroll');
    var codeWrapper = div().appendTo(parent).size('65%','100%').padding(20);

    // design sidebar

    var getCurrentDate = function () {
        var date = new Date();
        var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var curr_date = date.getDate();
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();
        var curr_hour = date.getHours();
        var curr_min = date.getMinutes();
        var curr_sec = date.getSeconds();
        return (curr_date + "-" + m_names[curr_month]
            + "-" + curr_year + "  " + curr_hour + ":" + curr_min + ":" + curr_sec);
    }


    var onAdd = function () {
        var blockWrapper = div().appendTo(listWrapper).size('100%','100px').padding(10).borderOption('1px solid','bottom').borderOption('rgb(200,200,200)','color').color('#fafafa');
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
        };
        var onClick = function () {
            title.isEditable(true).text(block.title.text());
            date.text(block.date.text());
            code.isEditable(true).text(block.code);
            saveButton.visibility('visible');
            currentBlock = block;
        }
        blockWrapper.hover(onHover,offHover).click(onClick);
    };

    var addButton = div().appendTo(sidebar).size(30,30).margin(15).marginTop(40).text('+').textBold().textSize(28).textColor('green').border(1).borderColor(basicColor).borderOption('100%','radius')
        .align('center').verticalAlign('middle').click(onAdd).textCursorDefault();

    var onSave = function () {
        currentBlock.title.text(title.text());
        currentBlock.code = code.text();
        var curDate = getCurrentDate();
        currentBlock.date.text(curDate);
        date.text(curDate);
    }

    // design codelist
    var listHeader = div().appendTo(codelist).size('100%','120px').color('#dddddd');
    var listHeaderTitle = div().appendTo(listHeader).size('100%','40px').marginTop(20).text('Code List').textSize(28).alignCenter();
    var listName = div().appendTo(listHeader).size('100%','50px').marginTop(20).text('javascript').textSize(20).textColor('gray').alignCenter();
    var listWrapper = div().appendTo(codelist).size('100%',codelist.getAbsoluteHeight()-listHeader.getAbsoluteHeight()).borderOption('1px solid gray','top');

    // design codeWrapper
    var wrapperHeader = div().appendTo(codeWrapper).size('95%', '60px').padding(20).borderOption('1px solid gray','bottom');
    var title = div().size('600px','40px').appendTo(wrapperHeader).textSize(30).textBold().marginTop(10).textColor('#05aa33').overflow('scroll');
    var saveButton = div().appendTo(wrapperHeader).size(50,20).padding(5).color('#05aa33').text('Save').textColor('white').alignCenter().textSize(18).verticalAlign('middle')
        .borderOption(5,'radius').float('right').visibility('hidden').click(onSave);
    var date = div().appendTo(wrapperHeader).marginTop(5).textSize(18).textColor('gray').clear('right').float('right').verticalAlign('text-bottom');
    var code = div().appendTo(codeWrapper).size('95%', '80%').marginTop(10).padding(20).textSize(20).overflow('scroll');

});
