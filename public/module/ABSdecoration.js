define ([], function() {
    var i, j;
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
                // set ambasa context-menu
                $("#abs-context-menu").finish().toggle(100).css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
            });
            return this;
        };

        function syncMenu(cls, id) {
            if (AB.find('.'+cls)) {
                absRemove(AB.find('.' + cls).id());
                return true;
            }
            if (AB.find('#'+id)) {
                absRemove(id);
                return false;
            }
            return true;
        }

        function absRemove(id) {
            $('#'+id).hide(200);
            setTimeout(function() {$('#'+id).remove();}, 200);
        }

        function paperNum (seq, target, fn) {
            if (!syncMenu('third', 'abs-papernum'))
                return false;

            var root = div().class('third').id('abs-papernum').appendTo(target).position('absolute').size(60, 25).top(seq * 25).left(100)
                .color('white').borderRadius(2).border('2px solid gray').keypress(function(dv, e) {
                    if (e.which == 13) {
                        $('#papernum-ok').trigger('click');
                    }
                }).click(function(dv, e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

            var value = div().appendTo(root).size('65%', '100%').color('white').text('').editable().cursorText();
            div().id('papernum-ok').appendTo(root).size('35%', '100%').color('#cccccc').text('OK').fontBold().fontSize(11)
                .textAlignCenter().cursorPointer().hoverColor('gray', '#cccccc').click(function() {
                var v = parseFloat(value.text()) || undefined;
                if (v) {
                    fn(v);
                }

                absRemove('abs-papernum');
            });

            value.$text.focus();
        }

        function paperText (seq, target, fn) {
            if (!syncMenu('third', 'abs-papertext'))
                return false;

            var root = div().class('third').id('abs-papertext').appendTo(target).position('absolute').size(150, 'auto').minHeight(25).top(seq * 25).left(100)
                .color('white').borderRadius(2).border('2px solid gray').click(function(dv, e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

            var value = div().appendTo(root).size('80%', '100%').color('white').text('').editable().cursorText();
            div().id('papertext-ok').appendTo(root).size('20%', '100%').minHeight(25).color('#cccccc').text('OK').fontBold().fontSize(11)
                .textAlignCenter().cursorPointer().hoverColor('gray', '#cccccc').click(function() {
                fn(value.text());
                absRemove('abs-papertext');
            });

            value.$text.focus();
        }

        function paperTextAuto (seq, target, fn) {
            if (!syncMenu('third', 'abs-papertext'))
                return false;

            var root = div().class('third').id('abs-papertext').appendTo(target).position('absolute').size(150, 'auto').minHeight(25).top(seq * 25).left(100)
                .color('white').borderRadius(2).border('2px solid gray').keypress(function(dv, e) {
                    if (e.which == 13) {
                        $('#papertext-ok').trigger('click');
                    }
                }).click(function(dv, e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

            var value = div().appendTo(root).size('80%', '100%').color('white').text('').editable().cursorText();
            div().id('papertext-ok').appendTo(root).size('20%', '100%').minHeight(25).color('#cccccc').text('OK').fontBold().fontSize(11)
                .textAlignCenter().cursorPointer().hoverColor('gray', '#cccccc').click(function() {
                fn(value.text());
                absRemove('abs-papertext');
            });

            value.$text.focus();
        }

        function listView(seq, target, list, getView, fn) {
            if (!syncMenu('third', 'abs-list'))
                return false;

            var root = div().class('third').id('abs-list').appendTo(target).position('absolute').size(100, 'auto').top(seq * 25).left(100)
                .color('white').borderRadius(2).border('2px solid gray').click(function (dv, e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

            listAdapter(target, root, list, getView, fn);
        }

        function listAdapter(target, dv, list, getView, fn) {
            for (i = 0; i < list.length; i++) {
                getView(target, dv, list, fn);
            }
        }

        function pallet (seq, target, fn) {
            if (!syncMenu('third', 'pallet'))
                return false;

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

            var root = div().class('third').id('pallet').appendTo(target).position('absolute').size(325, 'auto').color('white')
                .top(seq * 25).left(100).cursorPointer().borderRadius(2).border('2px solid gray');

            for (i = 0; i < pallet_color.length; i++) {
                for (j = 0; j < pallet_color[i].length; j++) {
                    var cell = div().appendTo(root).size(20, 20).color('white').hoverColor('gray', 'white').click(function (dv, e) {
                        e.stopPropagation();
                        e.preventDefault();

                        fn(dv.children()[0].color());
                    });
                    div().appendTo(cell).displayBlock().size(16, 16).margin('auto').marginTop(2).color(pallet_color[i][j]);
                }
            }
        }

        // id를 설정하기!
        function eventEdit(id, fn) {
            syncMenu(undefined, 'abs-event-'+id);

            var root = div().id('abs-event-'+id).append().position('absolute').size(325, 'auto').minHeight(300)
                .top(98).left(1280).borderRadius(2).border('2px solid gray').draggable().click(function(dv, e) { //.top((seq-1) * 25).left(100)
                    e.stopPropagation();
                    e.preventDefault();
                });

            div().appendTo(root).displayBlock().text('update').size('100%', 30).color('green');
            var editor = div().appendTo(root).displayBlock().size('100%', 'auto').minHeight(270).aceEditor();
        }

        // context menubar 생성
        var contextMenuBar = div().append().id('abs-context-menu').size(100, 'auto').zIndex(1000).position('absolute')
            .color('#cccccc').border('1px solid gray').borderRadius(2).displayNone(); // overflowHidden()
        var decoMenu = function (dv) {
            dv.size('100%', 25).padding(3).cursorPointer().hoverColor('gray', '#cccccc').selectable(false);
        };

        div().appendTo(contextMenuBar).deco(decoMenu).text('font').click(function (dv) {
            if (!syncMenu('second', 'abs-font-menu'))
                return false;

            var fontMenuBar = div().appendTo(dv).class('second').id('abs-font-menu').size(100, 'auto').zIndex(1000).position('absolute')
                .top(0).left(100).color('#cccccc').border('1px solid gray').borderRadius(2);

            div().appendTo(fontMenuBar).deco(decoMenu).text('text').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                // paperText(0, dv, function(txt) {
                paperTextAuto(0, dv, function(txt) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.text(txt);
                    callback();
                });
            });

            div().appendTo(fontMenuBar).deco(decoMenu).text('size').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperNum(1, dv, function(v) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.fontSize(v);
                    callback();
                });
            });

            /* need refactoring */
            div().appendTo(fontMenuBar).deco(decoMenu).text('weight').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                var font_weight = ['normal', 'bold'];

                listView(2, dv, font_weight, function(target, dv, list, fn) {
                    div().appendTo(dv).size('100%', 50).text('font').fontSize(35).textAlignCenter().color('white').fontWeight(list[i]).hoverColor('#cccccc', 'white').click(function (me) {
                        fn(me.fontWeight());
                    });
                }, function(v) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.fontWeight(v);
                    callback();
                });
            });

            div().appendTo(fontMenuBar).deco(decoMenu).text('family').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                var font_family = ['normal', 'serif', 'sans-serif', 'Arial', 'Charcoal', 'Impact'];

                listView(3, dv, font_family, function(target, dv, list, fn) {
                    div().appendTo(dv).size('100%', 50).text('font').fontSize(35).textAlignCenter().color('white').fontFamily(list[i]).hoverColor('#cccccc', 'white').click(function (me) {
                        fn(me.fontFamily());
                    });
                }, function(v) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.fontFamily(v);
                    callback();
                });
            });

            div().appendTo(fontMenuBar).deco(decoMenu).text('color').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                pallet(4, dv, function(c) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.fontColor(c);
                    callback();
                });
            });
        });

        div().appendTo(contextMenuBar).deco(decoMenu).text('background').click(function(dv) {
            if (!syncMenu('second', 'abs-bg-menu'))
                return false;

            var bgMenuBar = div().appendTo(dv).class('second').id('abs-bg-menu').size(100, 'auto').zIndex(1000).position('absolute')
                .top(25).left(100).color('#cccccc').border('1px solid gray').borderRadius(2);

            div().appendTo(bgMenuBar).deco(decoMenu).text('shadow').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperNum(0, dv, function(v) {
                    pallet(0, dv, function(c) {
                        var curDiv = $('#' + idContainer.id).data('div');
                        curDiv.boxShadow(v+'px '+ v +'px '+ v + 'px '+ c);
                        callback();
                    });
                });
            });

            div().appendTo(bgMenuBar).deco(decoMenu).text('color').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                pallet(1, dv, function(c) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.color(c);
                    callback();
                });
            });
        });

        div().appendTo(contextMenuBar).deco(decoMenu).text('edge').click(function(dv) {
            if (!syncMenu('second', 'abs-edge-menu'))
                return false;

            var edgeMenuBar = div().appendTo(dv).class('second').id('abs-edge-menu').size(100, 'auto').zIndex(1000).position('absolute')
                .top(50).left(100).color('#cccccc').border('1px solid gray').borderRadius(2);

            div().appendTo(edgeMenuBar).deco(decoMenu).text('width').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperNum(0, dv, function(v) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.borderWidth(v);
                    callback();
                });
            });

            div().appendTo(edgeMenuBar).deco(decoMenu).text('style').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                var edge_style = ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

                listView(1, dv, edge_style, function(target, dv, list, fn) {
                    var cell = div().appendTo(dv).size('100%', 50).color('white').hoverColor('#cccccc', 'white').click(function(target) {
                        fn(target.children()[0].borderStyle());
                    });
                    div().appendTo(cell).displayBlock().size(80, 40).margin('auto').marginTop(5).marginBottom(5).borderWidth(3).borderStyle(list[i]);
                }, function(s) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.borderStyle(s);
                    callback();
                });
            });

            div().appendTo(edgeMenuBar).deco(decoMenu).text('radius').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperNum(2, dv, function(v) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.borderRadius(v);
                    callback();
                });
            });

            div().appendTo(edgeMenuBar).deco(decoMenu).text('color').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                pallet(3, dv, function(c) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.borderColor(c);
                    callback();
                });
            });
        });

        div().appendTo(contextMenuBar).deco(decoMenu).text('media').click(function(dv) {
            if (!syncMenu('second', 'abs-media-menu'))
                return false;

            var mediaMenuBar = div().appendTo(dv).class('second').id('abs-media-menu').size(100, 'auto').zIndex(1000).position('absolute')
                .top(75).left(100).color('#cccccc').border('1px solid gray').borderRadius(2);

            div().appendTo(mediaMenuBar).deco(decoMenu).text('image').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperTextAuto(0, dv, function(txt) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.backgroundSize('100%', '100%');
                    curDiv.backgroundImage(txt);
                    callback();
                });
            });

            div().appendTo(mediaMenuBar).deco(decoMenu).text('audio').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperTextAuto(1, dv, function(txt) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.audio(idContainer.id, txt);
                    // curDiv.audio(idContainer.id, 'http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.oga');
                    callback();
                });
            });

            div().appendTo(mediaMenuBar).deco(decoMenu).text('video').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                paperTextAuto(2, dv, function(txt) {
                    var curDiv = $('#' + idContainer.id).data('div');
                    curDiv.video(idContainer.id, txt);
                    // curDiv.video(idContainer.id, 'http://media.w3.org/2010/05/bunny/movie.ogv');
                    callback();
                });
            });
        });

        div().appendTo(contextMenuBar).deco(decoMenu).text('event').click(function(dv) {
            if (!syncMenu('second', 'abs-event-menu'))
                return false;

            eventEdit(idContainer.id, function(code) {
                return 0;
            });
        });

        // 다른 곳 클릭시 context-menu hide
        $(document).bind("mousedown", function (e) {
            if (!$(e.target).parents("#abs-context-menu").length > 0) {
                $("#abs-context-menu").hide(200);
            }
        });
    };

    return module;
});