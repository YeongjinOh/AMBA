$(document).ready(function(){
	var defaultMessage = 'To do';
	var parent = div().size('100%','100%').append();
	var viewer = div().size(350,500).minHeight(50).color('sky').padding(10)
	.overflow('scroll').border(1).borderColor('orange').borderRadius(20).appendTo(parent);
	var bottomBarHeight = 50;
	var bottomBar = div().size(350,bottomBarHeight).margin(10).css('display','block').appendTo(parent);

	var inputForm = div().size(230-20,bottomBarHeight-20).attr('contenteditable','true').margin('auto 12px').padding(10).color('gray').text(defaultMessage).appendTo(bottomBar);
	var inputButton = div().size(50,bottomBarHeight).margin('auto 13px').color('yellow').appendTo(bottomBar);
	var blank = div();

	var uncheckedList = div().margin(0).minHeight(0).appendTo(viewer).setParentWidth();
	var checkedList = div().margin(0).minHeight(0).appendTo(viewer).setParentWidth();

	// set insert functionality
	inputButton.click(function (e) {
		var text = inputForm.text();
		inputForm.text(defaultMessage);
		var checked = false;
		var todoWrapper = div().appendTo(uncheckedList).setParentWidth().borderOption('1px dotted','bottom').borderOption('rgb(200,200,200)','color');

		var todo = div().height(30).padding(10).marginTop(10).verticalAlign('bottom').text(text).appendTo(todoWrapper).fontSize(18).fontBold();

		// set effect onto todoWrapper
		todoWrapper.hover(function () {
			todoWrapper.color('rgb(220,253,244)');
		}, function () {
			todoWrapper.color('white');
		})
		.click(function (){
			checked = !checked;
			if (checked) {
				todo.textLineThrough().fontColor('gray').fontNormal();
				todoWrapper.detach().appendTo(checkedList);
			}
			else {
				todo.textLineNone().fontColor('black').fontBold();
				todoWrapper.detach().appendTo(uncheckedList);
			}
		})
		var cancelButton = div().margin(15).size(10,10).color('gray').css('float','right').appendTo(todoWrapper).click(function () {
			todoWrapper.remove();
			blank.appendTo(viewer);
		});
		blank.appendTo(viewer);
	});
});
