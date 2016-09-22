function div() {
    return new Div();
}

function Div() {
    this.$ = $('<div></div>');
    this.displayInlineBlock();
    this.isAddedText = false;
    this.verticalAlign('top');
}

Div.prototype.css = function (key, value) {
    if (value === undefined) {
        return this.$.css(key);
    }

    this.$.css(key, value);
    return this;
}


Div.prototype.attr = function (key, value) {
    if (value === undefined) {
        return this.$.attr(key);
    }

    this.$.attr(key, value);
    return this;
}

/**
 * @desc set div's class name
 * @param value
 * @returns {Div}
 */
Div.prototype.setClass = function (value) {
    this.attr('class', value)
    return this;
}

/**
 * get div's Class name
 */
Div.prototype.getClass = function () {
    //this.$.attr('class')

    return this.attr('class');
}


//Div.prototype.width = function (px) {
//    if (px === undefined)
//        return this.css('width');
//    this.css('width', px);
//    return this;
//}



Div.prototype.append = function () {
    $('body').append(this.$);
    return this;
}

Div.prototype.appendTo = function (parent) {
    this.$.appendTo(parent.$);
    return this;
}

/**
 * @desc Div 객체에 parent 속성을 추가하여 이를 이용한 함수들을 구현합니다.
 * @author Yeongjin Oh
 */
Div.prototype.appendToParent = function (parent) {
    this.$.appendTo(parent.$);
    this.parent = parent;
    return this;
}

Div.prototype.getParent = function () {
    return this.parent;
}

/**
 * @desc parent 속성을 가진 객체인 경우, parent 객체의 width의 해당 ratio만큼을 width로 설정합니다.
 * @author Yeongjin Oh
 */
Div.prototype.setParentWidth = function (ratio) {
    if (this.parent === undefined)
        return this;

    var width = parseInt(this.parent.width());
    if (typeof ratio === 'number')
        width = width * ratio;
    return this.width(width);
}

Div.prototype.setParentHeight = function (ratio) {
    if (this.parent === undefined)
        return this;

    var height = parseInt(this.parent.height());
    if (typeof ratio === 'number')
        height *= ratio;
    return this.height(height);
}

/**
 * 함수를 받아 div에 적용하고, 다시 div를 리턴합니다.
 * @author Yeongjin OH
 */
Div.prototype.apply = function (fn) {
    fn(this);
    return this;
}

Div.prototype.remove = function () {
    this.$.remove();
    return this;
}

Div.prototype.detach = function () {
    this.$.detach();
    return this;
}

Div.prototype.displayInlineBlock = function () {
    this.css('display', 'inline-block');
    return this;
}

/**
 * @desc    set display block
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.displayBlock = function () {
    this.css('display', 'block');
    return this;
}

/**
 * @desc    set display status
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.display = function (display) {
    if (display === undefined)
        this.css('display');
    this.css('display', display);
    return this;
}

Div.prototype.align = function (value) {
    if (!value)
        this.css('text-align');
    this.css('text-align', value);
    return this;
}

/**
 * @desc    set text-align center
 * @since    2016-09-21
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.alignCenter = function () {
    this.css('text-align', 'center');
    return this;
}

/**
 * @desc    set text-align right
 * @since    2016-09-21
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.alignRight = function () {
    this.css('text-align', 'right');
    return this;
}

Div.prototype.verticalAlign = function (value) {
    if (!value)
        return this.css('vertical-align');
    this.css('vertical-align', value);
    return this;
}

Div.prototype.text = function (txt) {
    if (txt === undefined)
        return this.$.text();
    this.$.text(txt);
    if (this.isAddedText === false) {
        this.textSize(14);
    }
    return this;
}

Div.prototype.textColor = function (color) {
    return this.css('color',color);
}

Div.prototype.textSize = function (px) {
    if (px === undefined)
        return this.css('font-size');
    this.css('font-size', px);
    this.isAddedText = true;
    return this;
}

/**
 * @desc set font weight bold
 * @author Yeongjin Oh
 */
Div.prototype.textBold = function () {
    return this.css('font-weight','bold');
}

Div.prototype.textNormal = function () {
    return this.css('font-weight','normal');
}

/**
 * @desc set text-decoration line-through
 * @author Yeongjin Oh
 */
Div.prototype.textLineThrough = function () {
    return this.css('text-decoration', 'line-through');
}

/**
 * @desc remove text-decoration
 * @author Yeongjin Oh
 */
Div.prototype.textLineNone = function () {
    return this.css('text-decoration', 'none');
}

/**
 * @desc    범위를 넘어가면 text를 자른다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textClip = function() {
    this.css('text-overflow', 'clip');

    return this;
}

/**
 * @desc    범위를 넘어가는 text를 ...으로 표현한다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textHide = function() {
    this.css('text-overflow', 'ellipsis');
    this.css('white-space', 'nowrap');
    this.css('overflow', 'hidden');

    return this;
}

/**
 * border와 관련된 다양한 옵션들을 자유롭게 쓸 수 있도록 바꾸었습니다.
 * @param value border의 width가 될 숫자값 혹은 '2px solid'와 같은 value
 * @param option 'color', 'bottom', 'width' 등 border-option 과 같이 css에서 정의되어있는 border property
 * example usage : border(3) == css('border','3px solid'), border('red','color) == css('border-color','red')
 *                 border(1,'bottom') == css('border-bottom','1px solid'), border(undefined,'style')==css('border-style')
 */
