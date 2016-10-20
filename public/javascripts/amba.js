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
    this.$text = $('<span>');
    this.$image = $('<img>');
    this.$.data('div', this);
    this.class('amba');
    this.param = {};
    this.displayInlineBlock();
    this.isAddedText = false;
    this.verticalAlign('top');
    this.boxSizingBorderBox();
}

Div.prototype.attr = function (key, value) {
    if (value === undefined)
        return this.$.attr(key);

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

Div.prototype.prependTo = function (parent) {
    this.$.prependTo(parent.$);
    return this;
};

/**
 * prev 다음에 위치하도록 append 합니다.
 * @author Yeongjin Oh
 */
Div.prototype.after = function (prev) {
    prev.$.after(this.$);
    return this;
}

Div.prototype.parent = function () {
    return this.$.parent().data('div');
};

Div.prototype.children = function () {
    var arr = this.$.children();
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr.eq(i).data('div'))
            result.push(arr.eq(i).data('div'));
    }
    return result;
};

/**
 * 함수를 받아 div에 적용하고, 다시 div를 리턴합니다.
 * @author Yeongjin OH
 */
Div.prototype.deco = function (fn) {
    if (typeof fn === "function")
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
        return this.$.css(key);
    this.param[key] = value;
    this.$.css(key, value);
    return this;
};

Div.prototype.cssText = function (key, value) {
    if (value === undefined)
        return this.$text.css(key);
    this.param[key] = value;
    this.$text.css(key, value);
    return this;
};

/**
 * other에 입력한 css style을 그대로 복사하여 this에 적용합니다.
 * @author Yeongjin Oh
 */
Div.prototype.cssSameWith = function (other) {
    var params = other.params();
    for (var prop in params) {
        this.css(prop, params[prop]);
    }
    return this;
};

Div.prototype.params = function (key) {
    if (arguments.length === 0)
        return this.param;
    return this.param[key];
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
    return propertyName.replace(/-[a-z]/g, hyphenLowerToUpper);
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
        Div.prototype[getMethodName(propertyName + '-' + valueName)] = function () {
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
        Div.prototype[getMethodName(propertyName + '-' + valueName)] = function () {
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
        "align-content": [],
        "align-items": [],
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
        "box-sizing": ['border-box', 'content-box', 'padding-box'],
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
        "overflow": ['hidden', 'scroll', 'auto'],
        "overflow-x": ['hidden', 'scroll', 'auto'],
        "overflow-y": ['hidden', 'scroll', 'auto'],
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
        "text-overflow": ['clip', 'ellipsis'],
        "text-shadow": [],
        "text-transform": [],
        "white-space": ['inherit', 'normal', 'nowrap', 'pre', 'pre-line', 'per-wrap']
    };

    // cssProperties안에 정의된 모든 css property를 Div의 메서드에 추가합니다.
    for (property in cssProperties) {
        addCssMethod(property);
        for (var i = 0; i < cssProperties[property].length; i++) {
            var value = cssProperties[property][i];
            addCssMethod(property, value);
        }
    }

    // cssTextProperties안에 정의된 모든 css의 text관련 property를 Div의 메서드에 추가합니다.
    for (property in cssTextProperties) {
        addCssTextMethod(property);
        for (var i = 0; i < cssTextProperties[property].length; i++) {
            var value = cssTextProperties[property][i];
            addCssTextMethod(property, value);
        }
    }
};

addAllCssMethods();

Div.prototype.textInterceptor = function (fn) {
    this.fnText = fn;
}

Div.prototype.text = function (txt) {
    if (this.fnText) {
        return this.fnText(txt);
    }

    // otherwise, use span tag for text
    if (txt === undefined)
        return this.$text.text();
    this.$text.text(txt);
    if (this.isAddedText === false) {
        this.isAddedText = true;
        this.$text.appendTo(this.$);

        // text를 입력하기 전에 font-size를 설정하였는지 확인합니다.
        // 그렇지 않다면, default size 14를 줍니다.
        if (this.param['font-size'] === undefined)
            this.fontSize(14);
    }
    return this;
};

Div.prototype.fontColor = function (color) {
    return this.cssText('color', color);
};

/**
 * @desc set font weight bold
 * @author Yeongjin Oh
 */
Div.prototype.fontBold = function () {
    return this.cssText('font-weight', 'bold');
};

Div.prototype.fontNormal = function () {
    return this.cssText('font-weight', 'normal');
};

Div.prototype.border = function (value) {
    if (typeof value === 'number') {
        var style = this.borderStyle();
        if (style == 'none' || style == '')
            style = 'solid';
        return this.css('border', value + 'px ' + style);
    }
    return this.css('border', value);
};


// TODO remove borderOption
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
    return parseInt(this.$.parent().css('width'));
};

