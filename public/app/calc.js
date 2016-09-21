/**
 * Created by JiSoo on 2016-09-21.
 */

var root = div().size('100%', '100%').color('red').append();

var calc = div().size('80%', '100%').color('blue').appendTo(root);
var history = div().size('20%', '100%').color('yellow').appendTo(root);

// var status = div().displayBlock().size('90%', '20%').color('red').appendTo(calc);
var status = div().size('90%', '20%').margin('9% 5% 0% 5%').color('lightblue').appendTo(calc);

// var subStatus = div().displayBlock().size('100%', '20%').color('yellow').appendTo(status);
// var mainStatus = div().displayBlock().size('100%', '80%').color('green').appendTo(status);
div().size(50, 50).color("white").appendTo(status);

// var input = div().displayBlock().size('90%', '60%').color('#D3D3D3').appendTo(calc);
var input = div().size('90%', '60%').margin('0% 5% 9% 5%').color('#D3D3D3').appendTo(calc);

/* row_1 */
var sp = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('%')
    .textSize('5vw').alignCenter().hover(function() {
        sp.color('#A9A9A9');
    }, function() {
        sp.color('#D3D3D3');
    }).click(function() {
        status.text('test');
    });
var ce = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('CE')
    .textSize('5vw').alignCenter().hover(function() {
        ce.color('#A9A9A9');
    }, function() {
        ce.color('#D3D3D3');
    }).click(function() {
        ce.text('click');
    });
var clear = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('C')
    .textSize('5vw').alignCenter().hover(function() {
        clear.color('#A9A9A9');
    }, function() {
        clear.color('#D3D3D3');
    }).click(function() {
        clear.text('click');
    });
var back = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('≪') // text 수정해야함
    .textSize('5vw').alignCenter().hover(function() {
        back.color('#A9A9A9');
    }, function() {
        back.color('#D3D3D3');
    }).click(function() {
        back.text('click');
    });
var division = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('÷')
    .textSize('5vw').alignCenter().hover(function() {
        division.color('#A9A9A9');
    }, function() {
        division.color('#D3D3D3');
    }).click(function() {
        division.text('click');
    });

/* row_2 */
var sqrt = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('√')
    .textSize('5vw').alignCenter().hover(function() {
        sqrt.color('#A9A9A9');
    }, function() {
        sqrt.color('#D3D3D3');
    }).click(function() {
        sqrt.text('click');
    });
var seven = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('7')
    .textSize('5vw').alignCenter().hover(function() {
        seven.color('#A9A9A9');
    }, function() {
        seven.color('#D3D3D3');
    }).click(function() {
        seven.text('click');
    });
var eight = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('8')
    .textSize('5vw').alignCenter().hover(function() {
        eight.color('#A9A9A9');
    }, function() {
        eight.color('#D3D3D3');
    }).click(function() {
        eight.text('click');
    });
var nine = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('9')
    .textSize('5vw').alignCenter().hover(function() {
        nine.color('#A9A9A9');
    }, function() {
        nine.color('#D3D3D3');
    }).click(function() {
        nine.text('click');
    });
var multiple = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('×')
    .textSize('5vw').alignCenter().hover(function() {
        multiple.color('#A9A9A9');
    }, function() {
        multiple.color('#D3D3D3');
    }).click(function() {
        multiple.text('click');
    });

/* row_3 */
var square = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('x²')
    .textSize('5vw').alignCenter().hover(function() {
        square.color('#A9A9A9');
    }, function() {
        square.color('#D3D3D3');
    }).click(function() {
        square.text('click');
    });
var four = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('4')
    .textSize('5vw').alignCenter().hover(function() {
        four.color('#A9A9A9');
    }, function() {
        four.color('#D3D3D3');
    }).click(function() {
        four.text('click');
    });
var five = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('5')
    .textSize('5vw').alignCenter().hover(function() {
        five.color('#A9A9A9');
    }, function() {
        five.color('#D3D3D3');
    }).click(function() {
        five.text('click');
    });
var six = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('6')
    .textSize('5vw').alignCenter().hover(function() {
        six.color('#A9A9A9');
    }, function() {
        six.color('#D3D3D3');
    }).click(function() {
        six.text('click');
    });
var minus = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('-')
    .textSize('5vw').alignCenter().hover(function() {
        minus.color('#A9A9A9');
    }, function() {
        minus.color('#D3D3D3');
    }).click(function() {
        minus.text('click');
    });

/* row_4 */
var cube = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('x³')
    .textSize('5vw').alignCenter().hover(function() {
        cube.color('#A9A9A9');
    }, function() {
        cube.color('#D3D3D3');
    }).click(function() {
        cube.text('click');
    });
var one = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('1')
    .textSize('5vw').alignCenter().hover(function() {
        one.color('#A9A9A9');
    }, function() {
        one.color('#D3D3D3');
    }).click(function() {
        one.text('click');
    });
var two = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('2')
    .textSize('5vw').alignCenter().hover(function() {
        two.color('#A9A9A9');
    }, function() {
        two.color('#D3D3D3');
    }).click(function() {
        two.text('click');
    });
var three = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('3')
    .textSize('5vw').alignCenter().hover(function() {
        three.color('#A9A9A9');
    }, function() {
        three.color('#D3D3D3');
    }).click(function() {
        three.text('click');
    });
var plus = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('+')
    .textSize('5vw').alignCenter().hover(function() {
        plus.color('#A9A9A9');
    }, function() {
        plus.color('#D3D3D3');
    }).click(function() {
        plus.text('click');
    });

/* row_5 */
var fraction = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('1/x')
    .textSize('5vw').alignCenter().hover(function() {
        fraction.color('#A9A9A9');
    }, function() {
        fraction.color('#D3D3D3');
    }).click(function() {
        fraction.text('click');
    });
var pm = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('±')
    .textSize('5vw').alignCenter().hover(function() {
        pm.color('#A9A9A9');
    }, function() {
        pm.color('#D3D3D3');
    }).click(function() {
        pm.text('click');
    });
var zero = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('0')
    .textSize('5vw').alignCenter().hover(function() {
        zero.color('#A9A9A9');
    }, function() {
        zero.color('#D3D3D3');
    }).click(function() {
        zero.text('click');
    });
var dot = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('.')
    .textSize('5vw').alignCenter().hover(function() {
        dot.color('#A9A9A9');
    }, function() {
        dot.color('#D3D3D3');
    }).click(function() {
        dot.text('click');
    });
var equal = div().size('20%', '20%').color('#D3D3D3').appendTo(input).text('=')
    .textSize('5vw').alignCenter().hover(function() {
        equal.color('#A9A9A9');
    }, function() {
        equal.color('#D3D3D3');
    }).click(function() {
        equal.text('click');
    });