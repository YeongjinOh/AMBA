function div() {
	return new Div();
}

function Div() {
	this.$ = $('<div></div>');
	this.displayInlineBlock();
	this.textSize(0);
	this.isAddedText = false;
	// this.align('center');
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
	this.css('text-align', value);
	return this;
}

Div.prototype.textSize = function(px) {
	this.css('font-size', px);
	this.isAddedText = true;
	return this;
}

Div.prototype.text = function(txt) {
	// this.css('font-size', px);
	this.$.text(txt);
	if(this.isAddedText === false) {
		this.textSize(14);
	}
	return this;
}

Div.prototype.border = function(px) {
	this.css('border', px+'px solid');
	return this;
}

Div.prototype.borderColor = function(c) {
	this.css('border-color', c);
	return this;
}

Div.prototype.borderRadius = function(px) {
	this.css('border-radius', px);
	return this;
}

Div.prototype.color = function(c) {
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
	this.$.animate({
		top: '+20'
	}, delay);
	return this;
}

/**
 * @desc	hover event
 * @since	2016-09-20
 * @author	Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.hover = function(fn) {
	var that = this;
	this.$.hover(function(){
		if(fn) fn(that);
	});
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

$(document).ready(function(){

    var path = AB.getParameter('app');
	console.log('path : ', path);
	if(!path) {
		div().append().text('Please make first application');
    	return;
    }
    
    AB.loadScript('/app/'+path);
});