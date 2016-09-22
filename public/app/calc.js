/**
 * Created by JiSoo on 2016-09-21.
 */

var root = div().size('100%', '100%').color('red').append();

var calc = div().size('80%', '100%').color('#FFF0F5').appendTo(root);
var tracer = div().size('20%', '100%').color('#FFF0F5').appendTo(root);

var current = div().size('90%', '20%').margin('9% 5% 0% 5%').color('lightblue').appendTo(calc);

var subCurrent = div().displayBlock().size('100%', '30%').color('#F5FFFA').appendTo(current)
                    .alignRight().textSize('3vw');
var mainCurrent = div().displayBlock().size('100%', '70%').color('#F5FFFA').appendTo(current)
                    .alignRight().textSize('8vw');//.text('0')

var input = div().size('90%', '60%').margin('0% 5% 9% 5%').color('#D3D3D3').appendTo(calc);

var init_flag = true;
var op_flag = false;

// 자식이 click 됐을 때, 자기도 click event를 호출하게 할 수 없나?

/* row_1 */
var sp = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('%')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        sp.color('#A9A9A9');
    }, function() {
        sp.color('#D3D3D3');
    }).click(function() {
        // 제곱 이후 100으로 나누기
    });
var ce = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('CE')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        ce.color('#A9A9A9');
    }, function() {
        ce.color('#D3D3D3');
    }).click(function() {
        mainCurrent.text('');
        init_flag = true;
    });
var clear = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('C')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        clear.color('#A9A9A9');
    }, function() {
        clear.color('#D3D3D3');
    }).click(function() {
        mainCurrent.text('');
        subCurrent.text('');
        init_flag = true;
    });
var back = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('≪') // text 수정해야함
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        back.color('#A9A9A9');
    }, function() {
        back.color('#D3D3D3');
    }).click(function() {
        if(mainCurrent.text() === '')
            init_flag = true;
        mainCurrent.text(mainCurrent.text().slice(0, length-1));// mainCurrent 끝에서 하나 지우기
    });
var division = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('÷')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        division.color('#A9A9A9');
    }, function() {
        division.color('#D3D3D3');
    }).click(function() {
        if(init_flag === false && op_flag === false) {
            subCurrent.text(subCurrent.text() + ' ' + mainCurrent.text() + ' ' + division.text());
            op_flag = true;
        }
        // subCurrent에 / 추가 (replace로 ÷를 찾은 이후 /로 바꾸는 방법도 고려하기)
    });

/* row_2 */
var sqrt = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('√')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        sqrt.color('#A9A9A9');
    }, function() {
        sqrt.color('#D3D3D3');
    }).click(function() {
        // mainCurrent에 현재 숫자의 제곱근을 구함
        // subCurrent에 √제곱근 될 숫자 표기
    });
var seven = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('7')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        seven.color('#A9A9A9');
    }, function() {
        seven.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + seven.text());
        init_flag = false;
    });
var eight = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('8')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        eight.color('#A9A9A9');
    }, function() {
        eight.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + eight.text());
        init_flag = false;
    });
var nine = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('9')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        nine.color('#A9A9A9');
    }, function() {
        nine.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + nine.text());
        init_flag = false;
    });
var multiple = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('×')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        multiple.color('#A9A9A9');
    }, function() {
        multiple.color('#D3D3D3');
    }).click(function() {
        if(init_flag === false && op_flag === false) {
            subCurrent.text(subCurrent.text() + ' ' + mainCurrent.text() + ' ' + multiple.text());
            op_flag = true;
        }
        //(정규식, replace로 * 대체방법 고려)
    });

/* row_3 */
var square = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('x²')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        square.color('#A9A9A9');
    }, function() {
        square.color('#D3D3D3');
    }).click(function() {
        // mainCurrent 숫자를 제곱
        // subCurrent에 sqrt(제곱할 숫자)
    });
var four = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('4')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        four.color('#A9A9A9');
    }, function() {
        four.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + four.text());
        init_flag = false;
    });
var five = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('5')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        five.color('#A9A9A9');
    }, function() {
        five.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + five.text());
        init_flag = false;
    });
var six = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('6')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        six.color('#A9A9A9');
    }, function() {
        six.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + six.text());
        init_flag = false;
    });
var minus = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('-')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        minus.color('#A9A9A9');
    }, function() {
        minus.color('#D3D3D3');
    }).click(function() {
        if(init_flag === false && op_flag === false) {
            subCurrent.text(subCurrent.text() + ' ' + mainCurrent.text() + ' ' + minus.text());
            op_flag = true;
        }
    });

/* row_4 */
var cube = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('x³')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        cube.color('#A9A9A9');
    }, function() {
        cube.color('#D3D3D3');
    }).click(function() {
        // 세제곱하기
    });
var one = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('1')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        one.color('#A9A9A9');
    }, function() {
        one.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + one.text());
        init_flag = false;
    });
var two = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('2')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        two.color('#A9A9A9');
    }, function() {
        two.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + two.text());
        init_flag = false;
    });
var three = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('3')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        three.color('#A9A9A9');
    }, function() {
        three.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + three.text());
        init_flag = false;
    });
var plus = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('+')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        plus.color('#A9A9A9');
    }, function() {
        plus.color('#D3D3D3');
    }).click(function() {
        if(init_flag === false && op_flag === false) {
            subCurrent.text(subCurrent.text() + ' ' + mainCurrent.text() + ' ' + plus.text());
            op_flag = true;
        }
    });

/* row_5 */
var fraction = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('1/x')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        fraction.color('#A9A9A9');
    }, function() {
        fraction.color('#D3D3D3');
    }).click(function() {
        // if(mainCurrent.text() === '0')
        //     mainCurrent.text('0으로 나눌 수 없습니다.');
        // else
            mainCurrent.text(eval(1 / mainCurrent.text()));
    });
var pm = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('±')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        pm.color('#A9A9A9');
    }, function() {
        pm.color('#D3D3D3');
    }).click(function() {
        mainCurrent.text(eval(mainCurrent.text() * -1));
    });
var zero = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('0')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        zero.color('#A9A9A9');
    }, function() {
        zero.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }
        mainCurrent.text(mainCurrent.text() + zero.text());
        init_flag = false;
    });
var dot = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('.')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        dot.color('#A9A9A9');
    }, function() {
        dot.color('#D3D3D3');
    }).click(function() {
        mainCurrent.text(mainCurrent.text() + dot.text());
    });
var equal = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('=')
    .textSize('6vw').alignCenter().selectNone().hover(function() {
        equal.color('#A9A9A9');
    }, function() {
        equal.color('#D3D3D3');
    }).click(function() {
        if(op_flag === true) {
            mainCurrent.text(eval(subCurrent.text().slice(0, length-1)));
            subCurrent.text('');
        }
        else {
            mainCurrent.text(eval(subCurrent.text() + mainCurrent.text()));
            subCurrent.text('');
        }
        // tracer에 저장해야함.
    });