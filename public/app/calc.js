/**
 * Created by JiSoo on 2016-09-21.
 */

var root = div().size('100%', '100%').color('#FFF0F5').append();

var current = div().size('70%', '20%').marginTop('9%').marginLeft('5%').color('lightblue').appendTo(root).cursorDefault();
var subCurrent = div().displayBlock().size('100%', '30%').color('#F5FFFA').appendTo(current)
                    .textAlignRight().fontSize('3vw').textOverflowEllipsis();
var mainCurrent = div().displayBlock().size('100%', '70%').color('#F5FFFA').appendTo(current)
                    .textAlignRight().fontSize('8vw').textOverflowEllipsis().text(0);

var input = div().size('70%', '60%').marginLeft('5%').color('#D3D3D3').appendTo(root)
                 .cursorDefault().textAlignCenter().disableSelection();
var control = div().size('75%', '80%').color('#D3D3D3').appendTo(input);
var operator = div().size('25%', '80%').color('#D3D3D3').appendTo(input);
var etc = div().size('100%', '20%').color('#D3D3D3').appendTo(input);

var init_flag = true;   // 초기 입력 확인 flag
var op_flag = false;    // operator 확인 flag
var frac_flag = false;  // 실수 확인 flag

var index;
var token = {
    control: ['CE', 'C', '≪'],
    num: ['7', '8', '9', '4', '5', '6', '1', '2', '3'],
    operator: ['÷', '×', '-', '+'],
    etc: ['±', '0', '.', '=']
};

for (index = 0; index < token.control.length; index += 1) {
    div().size('33.3%', '25%').color('#D3D3D3').appendTo(control).text(token.control[index]).fontSize('6vw')
         .hoverColor('#A9A9A9','#D3D3D3').click(function(dv) {
        switch (dv.text()) {
            case 'CE':
                mainCurrent.text('0');
                init_flag = true;
                frac_flag = false;
                break;
            case 'C':
                mainCurrent.text('0');
                subCurrent.text('');
                init_flag = true;
                frac_flag = false;
                break;
            case '≪':
                if(init_flag === false) {
                    if(mainCurrent.text().slice(-1) === '.')
                        frac_flag = false;
                    mainCurrent.text(mainCurrent.text().slice(0, length - 1));
                }
                break;
        }
    });
}

for (index = 0; index < token.num.length; index += 1) {
    div().size('33.3%', '25%').color('#D3D3D3').appendTo(control).text(token.num[index]).fontSize('6vw')
        .hoverColor('#A9A9A9', '#D3D3D3').click(function(dv) {
        if (init_flag === true) {
            mainCurrent.text('');
            init_flag = false;
        }
        if (op_flag === true) {
            mainCurrent.text('');
            op_flag = false;
        }

        mainCurrent.text(mainCurrent.text() + dv.text());
        init_flag = false;
    });
}

for (index = 0; index < token.etc.length; index += 1) {
    div().size('25%', '100%').color('#D3D3D3').appendTo(etc).text(token.etc[index]).fontSize('6vw')
        .hoverColor('#A9A9A9', '#D3D3D3').click(function(dv) {
        switch (dv.text()) {
            case '±':
                if(init_flag === false)
                    mainCurrent.text(eval(mainCurrent.text() + ' * (-1)'));
                break;
            case '0':
                if (init_flag === false) {
                    if (op_flag === true) {
                        mainCurrent.text('');
                        op_flag = false;
                    }
                    mainCurrent.text(mainCurrent.text() + dv.text());
                    init_flag = false;
                }
                break;
            case '.':
                if(frac_flag === false) {
                    mainCurrent.text(mainCurrent.text() + dv.text());
                    init_flag = false;
                    frac_flag = true;
                }
                break;
            case '=': // tracer or history기능 추가하기
                subCurrent.text(subCurrent.text().replace(/×/g, '*').replace(/÷/g, '/'));
                if(op_flag === true)
                    mainCurrent.text(eval(subCurrent.text().slice(0, length-2)));
                else
                    mainCurrent.text(eval(subCurrent.text() + mainCurrent.text()));
                subCurrent.text('');
                init_flag = true;
                break;
        }
    });
}

for (index = 0; index < token.operator.length; index += 1) {
    div().size('100%', '25%').color('#D3D3D3').appendTo(operator).text(token.operator[index]).fontSize('6vw')
        .hoverColor('#A9A9A9', '#D3D3D3').click(function(dv) {
        if (init_flag === false) {
            if (op_flag === false) {
                subCurrent.text(subCurrent.text() + ' ' + mainCurrent.text() + ' ' + dv.text());
                op_flag = true;
            }
            else
                subCurrent.text(subCurrent.text().slice(0, length - 1) + ' ' + dv.text());
        }
    });
}