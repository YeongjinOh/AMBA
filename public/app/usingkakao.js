AB.loadModule('/app/kakao.js', function(moduleObj){
    var chatModule = moduleObj;
    var chat = div().append().size(700, 'auto');
    chatModule.appendTo(chat);
});
