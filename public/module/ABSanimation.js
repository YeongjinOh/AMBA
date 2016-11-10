/**
 * Created by JiSoo on 2016-11-05.
 */

// 글자 겹치는 문제
// Animation 재생, 중지 문제... (타이밍의 문제가 생긴다!!)
// 한꺼번에 진행 할 경우, 다시 되살리는 문제 -> 반복문 돌려서 다시 원위치로!?
// 쇼타임의 경우, fadeIn 애들은 그냥 초기에 다 displayNone? 그럼 시작될 때를 내가 알아야 한다.
// Timing의 문제... 어떻게 시작시켜야할까?
// id : 의미 - slide - sequence
// Obj focus 시키기! -> 영진이 형

define ([], function() {
    var ABSAnimation = {
        getInstance: function() {
            var animationQueue = [];
            var target;
            var curId;
            var module = {
                init: function (dv, getId) {
                    target = dv;
                    curId = getId;
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
                    var effect = ['Fade In', 'Fade Out', 'Slide Down', 'Slide Up'];
                    var timing = ['클릭시', '이전 애니메이션 시작 시', '이전 애니메이션 완료 후'];

                    var decoSelectMenu = function(dv) {
                        dv.displayNone().size('100%', 'auto').minHeight(20).color('#eeeeee').fontBold().marginTop(5).borderRadius(3).boxShadow('1px 1px 1px 1px black');
                    };

                    var decoSelector = function(dv) {
                        dv.displayBlock().size('70%', 23).color('#eeeeee').fontBold().marginLeft(27).marginTop(20).borderRadius(3).boxShadow('1px 1px 1px 1px black');
                    };

                    var decoContent = function(dv) {
                        dv.size('100%', 130).displayNone().color('white').cursorPointer();
                    };

                    var decoMenu = function (dv) {
                        dv.appendTo(body).size('100%', 'auto').minHeight(50).color('white').fontBold().fontColor('black')
                            .paddingTop(3).paddingLeft(10).margin(1).cursorPointer();
                    };

                    var decoAddAnimation = function(dv) {
                        dv.appendTo(body).text('+ 애니메이션할 객체 선택').fontBold().fontColor('blue').size('100%', 50)
                            .paddingTop(15).paddingLeft(10).color('white').margin(1).cursorPointer();
                    };

                    var packaging = function(ify, eff, tim, dur) {
                        var aniData = {};
                        aniData.ify = ify;
                        aniData.id = curId();
                        switch(eff) {
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
                        aniData.timing = tim.slice(1, tim.length-1);
                        aniData.duration = parseInt(dur);

                        for(i=0; i<animationQueue.length; i++) {
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
                    var previewPlay = div().displayBlock().appendTo(preview).size('60%', 23).color('#eeeeee').margin('auto').marginTop(12).text('재생')
                        .fontBold().textAlignCenter().borderRadius(3).boxShadow('1px 1px 1px 1px black').cursorPointer().hoverTextColor('blue', 'black').click(function(dv, e) {
                            //TODO 여기서 Queue를 꺼내는 작업을 한다.
                            dv.detach();
                            previewStop.appendTo(preview);
                            for(i=0; i<animationQueue.length; i++) {
                                $('#abs-ani-menu-'+animationQueue[i].ify).data('div').border('2px solid blue');
                                manager.next('preview');
                                $('#abs-ani-menu-'+animationQueue[i].ify).data('div').border('');
                            }
                            manager.goFirst('preview');
                    });

                    var previewStop = div().displayBlock().size('60%', 23).color('#eeeeee').margin('auto').marginTop(12).text('정지')
                        .fontBold().textAlignCenter().borderRadius(3).boxShadow('1px 1px 1px 1px black').cursorPointer().hoverTextColor('blue', 'black').click(function(dv, e) {
                            //TODO Animation Stop
                            dv.detach();
                            previewPlay.appendTo(preview);

                            e.stopImmediatePropagation();
                            console.log('Pause');
                    });

                    var addAnimation = div().deco(decoAddAnimation).click(function(dv, e) {
                            e.stopPropagation();
                            e.preventDefault();
                            var ify = seq;

                            if (curId()) {
                                dv.detach();
                                var menu = div().id('abs-ani-menu-' + ify).deco(decoMenu).fontBold().click(function(dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    $('#'+curId()).data('ambasa').focus();
                                    $('#abs-ani-con-'+dv.id().split('-')[3]).trigger('click');
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
                                var content = div().id('abs-ani-con-' + ify).deco(decoContent).appendTo(menu).click(function(dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    dv.slideToggle(100);
                                });

                                var selAni = div().id('abs-ani-sel-ani' + ify).deco(decoSelector).appendTo(content).text(effect[0]).textAlignCenter().click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    selMenu1.trigger('click');
                                });

                                var selMenu1 = div().deco(decoSelectMenu).appendTo(selAni).click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    dv.slideToggle(100);
                                });


                                for (i = 0; i < effect.length; i++) {
                                    div().appendTo(selMenu1).size('100%', 20).color('#eeeeee').text(effect[i]).fontBold()
                                        .hoverTextColor('blue', 'black').click(function (dv) {
                                        selAni.text(dv.text());
                                        $('#abs-ani-menu-effect-' + menu.id().split('-')[3]).data('div').text(dv.text());
                                    });
                                }

                                var selTiming = div().deco(decoSelector).appendTo(content).text(timing[0]).textAlignCenter().click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    selMenu2.trigger('click');
                                });

                                var selMenu2 = div().deco(decoSelectMenu).appendTo(selTiming).click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    dv.slideToggle(100);
                                });

                                for (i = 0; i < timing.length; i++) {
                                    div().appendTo(selMenu2).size('100%', 20).color('#eeeeee').text(timing[i]).fontBold()
                                        .hoverTextColor('blue', 'black').click(function (dv) {
                                        selTiming.text(dv.text());
                                        $('#abs-ani-menu-timing-' + menu.id().split('-')[3]).data('div').text('(' + dv.text() + ')');
                                    });
                                }

                                var duration = div().deco(decoSelector).appendTo(content).zIndex(1).keypress(function (dv, e) {
                                    if (e.which == 13) {
                                        durationOK.trigger('click');
                                        e.preventDefault();
                                        return false;
                                    }
                                }).click(function (dv, e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                });

                                var durationValue = div().appendTo(duration).size('80%', '100%').text('3000').editable().cursorText();
                                var durationOK = div().appendTo(duration).size('20%', '100%').text('OK').fontBold().textAlignCenter().cursorPointer()
                                    .hoverTextColor('blue', 'black').click(function () {
                                        packaging(ify, $('#abs-ani-menu-effect-' + ify).text(), $('#abs-ani-menu-timing-' + ify).text(), durationValue.text());
                                        menu.trigger('click');
                                    });
                                packaging(ify, $('#abs-ani-menu-effect-' + ify).text(), $('#abs-ani-menu-timing-' + ify).text(), durationValue.text());
                                seq++;
                                dv.appendTo(body);
                            }
                        });
                },
                animator: function (index, mode) {
                    function backup(obj, e) {
                    }

                    var temp;
                    var ani_package = animationQueue[index];

                    if (mode === 'preview') {
                        temp = $('#' + ani_package.id).data('div');
                        if (ani_package.effect === 'fadeIn') {
                            temp.displayNone();
                        }
                        else if (ani_package.effect === 'slideDown') {
                            temp.displayNone();
                        }

                        eval("$('#" + ani_package.id + "').data('div')." + ani_package.effect + "(" + ani_package.duration + ");");
                        // setTimeout(function(){}, ani_package.duration);
                        // setTimeout(backup(temp, ani_package.effect), ani_package.duration + 1000);
                    }
                    else {
                        temp = $('#' + ani_package.id+'-clone').data('div');
                        if (ani_package.effect === 'fadeIn') {
                            temp.displayNone();
                        }
                        else if (ani_package.effect === 'slideDown') {
                            temp.displayNone();
                        }

                        eval("$('#" + ani_package.id + '-clone' + "').data('div')." + ani_package.effect + "(" + ani_package.duration + ");");
                    }
                },
                animationManager: function () {
                    var that = this;
                    var index = -1, pre_index = -1;
                    var manager = {
                        next: function(mode) {
                            if (this.hasNext(mode)) {
                                if (mode === 'preview') {
                                    that.animator(++pre_index, mode);
                                    return pre_index;
                                }
                                else {
                                    that.animator(++index);
                                    return index;
                                }
                            }
                        },
                        hasNext: function(mode) {
                            if (mode === 'preview') {
                                if (pre_index >= animationQueue.length - 1) {
                                    return false;
                                }
                            }
                            else {
                                if (index >= animationQueue.length - 1) {
                                    return false;
                                }
                            }

                            return true;
                        },
                        back: function(mode) {
                            if (this.hasBack(mode)) {
                                if (mode === 'preview') {
                                    that.animator(--pre_index, mode);
                                    return pre_index;
                                }
                                else {
                                    that.animator(--index);
                                    return index;
                                }
                            }
                        },
                        hasBack: function(mode) {
                            if (mode === 'preview') {
                                if (pre_index <= 0) {
                                    return false;
                                }
                            }
                            else {
                                if (index <= 0) {
                                    return false;
                                }
                            }

                            return true;
                        },
                        goFirst: function(mode) {
                            if (mode === 'preview') {
                                pre_index = -1;
                                return pre_index;
                            }
                            else {
                                index = -1;
                                return index;
                            }
                        },
                        goLast: function(mode) {
                            if (mode === 'preview') {
                                pre_index = animationQueue.length;
                                return pre_index;
                            }
                            else {
                                index = animationQueue.length;
                                return index;
                            }
                        },
                        isEmpty: function() {
                            if (animationQueue.length === 0)
                                return true;
                            return false;
                        },
                        getIndex: function(mode) {
                            if (mode === 'preview') {
                                return pre_index;
                            }
                            else {
                                return index;
                            }
                        },
                        setIndex: function(idx, mode) {
                            if (mode === 'preview') {
                                pre_index = idx;
                            }
                            else {
                                index = idx;
                            }
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