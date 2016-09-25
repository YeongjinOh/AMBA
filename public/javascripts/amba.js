function div() {
    return new Div();
}

function Div() {
    this.$ = $('<div></div>');
    this.$.data('div', this);
    this.param = {};
    this.displayInlineBlock();
    this.isAddedText = false;
    this.verticalAlign('top');
}

Div.prototype.css = function (key, value) {
    if (value === undefined) {
        //return this.$.css(key);
        return this.param[key];
    }

    this.param[key] = value;
    this.$.css(key, value);
    return this;
};

Div.prototype.attr = function (key, value) {
    if (value === undefined) {
        alert(key);
        alert(value);
        return this.$.attr(key);
    }

    this.$.attr(key, value);
    return this;
};

Div.prototype.id = function (value) {
    return this.attr('id', value);
};

Div.prototype.class = function (value) {
    return this.attr('class', value);
};

Div.prototype.append = function () {
    $('body').append(this.$);
    return this;
};

Div.prototype.appendTo = function (parent) {
    this.$.appendTo(parent.$);
    return this;
};

Div.prototype.parent = function () {
    return this.$.parent().data('div');
};

Div.prototype.children = function () {
    var arr = this.$.children();
    return _.map(arr, function(o){
        console.log(o);
        return o.data('div');
    });
};

/**
 * @desc parent 속성을 가진 객체인 경우, parent 객체의 width의 해당 ratio만큼을 width로 설정합니다.
 * @author Yeongjin Oh
 */
Div.prototype.setParentWidth = function (ratio) {
   var width = parseInt(this.parent().width());
   if (typeof ratio === 'number')
       width = width * ratio;
   return this.width(width);
};

Div.prototype.setParentHeight = function (ratio) {
   var height = parseInt(this.parent().height());
   if (typeof ratio === 'number')
       height *= ratio;
   return this.height(height);
};

/**
 * 함수를 받아 div에 적용하고, 다시 div를 리턴합니다.
 * @author Yeongjin OH
 */
Div.prototype.deco = function (fn) {
    fn(this);
    return this;
};

Div.prototype.remove = function () {
    this.$.remove();
    return this;
};

Div.prototype.detach = function () {
    this.$.detach();
    return this;
};

Div.prototype.displayInlineBlock = function () {
    return this.css('display', 'inline-block');
};

/**
 * @desc    set display block
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.displayBlock = function () {
    return this.css('display', 'block');

};

/**
 * @desc    set display status
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.display = function (display) {
    return this.css('display', display);
};

Div.prototype.align = function (value) {
    return this.css('text-align', value);
};

/**
 * @desc visibility 속성을 이용합니다. visible, hidden, collapse 등의 value를 취할 수 있습니다.
 * @author Yeongjin Oh
 */
Div.prototype.visibility = function (value) {
    return this.css('visibility', value);
};


/**
 * @desc    set text-align center
 * @since    2016-09-21
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.alignCenter = function () {
    return this.css('text-align', 'center');
};

/**
 * @desc    set text-align right
 * @since    2016-09-21
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.alignRight = function () {
    return this.css('text-align', 'right');
};

Div.prototype.verticalAlign = function (value) {
    return this.css('vertical-align', value);
};

Div.prototype.text = function (txt) {
    if (txt === undefined)
        return this.$.text();
    this.$.text(txt);
    if (this.isAddedText === false) {
        this.textSize(14);
    }
    return this;
};

Div.prototype.textColor = function (color) {
    return this.css('color',color);
};

Div.prototype.textSize = function (px) {
    if (px === undefined)
        return this.css('font-size');
    this.css('font-size', px);
    this.isAddedText = true;
    return this;
};

/**
 * @desc set font weight bold
 * @author Yeongjin Oh
 */
Div.prototype.textBold = function () {
    return this.css('font-weight','bold');
};

Div.prototype.textNormal = function () {
    return this.css('font-weight','normal');
};

/**
 * @desc set text-decoration line-through
 * @author Yeongjin Oh
 */
Div.prototype.textLineThrough = function () {
    return this.css('text-decoration', 'line-through');
};

/**
 * @desc remove text-decoration
 * @author Yeongjin Oh
 */
Div.prototype.textLineNone = function () {
    return this.css('text-decoration', 'none');
};

/**
 * @desc    범위를 넘어가면 text를 자른다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.isTextClip = function() {
    return this.css('text-overflow', 'clip');
};

/**
 * @desc    범위를 넘어가는 text를 ...으로 표현한다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.isTextHide = function() {
    this.css('text-overflow', 'ellipsis');
    this.css('white-space', 'nowrap');
    this.css('overflow', 'hidden');

    return this;
};

/**
 * @desc    text가 길어도 줄바꿈이 되지 않는다.
 * @since   2016-09-25
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.isTextNoSpace = function () {
    return this.css('white-space', 'nowrap');
};

// css('border', '1px 2px 3px 4px') 와 같은 입력이 적용되지 않는 것 같습니다.
// 'border-bottom', 'border-top'  등등 각각에 입력을 해야 할까요? (Yeongjin 09/23)
Div.prototype.border = function (value) {
    if (typeof value === 'string') {
        var parse = function (num) {
            return parseInt(num);
        }
        value = _.chain(value.split(' ')).map(parse).value().join('px ') + 'px';
    }
    else if (typeof value === 'number')
        return this.css('border', value + 'px solid black');
    return this.css('border', value);
};


/**
 * border와 관련된 다양한 옵션들을 자유롭게 쓸 수 있도록 바꾸었습니다.
 * @param value border의 width가 될 숫자값 혹은 '2px solid'와 같은 value
 * @param option 'color', 'bottom', 'width' 등 border-option 과 같이 css에서 정의되어있는 border property
 * example usage : border(3) == css('border','3px solid'), border('red','color) == css('border-color','red')
 *                 border(1,'bottom') == css('border-bottom','1px solid'), border(undefined,'style')==css('border-style')
 * @author Yeongjin Oh
 */