Div.prototype.parentHeight = function () {
    return parseInt(this.$.parent().css('height'));
};

/**
 * @desc jquery position을 이용해서, left의 좌표를 받아옵니다.
 * @author Yoengjin Oh
 */
Div.prototype.positionLeft = function () {
    return this.$.position().left;
};

/**
 * @desc jquery position을 이용해서, top의 좌표를 받아옵니다.
 * @author Yoengjin Oh
 */
Div.prototype.positionTop = function () {
    return this.$.position().top;
}

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
Div.prototype.disableSelection = function () {
    this.css('user-drag', 'none');
    this.css('user-select', 'none');
    this.css('-moz-user-select', 'none');
    this.css('-webkit-user-drag', 'none');
    this.css('-webkit-user-select', 'none');
    this.css('-ms-user-select', 'none');

    return this;
};

Div.prototype.selectable = function (value) {
    if (value === 'disable' || value === false) {
        this.css('user-drag', 'none');
        this.css('user-select', 'none');
        this.css('-moz-user-select', 'none');
        this.css('-webkit-user-drag', 'none');
        this.css('-webkit-user-select', 'none');
        this.css('-ms-user-select', 'none');
    } else {
        this.css('user-drag', '');
        this.css('user-select', '');
        this.css('-moz-user-select', '');
        this.css('-webkit-user-drag', '');
        this.css('-webkit-user-select', '');
        this.css('-ms-user-select', '');
    }
    return this;
};

/**
 * @desc     Content가 넘치면 scroll을 생성한다.
 * @since    2016-09-25
 * @author   Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.overflowAuto = function () {
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

Div.prototype.resizable = function (opt) {
    this.$.resizable(opt);
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
 * @desc jquery animate 메서드를 이용하여 애니메이션 효과를 적용합니다.
 * @param properties animation을 적용할 property와 value들을 가진 object입니다.
 *        예를 들어, { width: "70%", opacity: 0.4, marginLeft: "0.6in", fontSize: "3em", borderWidth: "10px" }
 *        와 같은 object가 될 수 있습니다.
 *        duration animation이 수행되는 시간
 *        callback animation이 완료되고 수행될 함수
 * @author Yeongjin Oh
 */
Div.prototype.animate = function (properties, duration, callback) {
    this.$.animate(properties, duration, callback);
    return this;
};


Div.prototype.slideDown = function (duration, easing, complete) {
    this.$.slideDown(duration, easing, complete);
    return this;
};

Div.prototype.slideUp = function (duration, easing, complete) {
    this.$.slideUp(duration, easing, complete);
    return this;
};


Div.prototype.hide = function (duration, easing, complete) {
    this.$.hide(duration, easing, complete);
    return this;
};

Div.prototype.show = function (duration, easing, complete) {
    this.$.show(duration, easing, complete);
    return this;
};

Div.prototype.fadeIn = function (duration, easing, complete) {
    this.$.fadeIn(duration, easing, complete);
    return this;
};

Div.prototype.fadeOut = function (duration, easing, complete) {
    this.$.fadeOut(duration, easing, complete);
    return this;
};


/**
 * @desc    hover event
 * @since    2016-09-20
 * @author    Yoon JiSoo yjsgoon@naver.com
 */

