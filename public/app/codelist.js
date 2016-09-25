$(document).ready(function(){
    var parent = div().append().size('100%','100%');
    var sidebar = div().appendTo(parent).size('5%','100%').border(1);
    var codelist = div().appendTo(parent).size('25%','100%').border(1).overflow('scroll');
    var codeWrapper = div().appendTo(parent).size('65%','100%').padding(20);

    // design sidebar
    var addButton = div().appendTo(sidebar).size(30,30).margin(20).color('#ee8833');

    // design codelist
    var listHeader = div().appendTo(codelist).size('100%','120px').color('#dddddd').border(2);
    var headerTitle = div().appendTo(listHeader).size('100%','40px').marginTop(20).text('Code List').textSize(28).alignCenter();
    var listName = div().appendTo(listHeader).size('100%','50px').marginTop(20).text('javascript').textSize(20).textColor('gray').alignCenter();
    var listWrapper = div().appendTo(codelist).size('100%',codelist.getAbsoluteHeight()-listHeader.getAbsoluteHeight()).border(2);

    // design codeWrapper
    var title = div().appendTo(codeWrapper).size('100%', '80px').color('orange');
    var code = div().appendTo(codeWrapper).size('100%', '80%').marginTop(10).color('yellow');

});
