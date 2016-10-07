/**
 * Created by Lightsoo on 2016. 9. 25..
 */

var ace = div().id('ace').append().size('30%',500).border(1).borderColor('black').aceEditor().marginTop(10).displayBlock();
var view1 = div();
var btn = div().append().size('100', '100').borderOption(2).borderOption('black', 'color').displayBlock()
    .click(function () {
        var temp = ace.text();
        view1.text(temp);
    });
view1.append().color('blue').size('200','200').overflow('scroll');

//var txt = div().size('30%', 500).append().border(1).borderColor('black').isEditable(true).overflow('scroll').marginTop(10);
//var codeMirror = div().id('mirror').append().size('50%',300).border(1).borderColor('black').codeMirror();


