/**
 * Created by JiSoo on 2016-11-09.
 */
/**
 * Created by JiSoo on 2016-11-05.
 */
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
                    var i;
                    var manager = that.animationManager();
                    var params = ['duration', 'easing', 'complete'];

                    function editParams(dv, param) {
                        var target = dv;
                        var root = div().class('abs-option').appendTo(target).size('100%', 30).marginTop(15);
                        div().appendTo(root).size('30%', '100%').text(param + ': ').fontBold();
                        var edit = div().id('abs-ani-'+target.id().split('-')[2]+'-'+param).appendTo(root).size('40%', '75%').color('white').text('').editable().borderRadius(2)
                            .border('2px solid black').cursorText().textAlignLeft().keypress(function (dv, e) {
                                if (e.which == 13) {
                                    input.trigger('click');
                                    e.preventDefault();
                                    return false;
                                }
                            }).click(function (dv, e) {
                                e.stopPropagation();
                                e.preventDefault();
                            });

                        var input = div().appendTo(root).size('20%', '75%').color('#cccccc').text('OK').fontBold()
                            .textAlignCenter().cursorPointer().hoverColor('gray', '#cccccc').border('2px solid black').click(function (dv, e) {
                                e.stopPropagation();
                                e.preventDefault();

                                if (param === 'complete') {
                                    if (!curId())
                                        return;

                                    var aniData = {
                                        id: curId(), // Current ID를 반환, 없으면 undefined
                                        animation: {
                                            effect: target.id().split('-')[2],
                                            params: getArgs()
                                        }
                                    };
                                    animationQueue.push(aniData);
                                    // refreshPreviewText();
                                } else {
                                    params.forEach(function (data) {
                                        if (data === param)
                                            $('#abs-ani-'+target.id().split('-')[2]+'-'+params[params.indexOf(data) + 1]).data('div').$text.focus();
                                    });
                                }
                            });

                        function getArgs() {
                            var args = {};
                            params.forEach(function (data) {
                                args[data] = parseFloat($('#abs-ani-'+target.id().split('-')[2]+'-'+data).data('div').text()) || undefined;
                            });

                            return args;
                        }
                    }

                    // function refreshPreviewText() {
                    //     previewText.text((manager.getIndex('preview')+1)+'/'+animationQueue.length);
                    // }
                    //
                    // function refreshPreviewBar() {
                    //
                    // }

                    /*var decoContent = function (dv) {
                     dv.appendTo(body).size('100%', 'auto').textAlignCenter().fontBold().border('1px solid gray').cursorPointer();
                     };*/

                    var decoContent = function (dv) {
                        dv.appendTo(body).size('100%', 'auto').minHeight(50).color('white').margin(1).cursorPointer().click(function(parent, e) {
                            e.stopPropagation();
                            e.preventDefault();

                            // temp.top(parent.height()).left(0).displayNone().appendTo(parent).slideDown(1000);
                        });
                    };

                    var decoPreviewBtn = function(dv) {
                        dv.appendTo(preview).size('25%', '50%').color('#cccccc').border('1px solid #eeeeee').textAlignCenter().hoverColor('gray', '#cccccc');
                    };

                    var decoAddAnimation = function(dv) {
                        dv.appendTo(body).text('+ 애니메이션할 객체 선택').fontBold().fontColor('blue').size('100%', 50)
                            .paddingTop(15).paddingLeft(10).color('white').margin(1).cursorPointer().click(function(dv, e) {
                            e.stopPropagation();
                            e.preventDefault();

                            //TODO AQ에 추가하는 작업 해야한다.
                            if (curId()) {
                                dv.detach();
                                div().deco(decoContent);
                                dv.appendTo(body);
                            }
                        });
                    };

                    var root = div().class('abs-option').appendTo(target).size('100%', '100%').color('#eeeeee').border('1px solid gray').selectable(false).overflowScroll();
                    div().appendTo(root).size('100%', '5%').color('black').text('AMBASA - Animation').fontColor('white').fontSize(20).border('1px solid #eeeeee').textAlignCenter().cursorDefault();

                    var body = div().appendTo(root).size('100%', '95%');

                    var addAnimation = div().deco(decoAddAnimation);

                    var temp = div().size('100%', 100).color('green').position('relative').click(function(dv, e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });

                    var preview = div().appendTo(body).size('100%', 60).border('1px solid black').cursorPointer().click(function(dv, e) {
                             e.stopPropagation();
                             e.preventDefault();

                             refreshPreviewText();
                             refreshPreviewBar();
                         });

                     var previewMenu = div().appendTo(preview).size('100%', '50%').color('#cccccc').border('1px solid #eeeeee').marginTop(1).cursorDefault();

                     var previewText = div().appendTo(previewMenu).size('20%', '100%').color('#cccccc').fontBold().textAlignCenter().border('1px solid #eeeeee');
                     refreshPreviewText();

                     div().appendTo(previewMenu).size('80%', '100%').text('Delete').fontSize(17).fontBold().textAlignCenter()
                         .color('#cccccc').border('1px solid #eeeeee').cursorPointer().hoverColor('gray', '#cccccc').click(function() {
                             if(!manager.isEmpty()) {
                                 if (manager.getIndex('preview') === -1) {
                                     return;
                                 }

                                 animationQueue.splice(manager.getIndex('preview'), 1);
                                 if (manager.getIndex('preview') === animationQueue.length) {
                                     manager.setIndex(animationQueue.length - 1, 'preview');
                                 }
                             }
                         });

                     div().deco(decoPreviewBtn).text('◁◁').fontSize(16).hoverText('◀◀', '◁◁').click(function() {
                             manager.goFirst('preview');
                         });
                     div().deco(decoPreviewBtn).text('◁').fontSize(16).hoverText('◀', '◁').click(function() {
                             manager.back('preview');
                         });
                     // div().deco(decoPreviewBtn).text('□').fontSize(18).hoverText('■', '□').click(function() {
                     //         manager.stop('preview');
                     //     });
                     div().deco(decoPreviewBtn).text('▷').fontSize(16).hoverText('▶', '▷').click(function() {
                             manager.next('preview');
                         });
                     div().deco(decoPreviewBtn).text('▷▷').fontSize(16).hoverText('▶▶', '▷▷').click(function() {
                             manager.goLast('preview');
                         });

                     var fadeIn = div().deco(decoContent).text('Fade In').click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     ani_fadein.trigger('click');
                     $('#abs-ani-fadeIn-duration').data('div').$text.focus();
                     });
                     var fadeOut = div().deco(decoContent).text('Fade Out').click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     ani_fadeout.trigger('click');
                     $('#abs-ani-fadeOut-duration').data('div').$text.focus();
                     });
                     var slideDown = div().deco(decoContent).text('slide Down').click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     ani_slidedown.trigger('click');
                     $('#abs-ani-slideDown-duration').data('div').$text.focus();
                     });
                     var slideUp = div().deco(decoContent).text('Slide Up').click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     ani_slideup.trigger('click');
                     $('#abs-ani-slideUp-duration').data('div').$text.focus();
                     });


                     var ani_fadein = div().id('abs-ani-fadeIn').appendTo(fadeIn).displayNone().size('100%', 150).click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     dv.slideToggle(300);
                     });

                     for (i = 0; i < params.length; i++)
                     editParams(ani_fadein, params[i]);

                     var ani_fadeout = div().id('abs-ani-fadeOut').appendTo(fadeOut).displayNone().size('100%', 150).click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     dv.slideToggle(300);
                     });

                     for (i = 0; i < params.length; i++)
                     editParams(ani_fadeout, params[i]);

                     var ani_slidedown = div().id('abs-ani-slideDown').appendTo(slideDown).displayNone().size('100%', 150).click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     dv.slideToggle(300);
                     });

                     for (i = 0; i < params.length; i++)
                     editParams(ani_slidedown, params[i]);

                     var ani_slideup = div().id('abs-ani-slideUp').appendTo(slideUp).displayNone().size('100%', 150).click(function (dv, e) {
                     e.stopPropagation();
                     e.preventDefault();

                     dv.slideToggle(300);
                     });

                     for (i = 0; i < params.length; i++)
                     editParams(ani_slideup, params[i]);
                },
                animator: function (index, mode) {
                    function backup(obj, e) {
                        switch(e) {
                            case 'fadeIn':
                            // TODO 별도 처리 해주기!
                            case 'fadeOut':
                                obj.fadeToggle(1);
                                break;
                            case 'slideDown':
                            case 'slideUp':
                                obj.slideToggle(1);
                                break;
                        }
                    }

                    (function() {
                        var temp;
                        var ani_package = animationQueue[index];

                        if (mode === 'preview') {
                            temp = $('#' + ani_package.id).data('div');
                            eval("$('#" + ani_package.id + "').data('div')." + ani_package.animation.effect + "(" + ani_package.animation.params.duration + ");");
                            setTimeout(backup(temp, ani_package.animation.effect), ani_package.animation.params.duration + 1000);
                        }
                        else {
                            eval("$('#" + ani_package.id + '-clone' + "').data('div')." + ani_package.animation.effect + "(" + ani_package.animation.params.duration + ");");
                        }
                    })();
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