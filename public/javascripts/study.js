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

function random (max) {
	return parseInt(Math.random(max)*max);
}

$(document).ready(function(){
	var parent = div().size('100%','100%').minHeight(50).color('black').append().click(function(e){
		// div().size(4, 4).appendTo(parent).margin(10).color('red').border(1).borderColor('orange').align('center').textSize(30).draggable().click(function(dv){
		// 	dv.moveDown(10);
		// });
	}).overflow('scroll').border(1).borderColor('orange').borderRadius(20);

	for(var i=0; i<200; i++) {

		div().size(4, 4).appendTo(parent).color('white').offset(random(500), random(500));
	}

	// div().size(50,50).appendTo(parent).margin(10).color('pink');
	// div().size(200,50).appendTo(parent).margin(10).color('lightblue');

	// var parent2 = div().size(400,'auto').minHeight(50).color('yellow').append().align('center');

	// div().size(50,50).appendTo(parent2).margin(10).color('pink');
	// div().size(200,50).appendTo(parent2).margin(10).color('lightblue');

	// div().size(50,50).color('red').appendTo(parent);
	// for(var i=0; i<10; i++) {
	// 	div().size(50,50).color('green').appendTo(parent);//.border(2);
	// }
	

});






