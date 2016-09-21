function div() {
	return new Div();
}

function Div() {
	this.$ = $('<div></div>');
	this.displayInlineBlock();
	this.isAddedText = false;
	this.verticalAlign('top');
}

Div.prototype.css = function(key, value) {
	if(value === undefined) {
		return this.$.css(key);
	}

	this.$.css(key, value);
	return this;
}


Div.prototype.attr = function(key, value) {
	if(value === undefined) {
		return this.$.attr(key);
	}

	this.$.attr(key, value);
	return this;
}

Div.prototype.append = function() {
	$('body').append(this.$);
	return this;
}

Div.prototype.appendTo = function(parent) {
	this.$.appendTo(parent.$);
	return this;
}

Div.prototype.displayInlineBlock = function() {
	this.css('display', 'inline-block');
	return this;
}

/**
 * @desc	set display block
 * @since	2016-09-20
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.displayBlock = function() {
	this.css('display', 'block');
	return this;
}

/**
 * @desc	set display status
 * @since	2016-09-20
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.display = function(display) {
	if(display === undefined)
		this.css('display');
	this.css('display', display);
	return this;
}

Div.prototype.align = function(value) {
	if(!value)
		this.css('text-align');
	this.css('text-align', value);
	return this;
}

/**
 * @desc	set text-align center
 * @since	2016-09-21
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.alignCenter = function() {
	this.css('text-align', 'center');
	return this;
}

/**
 * @desc	set text-align right
 * @since	2016-09-21
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.alignRight = function() {
	this.css('text-align', 'right');
	return this;
}

Div.prototype.verticalAlign = function(value) {
	if(!value)
		return this.css('vertical-align');
	this.css('vertical-align', value);
	return this;
}

Div.prototype.textSize = function(px) {
	if(px === undefined)
		return this.css('font-size');
	this.css('font-size', px);
	this.isAddedText = true;
	return this;
}

Div.prototype.text = function(txt) {
	if(txt === undefined)
		return this.$.text();
	this.$.text(txt);
	if(this.isAddedText === false) {
		this.textSize(14);
	}
	return this;
}

Div.prototype.border = function(px) {
	if(px === undefined)
		return this.css('border');

	this.css('border', px+'px solid');
	return this;
}

Div.prototype.borderColor = function(c) {
	if(c === undefined)
		return this.css('border-color');

	this.css('border-color', c);
	return this;
}

Div.prototype.borderRadius = function(px) {
	if(px === undefined)
		return this.css('border-radius');
	this.css('border-radius', px);
	return this;
}

Div.prototype.color = function(c) {
	if(c === undefined)
		return this.css('background-color');

	this.css('background-color', c);
	return this;
}

Div.prototype.width = function(px) {
	if(px === undefined)
		return this.css('width');
	this.css('width', px);
	return this;
}

Div.prototype.minWidth = function(px) {
	if(px === undefined)
		return this.css('min-width');
	this.css('min-width', px);
	return this;
}

Div.prototype.height = function(px) {
	if(px === undefined)
		return this.css('height');
	this.css('height', px);
	return this;
}

Div.prototype.minHeight = function(px) {
	if(px === undefined)
		return this.css('min-height');
	this.css('min-height', px);
	return this;
}

Div.prototype.margin = function(px) {
	if(px === undefined)
		return this.css('margin');
	this.css('margin', px);
	return this;
}

Div.prototype.padding = function(px) {
	if(px === undefined)
		return this.css('padding');
	this.css('padding', px);
	return this;
}

/**
 * @desc	left padding
 * @since	2016-09-20
 * @author	Yoon JiSoo yjsgoon@naver.com
 * @todo	create top, right, bottom
 */
Div.prototype.paddingLeft = function(px) {
	if(px === undefined)
		return this.css('padding-left');
	this.css('padding-left', px);
	return this;
}

/**
 * @desc	set attr
 * @since	2016-09-21
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
// Div.prototype.attr = function(key, value) {
// 	if(value === undefined) {
// 		return this.$.attr(key);
// 	}
//
// 	this.$.attr(key, value);
// 	return this;
// }

/**
 * @desc	set none-select element
 * @since	2016-09-21
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.selectNone = function() {
	this.css('user-select', 'none');

	return this;
}

Div.prototype.overflow = function(value) {
	if(value === undefined)
		return this.css('overflow');
	this.css('overflow', value);
	return this;
}

Div.prototype.size = function(w, h) {
	if(arguments.length == 0) {
		return {
			width: this.width(),
			height: this.height()
		}
	}

	this.width(w);
	this.height(h);
	return this;
}

Div.prototype.offset = function(x, y) {
	if(arguments.length == 0) {
		return this.$.offset();
	}

	this.$.offset({
		left: x,
		top: y
	});

	return this;
}

Div.prototype.click = function(fn) {
	if(fn === undefined) {
		return this.$.click();
	}

	var that = this;
	this.$.click(function(){
		if(fn) fn(that);
	});
	return this;
}

Div.prototype.draggable = function(opt) {
	this.$.draggable(opt);
	return this;
}

Div.prototype.moveDown = function(y, delay) {
	var value = y >= 0 ? '+'+y : '-'+y;
	this.$.animate({
		top: value
	}, delay);
	return this;
}

/**
 * @desc	hover event
 * @since	2016-09-20
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.hover = function(fn1, fn2) {
	var that = this;
	if(fn1) {
		var fn1Func = fn1;
		fn1 = function(){
			fn1Func(that);
		};
	}

	if(fn2) {
		var fn2Func = fn2;
		fn2 = function(){
			fn2Func(that);
		};
	}
	
	this.$.hover(fn1, fn2);
	return this;
}

/**
 * @desc	stop animation
 * @since	2016-09-20
 * @author	Yoon JiSoo yjsgoon@naver.com
 * @todo	add parameter
 */
Div.prototype.stop = function() {
	this.$.stop();
	return this;
}
