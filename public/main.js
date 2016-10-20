/**
 * require.js 환경설정
 * baseUrl : js파일이 있는 경로 require.js가 로딩하는 경로,
 * 모듈화 할 기능들을 가지고 있는 경로인셈!
 * paths : baseUrl이외에 직접적으로 경로를 지정할수 있다
 *
 * define() namepace확인!!
 * 사파리에서 안되는거 로딩문제 확인
 * 모듈리스트를 만들자.
 * 디비에 있는 모듈 소스를 불러와서 require()를 통해서 사용가능한지
 * 그렇게해서 모듈리스트를 보여줄수 있게끔.
 */

requirejs.config({

    baseUrl: "/module",
    waitSeconds: 20,//모듈이 로딩 되는 시간, 20초가 넘어가면 error를 던진다
    //나중에 requirejs에서 의존 파일을 불러올때 baseUrl에 없는 파일도 여기서 경로를 등록해두면 사용할수있다.

    paths: {
        test : 'http://127.0.0.1:3000/cachestore/get?cid=ida&key=src1',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min',
        jqueryUi: '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
        underscore:'../javascripts/underscore',
        aceCdn:'//cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace',
        amba: '../javascripts/amba',
        ambaMod: '../javascripts/amba-mod',
        ambaUtils: '../javascripts/amba-util',
        primus: '../primus/primus'
    }

    //require.js가 로딩되기전에 config파일에서 먼저 로딩되야하는 모듈 목록을 배열로 나열
    //deps: ['../javascripts/amba']
});