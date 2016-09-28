/**
 * @desc Div객체를 불러와 전역으로 사용
 * @returns {Div}
 */
function div() {
    return new Div();
}
/**
 * @DIV태그를 사용하기 위한 클래스
 * @constructor
 */

function Div() {
    this.$ = $('<div>');
    this.$text = $('<span>').appendTo(this.$);
    this.$.data('div', this);
    this.param = {};
    this.displayInlineBlock();
    this.isAddedText = false;
    this.verticalAlign('top');
}


/**
 * @author Lights
 * @desc ace에디터를 통해 가독성 높은 소스를 출력, div의 id값을 파라미터로 넘겨줘서 해당 div에 적용
 *
 * @returns {Div}
 */
Div.prototype.aceEditor = function () {
    var editor = ace.edit(this.$.get(0));

    editor.setTheme("ace/theme/monokai");

    //js문법에 따라 하이라이팅을 준다
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().on('change', function(e) {
        // e.type, etc
        //자동 저장 가능
    });
    editor.setShowInvisibles(true);            // 탭이나 공백, 엔터 기호를 보여줍니다.
    this.aceValue = editor;
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
 * @desc 주어진 css property를 Div의 메서드에 추가합니다.
 *      value가 함께 주어지면 propertyValue() 와 같이 인자를 받지 않는 메서드를 생성합니다.
 *      예를 들어, (text-align, center)가 입력으로 들어오면, textAlignCenter 메서드를 만듭니다.
 * @author Yeongjin Oh
 */
var addCssMethod = function (propertyName, valueName) {
    if (valueName === undefined) {
        Div.prototype[getMethodName(propertyName)] = function (value) {
            return this.css(propertyName, value);
        };
    } else {
        Div.prototype[getMethodName(propertyName+'-'+valueName)] = function () {
            return this.css(propertyName, valueName);
        };
    }
};

/**
 * @desc text를 꾸미는 css property를 Div의 span에 추가하는 메서드를 생성합니다.
 * @author Yeongjin Oh
 */
var addCssTextMethod = function (propertyName, valueName) {
    if (valueName === undefined) {
        Div.prototype[getMethodName(propertyName)] = function (value) {
            return this.cssText(propertyName, value);
        };
    } else {
        Div.prototype[getMethodName(propertyName+'-'+valueName)] = function () {
            return this.cssText(propertyName, valueName);
        };
    }
};

/**
 * cssProperties 배열에 정의된 모든 css property들을 Div의 메서드에 추가합니다.
 * @author Yeongjin Oh
 */
var addAllCssMethods = function () {

    var cssProperties = {
        "align-content" : [],
        "align-items" : [],
        "align-self": [],
        "all": [],
        "animation": [],
        "animation-delay": [],
        "animation-direction": [],
        "animation-duration": [],
        "animation-fill-mode": [],
        "animation-iteration-count": [],
        "animation-name": [],
        "animation-play-state": [],
        "animation-timing-function": [],
        "backface-visibility": [],
        "background": [],
        "background-attachment": [],
        "background-blend-mode": [],
        "background-clip": [],
        "background-color": [],
        "background-image": [],
        "background-origin": [],
        "background-position": [],
        "background-repeat": [],
        "background-size": [],
        "border": [],
        "border-bottom": [],
        "border-bottom-color": [],
        "border-bottom-left-radius": [],
        "border-bottom-right-radius": [],
        "border-bottom-style": [],
        "border-bottom-width": [],
        "border-collapse": [],
        "border-color": [],
        "border-image": [],
        "border-image-outset": [],
        "border-image-repeat": [],
        "border-image-slice": [],
        "border-image-source": [],
        "border-image-width": [],
        "border-left": [],
        "border-left-color": [],
        "border-left-style": [],
        "border-left-width": [],
        "border-radius": [],
        "border-right": [],
        "border-right-color": [],
        "border-right-style": [],
        "border-right-width": [],
        "border-spacing": [],
        "border-style": [],
        "border-top": [],
        "border-top-color": [],
        "border-top-left-radius": [],
        "border-top-right-radius": [],
        "border-top-style": [],
        "border-top-width": [],
        "border-width": [],
        "bottom": [],
        "box-shadow": [],
        "box-sizing": [],
        "caption-side": [],
        "clear": [],
        "clip": [],
        "color": [],
        "column-count": [],
        "column-fill": [],
        "column-gap": [],
        "column-rule": [],
        "column-rule-color": [],
        "column-rule-style": [],
        "column-rule-width": [],
        "column-span": [],
        "column-width": [],
        "columns": [],
        "content": [],
        "counter-increment": [],
        "counter-reset": [],
        "cursor": ["auto", "default", "crosshair", "pointer", "move", "text", "wait", "help"],
        "direction": [],
        "display": ["inline", "block", "flex", "inline-block", "none"],
        "empty-cells": [],
        "filter": [],
        "flex": [],
        "flex-basis": [],
        "flex-direction": [],
        "flex-flow": [],
        "flex-grow": [],
        "flex-shrink": [],
        "flex-wrap": [],
        "float": ["left", "right"],
        "hanging-punctuation": [],
        "height": [],
        "justify-content": [],
        // "@keyframes": [],
        "left": [],
        "letter-spacing": [],
        "line-height": [],
        "list-style": [],
        "list-style-image": [],
        "list-style-position": [],
        "list-style-type": [],
        "margin": [],
        "margin-bottom": [],
        "margin-left": [],
        "margin-right": [],
        "margin-top": [],
        "max-height": [],
        "max-width": [],
        // "@media": [],
        "min-height": [],
        "min-width": [],
        "nav-down": [],
        "nav-index": [],
        "nav-left": [],
        "nav-right": [],
        "nav-up": [],
        "opacity": [],
        "order": [],
        "outline": [],
        "outline-color": [],
        "outline-offset": [],
        "outline-style": [],
        "outline-width": [],
        "overflow": [],
        "overflow-x": [],
        "overflow-y": [],
        "padding": [],
        "padding-bottom": [],
        "padding-left": [],
        "padding-right": [],
        "padding-top": [],
        "page-break-after": [],
        "page-break-before": [],
        "page-break-inside": [],
        "perspective": [],
        "perspective-origin": [],
        "position": [],
        "quotes": [],
        "resize": [],
        "right": [],
        "tab-size": [],
        "table-layout": [],
        "text-align": ["left", "right", "center"],
        "text-align-last": [],
        "top": [],
        "transform": [],
        "transform-origin": [],
        "transform-style": [],
        "transition": [],
        "transition-delay": [],
        "transition-duration": [],
        "transition-property": [],
        "transition-timing-function": [],
        "unicode-bidi": [],
        "vertical-align": ["middle"],
        "visibility": [],
        "width": [],
        "word-break": [],
        "word-spacing": [],
        "word-wrap": [],
        "z-index": []
    };

    // css의 text 관련 property는 div tag가 아닌 span tag에 달기 위해 따로 처리합니다.
    // 다만, text-align, text-align-last와 같이 text의 위치를 설정하는 property는
    // 그 목적에 맞게 사용하기 위하여 cssProperties에 들어가 div tag의 속성으로 들어갑니다.
    // @author Yeongjin Oh
    var cssTextProperties = {
        "font": [],
        // "@font-face": [],
        "font-family": [],
        "font-size": [],
        "font-size-adjust": [],
        "font-stretch": [],
        "font-style": [],
        "font-variant": [],
        "font-weight": [],
        "text-decoration": ["line-through", "none"],
        "text-decoration-color": [],
        "text-decoration-line": [],
        "text-decoration-style": [],
        "text-indent": [],
        "text-justify": [],
        "text-overflow": [],
        "text-shadow": [],
        "text-transform": [],
        "white-space": [],
    }

    // cssProperties안에 정의된 모든 css property를 Div의 메서드에 추가합니다.
    for (property in cssProperties) {
        addCssMethod(property);
        for (var i=0; i<cssProperties[property].length; i++) {
            var value = cssProperties[property][i];
            addCssMethod(property, value);
        }
    };

    // cssTextProperties안에 정의된 모든 css의 text관련 property를 Div의 메서드에 추가합니다.
    for (property in cssTextProperties) {
        addCssTextMethod(property);
        for (var i=0; i<cssTextProperties[property].length; i++) {
            var value = cssTextProperties[property][i];
            addCssTextMethod(property, value);
        }
    }
};

addAllCssMethods();

// TODO : editable 속성의 div에서 text 받아오기.
Div.prototype.text = function (txt) {
    if (txt === undefined)
        return this.$text.text();
    this.$text.text(txt);
    if (this.isAddedText === false) {
        this.fontSize(14);
    }
    return this;
};

Div.prototype.fontColor = function (color) {
    return this.cssText('color',color);
};

/**
 * default size 설정을 위해 isAddedText flag를 이용하여 메서드 재정의
 * @author Yeongjin Oh
 */
Div.prototype.fontSize = function (px) {
    if (px === undefined)
        return this.cssText('font-size');
    this.cssText('font-size', px);
    this.isAddedText = true;
    return this;
};

/**
 * @desc set font weight bold
 * @author Yeongjin Oh
 */
Div.prototype.fontBold = function () {
    return this.cssText('font-weight','bold');
};

Div.prototype.fontNormal = function () {
    return this.cssText('font-weight','normal');
};

/**
 * @desc    범위를 넘어가면 text를 자른다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textOverflowClip = function() {
    return this.cssText('text-overflow', 'clip');
};

/**
 * @desc    범위를 넘어가는 text를 ...으로 표현한다.
 * @since   2016-09-22
 * @author  Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textOverflowEllipsis = function() {
    this.cssText('text-overflow', 'ellipsis');
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
            that.fontColor(color1);
        };
    }

    if (color2) {
        fn2Func = function(){
            that.fontColor(color2);
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
 * @desc set editable at span, text('')를 하지않으면 입력이 안됩니다
 * @todo span tag에 editable 속성을 주면 편집 공간(span)과 div의 크기가 다름.
 */
Div.prototype.editable = function (value) {
    if(value === 'disable' || value === false)
        this.$text.attr('contentEditable', false);
    else {
        this.$text.attr('contentEditable', true);
        //this.$.text('');
    }
    return this;
};

/**
 * @desc    password
 * @since    2016-09-26
 * @author    Yoon JiSoo yjsgoon@naver.com
 * @todo    Source에 유연성을 추가해야 한다.
 */
Div.prototype.textPassword = function(value) {
    if(value === false)
        return this.css('-webkit-text-security', 'none');
    return this.css('-webkit-text-security', 'disc');
};


function sock(){
    return new Sock();
}

function Sock() {
    this.primus = Primus.connect();

    //처음 접속하면 서버로부터 이름을 할당 받는다.
    primus.on('data', function (data) {
        var action = data.action;
        if('new' === action){

            //var nickname = data.message.nickname;
            //this.$.text(nickname);
        }
    });
    //primus객체를 사용하기위해 프로퍼티로 넣어준다.
    //this.primus = primus;
    //return this;
}



sock.prototype.new = function () {
    this.primus.on('data', function (data) {
        var action = data.action;
        if('new' === action){
            var nickname = data.message.nickname;
            this.$.text(nickname);
        }
    });
    return this;
}




/**
 * @desc 소켓연결을 하고 서버로부터 이름을 할당받는다. 언제할당받고 이름을 명명할지 고민할 필요가 있다.
 * @author Lightsoo
 * @returns {Div}
 */

Div.prototype.primus = function () {
    var primus = Primus.connect();
    //처음 접속하면 서버로부터 이름을 할당 받는다.
    //primus.on('data', function (data) {
    //    var action = data.action;
    //    if('new' === action){
    //        var nickname = data.message.nickname;
    //        this.text(nickname);
    //    }
    //});
    //primus객체를 사용하기위해 프로퍼티로 넣어준다.이렇게 하면 디브별로 primus객체를 가지게 되버려....
    this.primus = primus;
    return this;
}

/**
 * @desc 클릭 이벤트 | 엔터 키 이벤트가 발생하였을때, editable div의 텍스트 내용을 파라미터로 받아와서 전송
 * @param msg {string} - 서버에 보내기 위한 문자
 * @returns {Div}
 */
Div.prototype.sendMsg = function (msg) {
    this.primus.write({
        action : 'send_msg',
        message : {
            msg : msg
        }
    })
    //this.$.text('');
    return this;
}


/**
 * @desc 메시지를 받은 경우, 서버로부터 받은 메시지를 div의 텍스트에 적용하자.
 * 문자를 받을때 마다 div를 추가할테니 텍스트 적용만 하면 된다.
 * @returns {Div}
 */
Div.prototype.reciedMsg = function () {
    this.primus.on('on', function (data) {
        var action = data.action;
        var msg = data.message.msg;
        var nickname = data.message.nickname;
        if('new' === action){
            //var nickname = data.message.nickname;
            this.$.text(nickname);
        }

        if('broadcast_msg' == action) {
            //console.log(data.message.msg);
            //$('#msgs').append(data.message.msg+'<BR>');
            this.text(msg);
        }
    });
    return this;
}
