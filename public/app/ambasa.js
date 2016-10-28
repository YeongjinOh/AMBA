(function () {

    /** colors **/
    var borderGray = '1px solid #cccccc', slideListColor = '#eeeeee', slideEditorColor = '#dddddd';

    /** basic setting for layout **/

    var w = window.outerWidth, h = window.outerHeight;
    var menuBarWidth = w, menuBarHeight = 100, slideListWidth = 220, slideListHeight = h-menuBarHeight,
        slideEditorWidth = w-slideListWidth, slideEditorHeight = slideListHeight;
    var parent = div().append().size(w,h);
    var menuBar = div().appendTo(parent).size(menuBarWidth, menuBarHeight).borderBottom(borderGray);
    var slideList = div().appendTo(parent).size(slideListWidth, slideListHeight).borderRight(borderGray).color(slideListColor).overflowAuto();
    var slideEditor = div().appendTo(parent).size(slideEditorWidth, slideEditorHeight).color(slideEditorColor).overflowAuto();

    /** menu bar **/

    var fileName = div().appendTo(menuBar).size(200,30).margin(20)
        .text('제목 없는 프레젠테이션').fontColor('gray').fontSize(20);

    /** set slide background **/

    // calculate sbg width and height
    var sbgMargin = slideEditorWidth/8, ratio = 1; // 전체 화면과 Editor 상 background 사이의 비율
    var sbgMaxWidth = slideEditor.widthPixel()-2*sbgMargin, sbgMaxHeight = slideEditor.heightPixel()-2*sbgMargin;
    if (h*sbgMaxWidth < w*sbgMaxHeight)
        ratio = sbgMaxWidth/w;
    else
        ratio = sbgMaxHeight/h;
    var sbgWidth = w * ratio, sbgHeight = h*ratio;
    var sbgMarginLeft = (slideEditorWidth-sbgWidth)/2, sbgMarginTop = (slideEditorHeight-sbgHeight)/2;
    var slideBackground = div().appendTo(slideEditor).size(sbgWidth,sbgHeight).marginLeft(sbgMarginLeft).marginTop(sbgMarginTop)
        .color('white').border(borderGray).draggable().boxShadow('0px 5px 20px #888888')
        .resizable({aspectRatio:true});

})();