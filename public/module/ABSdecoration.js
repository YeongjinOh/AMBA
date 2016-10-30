define ([], function() {
    var module = {};

    module.value = {};

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
        var contextMenuBar = div().append().id('abs-context-menu').size(100, 'auto').zIndex(1000).position('absolute')
            .color('#cccccc').border('1px solid gray').borderRadius(2).displayNone(); // overflowHidden()
        var decoMenu = function (dv) {
            dv.size('100%', 25).padding(3).cursorPointer().hoverColor('gray', '#cccccc').selectable(false);
        };
        var decoMenuSub = function (dv) {
            dv.size('100%', 25).text('').editable().cursorText().color('white').borderRadius(2).border('2px solid gray');
            div().appendTo(dv).size(20, '100%').float('right').text('OK').fontBold().fontSize(10).textAlignCenter()
                .color('#cccccc').selectable(false).cursorPointer().hoverColor('gray', '#cccccc').click(function() {
                    // $('#abs-sub-menu').empty();
            });
        };
        var menu1 = div().appendTo(contextMenuBar).deco(decoMenu).text('color').click(function () {
            var pallet_color = [
                ['#660000', '#800000', '#990000', '#b30000', '#cc0000', '#e60000', '#ff0000', '#ff1a1a',
                    '#ff3333', '#ff4d4d', '#ff6666', '#ff8080', '#ff9999', '#ffb3b3', '#ffcccc', '#ffe6e6'],
                ['#662900', '#803300', '#993d00', '#b34700', '#cc5200', '#e65c00', '#ff6600', '#ff751a',
                    '#ff8533', '#ff944d', '#ffa366', '#ffb380', '#ffc299', '#ffd1b3', '#ffe0cc', '#fff0e6'],
                ['#666600', '#808000', '#999900', '#b3b300', '#cccc00', '#e6e600', '#ffff00', '#ffff1a',
                    '#ffff33', '#ffff4d', '#ffff66', '#ffff80', '#ffff99', '#ffffb3', '#ffffcc', '#ffffe6'],
                ['#006600', '#008000', '#009900', '#00b300', '#00cc00', '#00e600', '#00ff00', '#1aff1a',
                    '#33ff33', '#4dff4d', '#66ff66', '#80ff80', '#99ff99', '#b3ffb3', '#ccffcc', '#e6ffe6'],
                ['#000066', '#000080', '#000099', '#0000b3', '#0000cc', '#0000e6', '#0000ff', '#1a1aff',
                    '#3333ff', '#4d4dff', '#6666ff', '#8080ff', '#9999ff', '#b3b3ff', '#ccccff', '#e6e6ff'],
                ['#000066', '#000080', '#000099', '#0000b3', '#0000cc', '#0000e6', '#0000ff', '#1a1aff',
                    '#3333ff', '#4d4dff', '#6666ff', '#8080ff', '#9999ff', '#b3b3ff', '#ccccff', '#e6e6ff'],
                ['#700f70', '#871287', '#9d159d', '#b418b4', '#ca1cca', '#e01fe0', '#e335e3', '#e74be7',
                    '#ea62ea', '#ed78ed', '#ee82ee', '#f08ff0', '#f3a5f3', '#f6bcf6', '#f9d2f9', '#fce9fc'],
                ['#000000', '#262626', '#404040', '#4d4d4d', '#595959', '#666666', '#737373', '#808080',
                    '#8c8c8c', '#999999', '#a6a6a6', '#b3b3b3', '#bfbfbf', '#d9d9d9', '#f2f2f2', '#ffffff']];

            var pallet = div().id('pallet').appendTo(contextMenuBar).size(325, 'auto').color('white').cursorPointer().borderRadius(2).border('2px solid gray');
            for(var i=0; i<pallet_color.length; i++) {
                for(var j=0; j<pallet_color[i].length; j++) {
                    var cell = div().appendTo(pallet).size(20, 20).color('white').hoverColor('gray', 'white').click(function(dv) {
                        var curDiv = $('#' + idContainer.id).data('div');
                        curDiv.color(dv.children()[0].color());

                        $(document).bind('mousedown', function(e) {
                            if (!$(e.target).parents("#pallet").length > 0) {
                                $('#pallet').hide(100).remove();
                            }
                        });
                    });
                    div().appendTo(cell).displayBlock().size(16, 16).margin('auto').marginTop(2).color(pallet_color[i][j]);
                }
            }

            callback();
        });
        var menu2 = div().appendTo(contextMenuBar).deco(decoMenu).text('edge').click(function () {
            // if(!$('#abs-sub-menu')) {
            //     console.log('asdf');
            //     return false;
            // }
            //
            // var subMenuBar = div().id('abs-sub-menu').appendTo(contextMenuBar).position('absolute').size('100%', 25).text('').editable().cursorText().color('white').borderRadius(2).border('2px solid gray');
            //
            // div().appendTo(subMenuBar).size(20, '100%').float('right').text('OK').fontBold().fontSize(10).textAlignCenter()
            //     .color('#cccccc').selectable(false).cursorPointer().hoverColor('gray', '#cccccc').click(function() {
            //     $(document).bind('mousedown', function(e) {
            //         if (!$(e.target).parents("#abs-sub-menu").length > 0) {
            //             $('#abs-sub-menu').hide(100).remove();
            //         }
            //     });
            // });

            callback();
        });
        var menu3 = div().appendTo(contextMenuBar).deco(decoMenu).text('menu3').click(function () {
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
