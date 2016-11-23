define([], function () {

    var parent = div().width('100%').margin(50);
    /** header **/
    var header = div().appendTo(parent).width('100%').padding(30).color('#f44336');
    div().appendTo(header).width('100%').margin(10).text('My To Do List').textAlignCenter().fontColor('white').fontSize(30);
    var inputForm = div().appendTo(header).size('100%',40);
    var input = div().appendTo(inputForm).size('80%','100%').padding(7).color('white').editable(true).text('').fontSize(16);
    var button = div().appendTo(inputForm).size('20%','100%').color('#cccccc').text('Add').textAlignCenter().paddingTop(9).cursorPointer()
        .click(function () {
            var selected = false;
            var todo = div().appendTo(todoList).size('100%',60).padding(15).paddingLeft(30).color('#eeeeee')
                .text(input.text()).fontSize(20).hoverColor('#cccccc','#eeeeee')
                .click(function () {
                    if (selected) todo.textDecoration('none');
                    else todo.textDecoration('line-through');
                    selected = !selected;
                });
            input.text('');
            var cancel = div().appendTo(todo).margin(5).floatRight().text('x').cursorPointer().click(function () {
                todo.remove();
                cancel.remove();
            });
        });
    /** content viewer **/
    var todoList = div().appendTo(parent).width('100%');
    return {
        appendTo : function (target) {
            parent.appendTo(target);
        }
    };
});