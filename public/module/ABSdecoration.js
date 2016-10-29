define ([], function() {
    var module = {};
    module.initContextMenu = function (callback) {
        var idContainer = {id: ''};

        // Div의 setContextMenu method 정의
        Div.prototype.setContextMenu = function (id) {
            this.$.bind("contextmenu", function (event) {

                // 기존의 context-menu 제거
                event.preventDefault();

                // 현재 div의 id 전달
                idContainer.id = id;
                console.log(id);
                // set ambasa context-menu
                $("#abs-context-menu").finish().toggle(100).css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
            });
            return this;
        };

        // context menubar 생성
        var contextMenuBar = div().append().id('abs-context-menu').size(100, 100).zIndex(1000).position('absolute')
            .color('#cccccc').border('1px solid gray').borderRadius(2).overflowHidden().displayNone();
        var decoMenu = function (dv) {
            dv.size('100%', 25).padding(3).cursorPointer().hoverColor('gray', '#cccccc');
        };
        var menu1 = div().appendTo(contextMenuBar).deco(decoMenu).text('red').click(function () {
            var curDiv = $('#' + idContainer.id).data('div');
            curDiv.color('red');
            $("#abs-context-menu").hide(100);
            callback();
        });
        var menu2 = div().appendTo(contextMenuBar).deco(decoMenu).text('border 10px').click(function () {
            var curDiv = $('#' + idContainer.id).data('div');
            curDiv.border('10px solid black');
            $("#abs-context-menu").hide(100);
            callback();
        });
        var menu3 = div().appendTo(contextMenuBar).deco(decoMenu).text('menu3').click(function () {
            alert('TODO');
            $("#abs-context-menu").hide(100);
            callback();
        });
        var menu4 = div().appendTo(contextMenuBar).deco(decoMenu).text('menu4').click(function () {
            alert('TODO');
            $("#abs-context-menu").hide(100);
            callback();
        });

        // 다른 곳 클릭시 context-menu hide
        $(document).bind("mousedown", function (e) {
            if (!$(e.target).parents("#abs-context-menu").length > 0) {
                $("#abs-context-menu").hide(100);
            }
        });
    };
    return module;
});