Div.prototype.borderOption = function (value, option) {
    var key = 'border';
    if (typeof option === 'string') {
        key += '-' + option;
    }
    else if (typeof value === 'number')
        return this.css(key, value + 'px solid #eee');
    return this.css(key, value);
};

Div.prototype.borderStyle = function (style) {
    return this.css('border-style', style);
};


Div.prototype.borderColor = function (c) {
    return this.css('border-color', c);
};

Div.prototype.borderRadius = function (px) {
    return this.css('border-radius', px);
};

Div.prototype.color = function (c) {
    return this.css('background-color', c);
};

Div.prototype.width = function (px) {
    return this.css('width', px);
};

Div.prototype.minWidth = function (px) {
    return this.css('min-width', px);
};

Div.prototype.maxWidth = function (px) {
    return this.css('max-width', px);
};

Div.prototype.height = function (px) {
    return this.css('height', px);
};

Div.prototype.minHeight = function (px) {
    return this.css('min-height', px);
};

Div.prototype.maxHeight = function (px) {
    return this.css('max-height', px);
};

Div.prototype.parentWidth = function () {
    return this.parent().width();
};


Div.prototype.parentHeight = function () {
    return this.parent().height();
};

Div.prototype.margin = function (px) {
    return this.css('margin', px);
};

Div.prototype.marginTop = function (px) {
    return this.css('margin-top', px);
};

Div.prototype.marginRight = function (px) {
    return this.css('margin-right', px);
};

Div.prototype.marginBottom = function(px) {
    return this.css('margin-bottom', px);
};

Div.prototype.marginLeft = function (px) {
    return this.css('margin-left', px);
};

Div.prototype.padding = function (px) {
    return this.css('padding', px);
};

Div.prototype.float = function (value) {
    return this.css('float', value);
};

Div.prototype.clear = function (value) {
    return this.css('clear', value);
};


/**
 *
 */
Div.prototype.getAbsoluteHeight = function () {
    return parseInt(this.$.css('height'));
};
Div.prototype.getAbsoluteWidth = function () {
    return parseInt(this.$.css('width'));
};

/**
 * @desc    left padding
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 * @todo    create top, right, bottom
 */
Div.prototype.paddingLeft = function (px) {
    return this.css('padding-left', px);
};

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
};

/**
 * @desc    set mouse pointer on text
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textCursor = function(value) {
    return this.css('cursor', value);
};

Div.prototype.textCursorAuto = function() {
    return this.css('cursor', 'auto');
};

Div.prototype.textCursorDefault = function() {
    return this.css('cursor', 'default');
};

Div.prototype.textCursorCrosshair = function() {
    return this.css('cursor', 'crosshair');
};

Div.prototype.textCursorPointer = function() {
    return this.css('cursor', 'pointer');
};

Div.prototype.textCursorMove = function() {
    return this.css('cursor', 'move');
};

Div.prototype.textCursorText = function() {
    return this.css('cursor', 'text');
};

Div.prototype.textCursorWait = function() {
    return this.css('cursor', 'wait');
};

Div.prototype.textCursorHelp = function() {
    return this.css('cursor', 'help');
};

Div.prototype.overflow = function (value) {
    return this.css('overflow', value);
};

/**
 * @desc     Content가 넘치면 scroll을 생성한다.
 * @since    2016-09-25
 * @author   Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.isOverflowAuto = function() {
    return this.css('overflow', 'auto');
};

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
};

Div.prototype.offset = function (x, y) {
    if (arguments.length == 0) {
        return this.$.offset();
    }

    this.$.offset({
        left: x,
        top: y
    });

    return this;
};

Div.prototype.click = function (fn) {
    if (fn === undefined) {
        return this.$.click();
    }

    var that = this;
    this.$.click(function (e) {
        if (fn) fn(that, e);
    });
    return this;
};

Div.prototype.draggable = function (opt) {
    this.$.draggable(opt);
    return this;
};

Div.prototype.moveDown = function (y, delay) {
    var value = y >= 0 ? '+' + y : '-' + y;
    this.$.animate({
        top: value
    }, delay);
    return this;
};

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
};

Div.prototype.hoverColor = function(color1, color2) {
    var that = this;
    var fn1Func, fn2Func;
    if (color1) {
        fn1Func = function(){
            that.color(color1);
        };
    }

    if (color2) {
        fn2Func = function(){
            that.color(color2);
        };
    }

    this.$.hover(fn1Func, fn2Func);
    return this;
};

Div.prototype.hoverTextColor = function(color1, color2) {
    var that = this;
    var fn1Func, fn2Func;
    if (color1) {
        fn1Func = function(){
            that.textColor(color1);
        };
    }

    if (color2) {
        fn2Func = function(){
            that.textColor(color2);
        };
    }

    this.$.hover(fn1Func, fn2Func);
    return this;
};


/**
 * @desc    stop animation
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 * @todo    add parameter
 */
Div.prototype.stop = function () {
    this.$.stop();
    return this;
};

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
};

/**
 * @desc    password
 * @since    2016-09-26
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.isTextPassword = function(value) {
    if(value === true)
        return this.css('-webkit-text-security', 'disc');
    else
        return this.css('-webkit-text-security', false);
};