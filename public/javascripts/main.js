/**
 * require.js 환경설정
 * baseUrl : js파일이 있는 경로 require.js가 로딩하는 경로,
 * 모듈화 할 기능들을 가지고 있는 경로인셈!
 * paths : baseUrl이외에 직접적으로 경로를 지정할수 있다
 */

requirejs.config({

    baseUrl: "app",
    waitSeconds: 20,//모듈이 로딩 되는 시간, 20초가 넘어가면 error를 던진다
    //나중에 requirejs에서 의존 파일을 불러올때 baseUrl에 없는 파일도 여기서 경로를 등록해두면 사용할수있다.
    paths: {
        kks1 : '../app/kakaotest',
        amba : 'amba'
        //jquery: 'jquery'
    },

    //require.js가 로딩되기전에 config파일에서 먼저 로딩되야하는 모듈 목록을 배열로 나열
    //deps: ['/app/kakaotest']
});