Div.prototype.hover = function (fn1, fn2) {
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

Div.prototype.hoverColor = function (color1, color2) {
    var that = this;
    var fn1Func, fn2Func;
    if (color1) {
        fn1Func = function () {
            that.color(color1);
        };
    }

    if (color2) {
        fn2Func = function () {
            that.color(color2);
        };
    }

    this.$.hover(fn1Func, fn2Func);
    return this;
};

Div.prototype.hoverTextColor = function (color1, color2) {
    var that = this;
    var fn1Func, fn2Func;
    if (color1) {
        fn1Func = function () {
            that.fontColor(color1);
        };
    }

    if (color2) {
        fn2Func = function () {
            that.fontColor(color2);
        };
    }

    this.$.hover(fn1Func, fn2Func);
    return this;
};

Div.prototype.change = function (fn) {
    if (fn === undefined) {
        return this.$.change();
    }

    var that = this;
    this.$.change(function (e) {
        if (fn) fn(that, e);
    });
    return this;
};

Div.prototype.keyup = function (fn) {
    if (fn === undefined) {
        return this.$.keyup();
    }

    var that = this;
    this.$.keyup(function (e) {
        if (fn) fn(that, e);
    });
    return this;
};

Div.prototype.keydown = function (fn) {
    if (fn === undefined) {
        return this.$.keydown();
    }

    var that = this;
    this.$.keydown(function (e) {
        if (fn) fn(that, e);
    });
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
    if (value === 'disable' || value === false)
        this.$text.attr('contentEditable', false);
    else {
        this.$text.attr('contentEditable', true);
        //this.$text('');
    }
    return this;
};


/**
 * @desc    password
 * @since    2016-09-26
 * @author    Yoon JiSoo yjsgoon@naver.com
 */
Div.prototype.textPassword = function (value) {
    if (value === false)
        return this.css('-webkit-text-security', 'none');
    return this.css('-webkit-text-security', 'disc');
};


/**
 * @desc jquery empty를 이용해서 children을 지웁니다.
 *      $text는 text가 있는 상황이면 항상 this.$에 append 되어 있습니다.
 * @author Yeongjin Oh
 */
Div.prototype.empty = function () {
    var $span = this.$text;
    var needToAttach = false;

    if ($span.parent() == this.$) {
        $span.text('');
        $span.detach();
        needToAttach = true;
    }
    this.$.empty();

    if (needToAttach)
        $span.appendTo(this.$);
    return this;
};

Div.prototype.remove = function () {
    this.$.remove();
    return this;
};

Div.prototype.button = function () {
    this.$.button();
    return this;
};

Div.prototype.html = function (tag) {
    if (tag === undefined)
        return this.$text.html();
    this.$text.html(tag);
    return this;
};

// TODO text, html intercepting (Jisoo)
Div.prototype.markdown = function (string) {
    var that = this;
    if (string === undefined)
        string = this.text();
    AB.loadModule('showdown', function () {
        var sdModule = module.showdown.converter();
        var htmlText = sdModule.makeHtml(string);
        that.html(htmlText);
    });

    return this;
};

/**
 * 현재 Div를 localStorage에 저장된 code를 보여주는 viewer로 세팅합니다.
 * @author Yeongjin Oh
 */
Div.prototype.iframe = function (src) {

    // remove iframe
    if (src === '') {
        if (this.$iframe)
            this.$iframe.remove();
        return this;
    }
    if (src === undefined) {
        return this.$iframe;
    }
    if (this.$iframe)
        this.$iframe.attr('src', src);
    else {
        this.$iframe = $('<iframe>').attr('src', src).width('100%').height('100%').css('border', 'none');
        this.$iframe.appendTo(this.$);
    }
    return this;
};

Div.prototype.verticalAlignMiddle = function () {
    var i, ch = this.children();
    this.paddingTop(0);
    var minTop = 99999, maxBottom = 0;
    for (i = 0; i < ch.length; i++) {
        if (minTop > ch[i].offset().top)
            minTop = ch[i].offset().top;

        if (maxBottom < ch[i].offset().top + parseInt(ch[i].height()))
            maxBottom = ch[i].offset().top + parseInt(ch[i].height());
    }
    minTop -= this.offset().top;
    maxBottom -= this.offset().top;

    var paddingTop = (parseInt(this.height()) - maxBottom) / 2;
    this.paddingTop(paddingTop);
    this.height(this.heightPixel() - paddingTop);

    return this;
};

Div.prototype.image = function (src) {
    if (src === '') {
        if (this.$image)
            this.$image.remove();
        return this;
    }

    if(src===undefined && this.$image)
        return this.$image.attr('src');

    //downloadingImage를 다운 받았을때,
    this.$image.attr('src', '/javascripts/loadingBar.gif').appendTo(this.$);//.height('100%').width('100%');
    this.$downloadingImage = $('<img>');
    this.$downloadingImage.attr('src', src);
    var that = this;
    this.$downloadingImage.load(function (e) {
        var w = e.target.naturalWidth;
        var h = e.target.naturalHeight;

        //부모 div의 사이즈
        var pw = parseInt(that.width(),10);
        var ph = parseInt(that.height(),10);

        if(w*ph<h*pw){
            that.$image.height('100%').attr('src', src);
        }else{
            that.$image.width('100%').attr('src', src);
        }
    });
    return this;
};
Div.prototype.uploadTest = function () {
    var that = this;
    var i = 0;
    this.fileCount = 0;

    div().appendTo(this).size('auto', 'auto').text('Upload').fontSize(25).disableSelection().cursorPointer()
        .click(function () {
            var formData = new FormData();
            for (i = 0; i < that.fileCount; i++) {
                formData.append('amba_file', $('input[name=amba_file]')[i].files[0]);
            }

            $.ajax({
                url: '/fileupload/put',
                data: formData,
                processData: false,
                contentType: false,
                type: 'post',
                success: function (data) {
                    alert('Success\n' + JSON.stringify(data));
                }
            });
        });

    div().attr('id', 'utest').appendTo(this).size('auto', 'auto').float('right').text('+').fontSize(30).disableSelection().cursorPointer()
        .click(function () {
            // opt: max count!!
            that.fileCount++;
            // 이쁘게 바꾸기!! input tag를 숨기고 이미지를 누르면 파일 브라우저가 나오게!
            $('<input>').attr('type', 'file').attr('name', 'amba_file').appendTo(that.$).button();
        });

    // test.$.button();

    return this;
};

Div.prototype.fileSelectable = function (fn) {
    var that = this;

    this.click(function () {
        $('<input>').attr('type', 'file').attr('name', 'amba_file').hide().appendTo(that.$).click(function (e) {
            e.stopPropagation();
        }).trigger('click').change(function () {
            if (typeof fn === 'function')
                fn(that, $(this).get(0).files[0]);
        });
    });

    return this;
};

/**
 * @author Lights
 * @desc ace에디터를 통해 가독성 높은 소스를 출력, div의 id값을 파라미터로 넘겨줘서 해당 div에 적용
 *
 * @returns {Div}
 */
Div.prototype.aceEditor = function (opt) {
    var that = this;

    // set ace module
    require(["aceCdn"], function () {

        // read ace module
        require(['ace/ace'], function (ace) {

            /** set amba aceditor **/

            var editor = ace.edit(that.$.get(0));
            editor.setTheme("ace/theme/tomorrow_night_eighties");

            //js문법에 따라 하이라이팅을 준다
            editor.getSession().setMode("ace/mode/javascript");

            // editor.setShowInvisibles(true);            // 탭이나 공백, 엔터 기호를 보여줍니다.
            if (opt !== undefined)
                editor.setOptions(opt);
            editor.$blockScrolling = Infinity;
            that.aceValue = editor;

            that.textInterceptor(function (txt) {
                if (txt === undefined)
                    return editor.getValue();
                else
                    editor.setValue(txt);
                return that;
            });
        });
    });

    return this;
};

Div.prototype.tinymce = function (opt) {
    var that = this;
    var child = div().id('ab_tm'+AB.random(99999)).size('100%','100%').appendTo(this);

    if (opt === undefined) {
        opt = {target: child.$.get(0)};
    }
    else {
        opt.target = child.$.get(0);
    }

    require(['//cdn.tinymce.com/4/tinymce.min.js'], function () {
        tinymce.init(opt);

        that.textInterceptor(function(txt) {
            if (txt === undefined)
                return tinymce.get(child.id()).getContent();
            tinymce.get(child.id()).setContent(txt);
            return that;
        });
    });

    return this;
};

Div.prototype.summernote = function (opt, src) {
    var that = this;
    var child = div().size('100%', '100%').appendTo(this);
    require(['https://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js', 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.js'], function () {
        child.$.summernote(opt, src);

        // child.remove(); 를 하면 binding된 object가 사라져서 안된다.
        child.detach();
        that.textInterceptor(function(txt) {
            if (txt === undefined)
                return child.$.summernote('code');
            child.$.summernote('code', txt);
            return that;
        });
    });

    return this;
};

Div.prototype.disqus = function (sector, title) {
    var that = this;

    if (this.$script) {
        this.empty();
        return this;
    }

    div().appendTo(this).attr('id', 'disqus_thread').size('100%', '100%');

    sector = parseInt(sector);
    if (!sector)
        sector = 1;
    if (title === undefined || title === '')
        title = 'amba';

    disqus_config = function () {
        this.page.identifier = 'amba';
        this.page.url = '//amba.com/unique-path-' + sector + '/';
        this.page.title = title;
    };
    (function() {
        var d = document, s = d.createElement('script');
        s.src = '//amba.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();

    return this;
};