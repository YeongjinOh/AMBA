//codelist에서  viewer.js를 실행할때 디펜던시를 가지고 올때 서버url을 만들을 넣어야한다..
//requirejs를 codelistㅔ서 run했을때 사용하게끔 depse 들을 배열로 받아서 사용할수 있어야한다
//index.html에서 디펜던시를 불러와야한다

//c: module명, server : 난수

requirejs([], function () {
eval(localStorage.getItem('acode'));
localStorage.clear('acode');
});
