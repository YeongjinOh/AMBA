/**
 * Created by JiSoo on 2016-11-05.
 */

// 글자 겹치는 문제 zIndex이용해도 해결 못함
// id : 의미 - slide - sequence

define ([], function() {
    var ABSAnimation = {
        getInstance: function() {
            var animationQueue = [], showtimeQueue, previewQueue;
            var index = -1;
            var target, curId, curSlide;
            var module = {
                init: function (dv, getId, getSlide) {
                    target = dv;
                    curId = getId;
                    curSlide = getSlide;
                },
                import: function (aq) {
                    if (aq === undefined || typeof aq !== 'object') {
                        animationQueue = [];
                        return;
                    }
                    animationQueue = aq;
                },
                export: function () {
                    return animationQueue;
                },
                append: function () {
                    var that = this;
                    var i, seq = 0;
                    var manager = that.animationManager();
                    var effect = ['Show', 'Hide', 'Fade In', 'Fade Out', 'Slide Down', 'Slide Up'];
                    var timing = ['클릭시', '이전 애니메이션 시작 시', '이전 애니메이션 완료 후'];

                    var decoSelectMenu = function (dv) {
                        dv.size('100%', 'auto').minHeight(20).color('#eeeeee').fontBold().marginTop(5).borderRadius(3).boxShadow('1px 1px 1px 1px black');
                    };

                    var decoSelector = function (dv) {
                        dv.displayBlock().size('80%', 23).color('#eeeeee').fontBold().marginLeft(16).marginTop(20).borderRadius(3).boxShadow('1px 1px 1px 1px black').paddingTop(2);
                    };

                    var decoContent = function (dv) {
                        dv.size('100%', 160).color('white').cursorPointer();
                    };

                    var decoMenu = function (dv) {
                        dv.appendTo(body).size('100%', 'auto').minHeight(50).color('white').fontBold().fontColor('black')
                            .paddingTop(3).paddingLeft(10).margin(1).cursorPointer();
                    };

                    var decoAddAnimation = function (dv) {
                        dv.appendTo(body).text('+ 애니메이션할 객체 선택').fontBold().fontColor('blue').size('100%', 50)
                            .paddingTop(15).paddingLeft(10).color('white').margin(1).cursorPointer();
                    };

                    var focus = function(ify) {
                        if (animationQueue.length != 0) {
                            for (i = 0; i < animationQueue.length; i++) {
                                if (ify === animationQueue[i].ify) {
                                    $('#'+animationQueue[i].id).data('ambasa').focus();
                                }
                            }
                        }
                    };

                    var packaging = function (ify, eff, tim, dur) {
                        var aniData = {};
                        aniData.ify = ify;
                        aniData.id = curId();
                        switch (eff) {
                            case 'Show':
                                aniData.effect = 'show';
                                break;
                            case 'Hide':
                                aniData.effect = 'hide';
                                break;
                            case 'Fade In':
                                aniData.effect = 'fadeIn';
                                break;
                            case 'Fade Out':
                                aniData.effect = 'fadeOut';
                                break;
                            case 'Slide Down':
                                aniData.effect = 'slideDown';
                                break;
                            case 'Slide Up':
                                aniData.effect = 'slideUp';
                                break;
                        }
                        aniData.timing = tim.slice(1, tim.length - 1);
                        aniData.duration = parseInt(dur);

                        for (i = 0; i < animationQueue.length; i++) {
                            if (animationQueue[i].ify === ify) {
                                animationQueue[i] = aniData;
                                console.log(animationQueue);
                                return;
                            }
                        }

                        animationQueue.push(aniData);
                        console.log(animationQueue);
                    };

                    var root = div().class('abs-option').appendTo(target).size('100%', '100%').color('#eeeeee').border('1px solid gray').selectable(false).overflowScroll();
                    div().appendTo(root).size('100%', '5%').color('black').text('AMBASA - Animation').fontColor('white').fontSize(20).border('1px solid #eeeeee').textAlignCenter().cursorDefault();

                    var body = div().appendTo(root).size('100%', '95%');

                    var preview = div().appendTo(body).size('100%', 50).color('white');
                    div().appendTo(preview).size('30%', 23).color('#eeeeee').marginLeft(30).marginTop(12).text('▶').fontBold().textAlignCenter()
                        .paddingTop(2).borderRadius(3).boxShadow('1px 1px 1px 1px black').cursorPointer().hoverTextColor('blue', 'black').click(function () {
                            manager.preview(true);
                        });

                    div().appendTo(preview).size('30%', 23).color('#eeeeee').marginLeft(10).marginTop(12).text('■').fontBold().textAlignCenter()
                        .paddingTop(2).borderRadius(3).boxShadow('1px 1px 1px 1px black').cursorPointer().hoverTextColor('blue', 'black').click(function () {
                            manager.preview(false);
                        });

                    var addAnimation = div().deco(decoAddAnimation).click(function (dv, e) {
                            e.stopPropagation();
                            e.preventDefault();

                            if (curId()) {
                                var ify = seq++;
                                console.log(curSlide().getIdx());

                                dv.detach();
                                var menu = div().id('abs-ani-menu-'+ify).deco(decoMenu).fontBold().click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    focus(ify);
                                    if (AB.find('abs-ani-con-' + ify)) {
                                        $('#abs-ani-con-' + ify).remove();
                                    }
                                    else {


                                        var content = div().id('abs-ani-con-' + ify).deco(decoContent).appendTo(menu).click(function (dv, e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        });

                                        var conEffect = div().id('abs-ani-sel-ani' + ify).deco(decoSelector).appendTo(content).text($('#abs-ani-menu-effect-' + ify).data('div').text())
                                            .textAlignCenter().hoverTextColor('blue', 'black').click(function (dv, e) {
                                                e.stopPropagation();
                                                e.preventDefault();

                                                focus(ify);

                                                if (AB.find('abs-ani-sel-' + ify)) {
                                                    $('#abs-ani-sel-' + ify).remove();
                                                }
                                                else {
                                                    var selEffect = div().id('abs-ani-sel-' + ify).deco(decoSelectMenu).appendTo(conEffect).click(function (dv, e) {
                                                        e.stopPropagation();
                                                        e.preventDefault();

                                                        focus(ify);
                                                    });

                                                    for (i = 0; i < effect.length; i++) {
                                                        div().appendTo(selEffect).size('100%', 20).color('#eeeeee').text(effect[i]).fontBold()
                                                            .hoverTextColor('blue', 'black').click(function (dv) {
                                                            conEffect.text(dv.text());
                                                            $('#abs-ani-menu-effect-' + menu.id().split('-')[3]).data('div').text(dv.text());
                                                            packaging(ify, $('#abs-ani-menu-effect-' + ify).text(), $('#abs-ani-menu-timing-' + ify).text(), durationValue.text());
                                                            selEffect.detach();
                                                        });
                                                    }
                                                }
                                            });

                                        var conTiming = div().deco(decoSelector).appendTo(content).text($('#abs-ani-menu-timing-' + ify).data('div').text().slice(1, length - 1))
                                            .textAlignCenter().hoverTextColor('blue', 'black').click(function (dv, e) {
                                                e.stopPropagation();
                                                e.preventDefault();

                                                focus(ify);

                                                if (AB.find('abs-ani-sel-' + ify)) {
                                                    $('#abs-ani-sel-' + ify).remove();
                                                }
                                                else {
                                                    var selTiming = div().id('abs-ani-sel-' + ify).deco(decoSelectMenu).appendTo(conTiming).click(function (dv, e) {
                                                        e.stopPropagation();
                                                        e.preventDefault();

                                                        focus(ify);
                                                    });

                                                    for (i = 0; i < timing.length; i++) {
                                                        div().appendTo(selTiming).size('100%', 20).color('#eeeeee').text(timing[i]).fontBold()
                                                            .hoverTextColor('blue', 'black').click(function (dv) {
                                                            conTiming.text(dv.text());
                                                            $('#abs-ani-menu-timing-' + menu.id().split('-')[3]).data('div').text('(' + dv.text() + ')');
                                                            packaging(ify, $('#abs-ani-menu-effect-' + ify).text(), $('#abs-ani-menu-timing-' + ify).text(), durationValue.text());
                                                            selTiming.detach();
                                                        });
                                                    }
                                                }
                                            });

                                        var conDuration = div().deco(decoSelector).appendTo(content).zIndex(1).keypress(function (dv, e) {
                                            if (e.which == 13) {
                                                durationOK.trigger('click');
                                                e.preventDefault();
                                                return false;
                                            }
                                        }).click(function (dv, e) {
                                            e.stopPropagation();
                                            e.preventDefault();

                                            focus(ify);
                                            durationValue.$text.focus();
                                        });

                                        var durationValue = div().appendTo(conDuration).size('80%', '100%').text('1000').editable().textAlignCenter().cursorText().fontBold().hoverTextColor('blue', 'black');
                                        var durationOK = div().appendTo(conDuration).size('20%', '100%').text('OK').fontBold().textAlignCenter().cursorPointer()
                                            .hoverTextColor('blue', 'black').click(function () {
                                                packaging(ify, $('#abs-ani-menu-effect-' + ify).text(), $('#abs-ani-menu-timing-' + ify).text(), durationValue.text());
                                            });
                                    }
                                });

                                div().id('abs-ani-menu-effect-' + ify).appendTo(menu).size('90%', 'auto').text(effect[0]).fontBold();
                                div().appendTo(menu).size('auto', 'auto').text('×').fontBold().hoverTextColor('blue', 'black').click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    menu.remove();
                                    for (i = 0; i < animationQueue.length; i++) {
                                        if (animationQueue[i].ify === ify) {
                                            animationQueue.splice(i, 1);
                                        }
                                    }
                                });
                                div().id('abs-ani-menu-timing-' + ify).appendTo(menu).displayBlock().size('100%', 'auto').text('(' + timing[0] + ')').fontSize(12).fontBold();

                                packaging(ify, $('#abs-ani-menu-effect-' + ify).text(), $('#abs-ani-menu-timing-' + ify).text(), 1000);

                                dv.appendTo(body);

                            }
                    });
                },
                initShowtime: function() {
                    var i;
                    showtimeQueue = animationQueue.slice(0);
                    for(i=0; i<showtimeQueue.length; i++) {
                        if(showtimeQueue[i].effect === 'show' || showtimeQueue[i].effect === 'fadeIn' || showtimeQueue[i].effect === 'slideDown') {
                            $('#' + showtimeQueue[i].id+'-clone').data('div').displayNone();
                        }
                    }
                },
                animator: {
                    preview: function() {
                        var target;
                        var waiting = 0;

                        function backup(obj, e) {
                            switch(e) {
                                case 'hide':
                                    obj.show(1);
                                    break;
                                case 'fadeOut':
                                    obj.fadeToggle(1);
                                    break;
                                case 'slideUp':
                                    obj.slideToggle(1);
                                    break;
                            }
                        }

                        if (!previewQueue) {
                            previewQueue = animationQueue.slice(0);
                        }

                        (function play() {
                            if (previewQueue.length === 0) {
                                previewQueue = undefined;
                                return;
                            }

                            var temp = previewQueue.splice(0, 1)[0];
                            var next_temp = previewQueue.slice(0, 1)[0];

                            var curAni = $('#abs-ani-menu-' + temp.ify).data('div');
                            curAni.border('3px dotted blue');

                            target = $('#' + temp.id).data('div');

                            if (temp.effect === 'show') {
                                target.displayNone();
                            }
                            else if (temp.effect === 'fadeIn') {
                                target.displayNone();
                            }
                            else if (temp.effect === 'slideDown') {
                                target.displayNone();
                            }

                            eval("$('#" + temp.id + "').data('div')." + temp.effect + "(" + temp.duration + ");");

                            backup(target, temp.effect);

                            setTimeout(function () {
                                curAni.border('');
                            }, temp.duration);

                            if (next_temp) {
                                if (next_temp.timing === '클릭시') {
                                    return;
                                }
                                if (next_temp.timing === '이전 애니메이션 시작 시') {
                                    waiting = 0;
                                }
                                else if (next_temp.timing === '이전 애니메이션 완료 후') {
                                    waiting = next_temp.duration;
                                }
                            }

                            setTimeout(play, waiting);
                        })();
                    },
                    showtime: {
                        next: function() {
                            var waiting = 0;

                            (function play() {
                                if (index >= animationQueue.length-1) {
                                    return;
                                }

                                var temp = animationQueue[++index];
                                var next_temp = animationQueue[index+1];

                                eval("$('#" + temp.id + '-clone' + "').data('div')." + temp.effect + "(" + temp.duration + ");");

                                if (next_temp) {
                                    if (next_temp.timing === '클릭시') {
                                        return;
                                    }
                                    else if (next_temp.timing === '이전 애니메이션 시작 시') {
                                        waiting = 0;
                                    }
                                    else if (next_temp.timing === '이전 애니메이션 완료 후') {
                                        waiting = next_temp.duration;
                                    }
                                }

                                setTimeout(play, waiting);
                            })();
                        },
                        back: function() {
                            var target;
                            var waiting = 0;

                            function backup(obj, e) {
                                switch(e) {
                                    case 'show':
                                        obj.hide(1);
                                        break;
                                    case 'hide':
                                        obj.show(1);
                                        break;
                                    case 'fadeOut':
                                    case 'fadeIn':
                                        obj.fadeToggle(1);
                                        break;
                                    case 'slideUp':
                                    case 'slideDown':
                                        obj.slideToggle(1);
                                        break;
                                }
                            }

                            (function play() {
                                if (index <= -1) {
                                    return;
                                }

                                var temp = animationQueue[index--];

                                target = $('#' + temp.id + '-clone').data('div');
                                backup(target, temp.effect);

                                if (temp) {
                                    if (temp.timing === '클릭시') {
                                        return;
                                    }
                                    else {
                                        waiting = 0;
                                    }
                                }

                                setTimeout(play, waiting);
                            })();
                        }
                    }
                },
                animationManager: function () {
                    var that = this;
                    var manager = {
                        preview: function (cmd) {
                            if (cmd) {
                                that.animator.preview();
                            }
                            else {
                                previewQueue = [];
                            }
                        },
                        next: function() {
                            if (this.hasNext())
                                that.animator.showtime.next();
                        },
                        hasNext: function() {
                            if (index >= animationQueue.length-1) {
                                return false
                            }
                            return true;
                        },
                        back: function() {
                            if (this.hasBack()) {
                                that.animator.showtime.back();
                            }
                        },
                        hasBack: function() {
                            if (index <= -1) {
                                return false;
                            }
                            return true;
                        },
                        isEmpty: function() {
                            if (animationQueue.length === 0) {
                                return true;
                            }
                            return false;
                        }
                    };

                    return manager;
                }
            };

            return module;
        }
    };

    return ABSAnimation;
});