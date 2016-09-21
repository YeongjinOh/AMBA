$(document).ready(function(){

	var parent = div().size('100%','100%').append();
	var viewer = div().size(350,500).minHeight(50).color('sky')
		//.click(function(e){})
	.overflow('scroll').border(1).borderColor('orange').borderRadius(20).appendTo(parent);

	var bottomBarHeight = 50;
	var bottomBar = div().size(350,bottomBarHeight).margin(10).css('display','block').appendTo(parent);

	var inputForm = div().size(230-20,bottomBarHeight-20).attr('contenteditable','true').css('position','relative').margin('-20px 12px 0px 12px').padding(10).color('gray').text('To do').appendTo(bottomBar);
	var inputButton = div().size(50,bottomBarHeight).margin('auto 13px').color('yellow').appendTo(bottomBar);

	// set insert functionality
	inputButton.click(function (e) {
		var text = inputForm.text();
		inputForm.text('To do');
		var checked = false;
		var todo = div();
		todo.size('100%',20).margin(5).padding(10).color('gray').text(text).appendTo(viewer).click(function (e){
			checked = !checked;
			if (checked)
				todo.color('black');
			else
				todo.color('gray');
		});
	});
});
