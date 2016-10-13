/**
 * Created by Lightsoo on 2016. 10. 6..
 */

var adapter = [];
//입력창, 출력창,버튼
var root = div().append().size('100%','100%');


var textView = div().appendTo(root).size('600','25').displayBlock()
div().appendTo(textView).size('148','auto').text('CID').textAlign('center')
    .borderOption(1).borderOption('black', 'color');
div().appendTo(textView).size('148','auto').text('KEY').textAlign('center')
    .borderOption(1).borderOption('black', 'color');
div().appendTo(textView).size('148','auto').text('VALUE').textAlign('center')
    .borderOption(1).borderOption('black', 'color');

var inputView = div().appendTo(root).size('600','100').displayBlock()
var inputCid = div().appendTo(inputView).size('148','100').editable(true).text('')
    .borderOption(1).borderOption('black', 'color')
var inputKey = div().appendTo(inputView).size('148','100').editable(true).text('')
    .borderOption(1).borderOption('black', 'color')
var inputValue = div().appendTo(inputView).size('148','100').editable(true).text('')
    .borderOption(1).borderOption('black', 'color')


var btnView = div().appendTo(root).size('600','100').displayBlock()
    .borderOption(1).borderOption('black', 'color');


var outputView = div().appendTo(root).size('600','300').displayBlock()
    .overflow('scroll')
    .borderOption(1).borderOption('black', 'color');


var btnPut = div().appendTo(btnView).size('148','100').text('PUT')
    .borderOption(1).borderOption('black', 'color')
    .hoverColor('blue','white')
    .click(function () {
        if (inputCid.text() === '' || inputKey.text() === '' || inputValue.text() === '')
            alert('cid, key, value를 입력해주세요.');
        else {
            $.post("/cachestore/put",
                {
                    cid: inputCid.text(),
                    key: inputKey.text(),
                    value: inputValue.text()
                }, function (result) {
                    //outputView.empty();
                    outputView.text(JSON.stringify(result));
                });
        }
    });
var btnGet = div().appendTo(btnView).size('148','100').text('GET')
    .borderOption(1).borderOption('black', 'color')
    .hoverColor('blue','white')
    .click(function () {
        if (inputCid.text() === '' || inputKey.text() === '')
            alert('cid, key를 입력해주세요.');
        else {
            $.get("/cachestore/get",
                {
                    cid: inputCid.text(),
                    key: inputKey.text()
                }, function (result) {
                    outputView.empty();
                    div().appendTo(outputView).text(JSON.stringify(result));
                    //outputView.text(JSON.stringify(result));
                });
        }
    });
var btnKeys = div().appendTo(btnView).size('148','100').text('KEYS')
    .borderOption(1).borderOption('black', 'color')
    .hoverColor('blue','white')
    .click(function () {
        if (inputCid.text() === '' )
            alert('cid를 입력해주세요.');
        else {
            $.get("/cachestore/keys",
                {
                    cid: inputCid.text()
                }, function (result) {
                    outputView.empty();
                    adapter = adapter.concat(result);
                    for(var i = 0; i< adapter.length;i++){
                        div().appendTo(outputView).size('100%','40')
                            .borderOption(1).borderOption('black','color')
                            .text(adapter[i]);
                    }
                    adapter= [];
                });
        }
    });

var btnList = div().appendTo(btnView).size('148','100').text('LIST')
    .borderOption(1).borderOption('black', 'color')
    .hoverColor('blue','white')
    .click(function () {
        if (inputCid.text() === '' )
            alert('cid를 입력해주세요.');
        else {
            $.get("/cachestore/list",
                {
                    cid: inputCid.text()
                }, function (result) {
                    outputView.empty();
                    adapter = adapter.concat(result);
                    for(var i = 0; i< adapter.length;i++){
                        div().appendTo(outputView).size('100%','40')
                            .borderOption(1).borderOption('black','color')
                            .text(adapter[i]);
                    }
                    adapter= [];
                    //outputView.text(JSON.stringify(result));
                });
        }
    });
