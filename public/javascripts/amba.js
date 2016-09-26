function div() {
    return new Div();
}
// TODO : text 속성은 span에서만.

function Div() {
    this.$ = $('<div></div>');
    this.$text = $('<span>').appendTo(this.$);
    this.$.data('div', this);
    this.param = {};
    this.displayInlineBlock();
    this.isAddedText = false;
    this.verticalAlign('top');
}

Div.prototype.css = function (key, value) {
    if (value === undefined)
        return this.param[key];
    this.param[key] = value;
    this.$.css(key, value);
    return this;
};

Div.prototype.cssText = function (key, value) {
    if (value === undefined)
        return this.param[key];
    this.param[key] = value;
    this.$text.css(key, value);
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

/**
 * 정규표현식을 이용하여 '-'을 없애고 '-' 뒤 첫번째 문자를 대문자로 바꿉니다.
 * @param propName propertyName
 * @returns methodName
 * @author Yeongjin Oh
 */
var getMethodName = function (propertyName) {
    var hyphenLowerToUpper = function (match) {
        return match.slice(1).toUpperCase();
    };
    return propertyName.replace(/-[a-z]/g,hyphenLowerToUpper);
};

/**
 * 주어진 css property를 Div의 메서드에 추가합니다.
 * @author Yeongjin Oh
 */
var addCssMethod = function (propertyName) {
    Div.prototype[getMethodName(propertyName)] = function (value) {
        return this.css(propertyName, value);
    };
};

/**
 * cssProperties 배열에 정의된 모든 css property들을 Div의 메서드에 추가합니다.
 * @author Yeongjin Oh
 */
var addAllCssMethods = function () {

    var cssProperties = [
        "align-content",
        "align-items",
        "align-self",
        "all",
        "animation",
        "animation-delay",
        "animation-direction",
        "animation-duration",
        "animation-fill-mode",
        "animation-iteration-count",
        "animation-name",
        "animation-play-state",
        "animation-timing-function",
        "backface-visibility",
        "background",
        "background-attachment",
        "background-blend-mode",
        "background-clip",
        "background-color",
        "background-image",
        "background-origin",
        "background-position",
        "background-repeat",
        "background-size",
        "border",
        "border-bottom",
        "border-bottom-color",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-bottom-style",
        "border-bottom-width",
        "border-collapse",
        "border-color",
        "border-image",
        "border-image-outset",
        "border-image-repeat",
        "border-image-slice",
        "border-image-source",
        "border-image-width",
        "border-left",
        "border-left-color",
        "border-left-style",
        "border-left-width",
        "border-radius",
        "border-right",
        "border-right-color",
        "border-right-style",
        "border-right-width",
        "border-spacing",
        "border-style",
        "border-top",
        "border-top-color",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-top-style",
        "border-top-width",
        "border-width",
        "bottom",
        "box-shadow",
        "box-sizing",
        "caption-side",
        "clear",
        "clip",
        "color",
        "column-count",
        "column-fill",
        "column-gap",
        "column-rule",
        "column-rule-color",
        "column-rule-style",
        "column-rule-width",
        "column-span",
        "column-width",
        "columns",
        "content",
        "counter-increment",
        "counter-reset",
        "cursor",
        "direction",
        "display",
        "empty-cells",
        "filter",
        "flex",
        "flex-basis",
        "flex-direction",
        "flex-flow",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "float",
        "font",
        // "@font-face",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "hanging-punctuation",
        "height",
        "justify-content",
        // "@keyframes",
        "left",
        "letter-spacing",
        "line-height",
        "list-style",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "max-height",
        "max-width",
        // "@media",
        "min-height",
        "min-width",
        "nav-down",
        "nav-index",
        "nav-left",
        "nav-right",
        "nav-up",
        "opacity",
        "order",
        "outline",
        "outline-color",
        "outline-offset",
        "outline-style",
        "outline-width",
        "overflow",
        "overflow-x",
        "overflow-y",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "page-break-after",
        "page-break-before",
        "page-break-inside",
        "perspective",
        "perspective-origin",
        "position",
        "quotes",
        "resize",
        "right",
        "tab-size",
        "table-layout",
        "text-align",
        "text-align-last",
        "text-decoration",
        "text-decoration-color",
        "text-decoration-line",
        "text-decoration-style",
        "text-indent",
        "text-justify",
        "text-overflow",
        "text-shadow",
        "text-transform",
        "top",
        "transform",
        "transform-origin",
        "transform-style",
        "transition",
        "transition-delay",
        "transition-duration",
        "transition-property",
        "transition-timing-function",
        "unicode-bidi",
        "vertical-align",
        "visibility",
        "white-space",
        "width",
        "word-break",
        "word-spacing",
        "word-wrap",
        "z-index"
    ];
    for (var i=0; i<cssProperties.length; i++) {
        addCssMethod(cssProperties[i]);
    };
};

addAllCssMethods();

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
Div.prototype.textOverflowClip = function() {
    return this.css('text-overflow', 'clip');
};

/**
 * @desc    범위를 넘어가는 text를 ...으로 표현한다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textOverflowEllipsis = function() {
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
Div.prototype.whiteSpaceNowrap = function () {
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

Div.prototype.color = function (c) {
    return this.css('background-color', c);
};

Div.prototype.parentWidth = function () {
    return this.parent().width();
};

Div.prototype.parentHeight = function () {
    return this.parent().height();
};

/**
 * height 값을 pixel로 받아옵니다.
 * @author Yeongjin Oh
 */
Div.prototype.heightPixel = function () {
    return parseInt(this.$.css('height'));
};
Div.prototype.widthPixel = function () {
    return parseInt(this.$.css('width'));
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
Div.prototype.overflowAuto = function() {
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
Div.prototype.editable = function (value) {
    if(value === 'diable' || value === false)
        return this.attr('contentEditable', false);
     return this.attr('contentEditable', true);
};

/**
 * @desc    password
 * @since    2016-09-26
 * @author    Yoon JiSoo yjsgoon@naver.com
 * @todo    Source에 유연성을 추가해야 한다.
 */
Div.prototype.isTextPassword = function(value) {
    if(value === true)
        return this.css('-webkit-text-security', 'disc');
    else
        return this.css('-webkit-text-security', 'none');
};