Div.prototype.border = function (value, option) {
    var key = 'border';
    if (typeof option === 'string')
        key += '-' + option;
    if (typeof value === 'number')
        return this.css(key, value + 'px solid');
    return this.css(key, value);
}


Div.prototype.borderColor = function (c) {
    if (c === undefined)
        return this.css('border-color');

    this.css('border-color', c);
    return this;
}

Div.prototype.borderRadius = function (px) {
    if (px === undefined)
        return this.css('border-radius');
    this.css('border-radius', px);
    return this;
}

Div.prototype.color = function (c) {
    if (c === undefined)
        return this.css('background-color');

    this.css('background-color', c);
    return this;
}

Div.prototype.width = function (px) {
    if (px === undefined)
        return this.css('width');
    this.css('width', px);
    return this;
}

Div.prototype.minWidth = function (px) {
    if (px === undefined)
        return this.css('min-width');
    this.css('min-width', px);
    return this;
}

Div.prototype.height = function (px) {
    if (px === undefined)
        return this.css('height');
    this.css('height', px);
    return this;
}

Div.prototype.minHeight = function (px) {
    if (px === undefined)
        return this.css('min-height');
    this.css('min-height', px);
    return this;
}

Div.prototype.parentWidth = function () {
    return this.getParent().width();
}


Div.prototype.parentHeight = function () {
    return this.getParent().height();
}

Div.prototype.margin = function (px) {
    if (px === undefined)
        return this.css('margin');
    this.css('margin', px);
    return this;
}

Div.prototype.marginTop = function (px) {
    return this.css('margin-top', px);
}

Div.prototype.marginRight = function (px) {
    return this.css('margin-right', px);
}

Div.prototype.marginBottom = function(px) {
    return this.css('margin-bottom', px);
}

Div.prototype.marginLeft = function (px) {
    return this.css('margin-left', px);
}

Div.prototype.padding = function (px) {
    if (px === undefined)
        return this.css('padding');
    this.css('padding', px);
    return this;
}

/**
 * @desc    left padding
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 * @todo    create top, right, bottom
 */
Div.prototype.paddingLeft = function (px) {
    if (px === undefined)
        return this.css('padding-left');
    this.css('padding-left', px);
    return this;
}

/**
 * @desc    set none-drag element
 * @since    2016-09-21
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textDragNone = function () {
    this.css('user-drag', 'none');
    this.css('user-select', 'none');
    this.css('-moz-user-select', 'none');
    this.css('-webkit-user-drag', 'none');
    this.css('-webkit-user-select', 'none');
    this.css('-ms-user-select', 'none');

    return this;
}

/**
 * @desc    set mouse pointer on text
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textCursor = function(value) {
    if (value === undefined)
        return this.css('curosr');
    this.css('cursor', value);
    return this;
}

Div.prototype.textCursorAuto = function() {
    this.css('cursor', 'auto');
    return this;
}

Div.prototype.textCursorDefault = function() {
        this.css('cursor', 'default');
        return this;
}

Div.prototype.textCursorCrosshair = function() {
        this.css('cursor', 'crosshair');
        return this;
}

Div.prototype.textCursorPointer = function() {
        this.css('cursor', 'pointer');
        return this;
}

Div.prototype.textCursorMove = function() {
        this.css('cursor', 'move');
        return this;
}

Div.prototype.textCursorMove = function() {
        this.css('cursor', 'move');
        return this;
}

Div.prototype.textCursorText = function() {
        this.css('cursor', 'text');
        return this;
}

Div.prototype.textCursorWait = function() {
        this.css('cursor', 'wait');
        return this;
}

Div.prototype.textCursorHelp = function() {
        this.css('cursor', 'help');
        return this;
}

Div.prototype.overflow = function (value) {
    if (value === undefined)
        return this.css('overflow');
    this.css('overflow', value);
    return this;
}

Div.prototype.size = function (w, h) {
    if (arguments.length == 0) {
        return {
            width: this.width(),
            height: this.height()
        }
    }

    this.width(w);
    this.height(h);
    return this;
}

Div.prototype.offset = function (x, y) {
    if (arguments.length == 0) {
        return this.$.offset();
    }

    this.$.offset({
        left: x,
        top: y
    });

    return this;
}

Div.prototype.click = function (fn) {
    if (fn === undefined) {
        return this.$.click();
    }

    var that = this;
    this.$.click(function () {
        if (fn) fn(that);
    });
    return this;
}

Div.prototype.draggable = function (opt) {
    this.$.draggable(opt);
    return this;
}

Div.prototype.moveDown = function (y, delay) {
    var value = y >= 0 ? '+' + y : '-' + y;
    this.$.animate({
        top: value
    }, delay);
    return this;
}

/**
 * @desc    hover event
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 */

Div.prototype.hover = function(fn1, fn2) {
	var that = this;
	if (fn1) {
		var fn1Func = fn1;
		fn1 = function () {
			fn1Func(that);
		};
	}

	if (fn2) {
		var fn2Func = fn2;
		fn2 = function () {
			fn2Func(that);
		};
	}

	this.$.hover(fn1, fn2);
	return this;
}
/**
 * @desc    stop animation
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 * @todo    add parameter
 */

Div.prototype.stop = function () {
    this.$.stop();
    return this;
}

/**
 * @desc set editable at div
 * @param value
 * @returns {Div}
 */
Div.prototype.isEditable = function (value) {
	this.attr('contentEditable', value);
	if(value == true){
		this.text('');
	}
	return this;
}

