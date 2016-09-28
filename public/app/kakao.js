/**
 * Created by Lightsoo on 2016. 9. 27..
 */



//var parent = div().append().size('100%','100%');
//width를 100%주면 display : block이 아니라 inline-block이라도 다음 박스가 밑으로 연결된다!
var topDiv = div().append().size('100%','10%').color('red').text('상단'); //.displayBlock();
var chatListView = div().append().size('100%','70%').overflow('scroll').color('#80bfff');

var bottomFunc = div().append().size('100%', '5%').color('gray')
var func1 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
var func2 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');
var func3 = div().appendTo(bottomFunc).size('40','100%').border(1).color('blue');
var func4 = div().appendTo(bottomFunc).size('40','100%').border(1).color('red');

var bottomDiv = div().append().size('100%', '15%');
var bottomDiv1 = div().appendTo(bottomDiv).size('80%', '100%').color('red');
//var inputDiv = div().appendTo(bottomDiv1).size('100%', '100%').color('red').padding(10);

var bottomDiv2 = div().appendTo(bottomDiv).size('20%','100%').color('green')
    .click(function () {

        //var receivedMsg = div().size('100%', 'auto').minHeight(70);
        ////parent의 height를 'auto'로 설정했을때 min값을 설정해서 profile이 출력되게 하였다
        //var profile = div().appendTo(receivedMsg).size('70','70').color('blue');
        //var txt = div().appendTo(receivedMsg).size('500','100%').color('gray');
        //var name = div().appendTo(txt).size('100','100%').color('red').text('김경수').displayBlock();
        //var msg = div().appendTo(txt).size('40','auto').color('purple').text('23111321312312312311132131231231231113213123123123').whiteSpace('normal');
        //receivedMsg.appendTo(chatListView);

        var myMsg = div().size('auto', 'auto').minHeight(70).color('#ffff4d').text('내가 쓴 sdsdsd문자').floatRight();
        myMsg.appendTo(chatListView);

    });



//var submitDiv = div().appendTo(bottomDiv2).size('100%', '100%').color('red').padding(10);
