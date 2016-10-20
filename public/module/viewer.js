define([], function () {
    var executeCode = function (code, deps, callback) {

        // dependency들을 받아올 url을 설정합니다.
        var urls = deps.map(function (dep) {
            return '/jsloader/module/' + dep;
        });

        require(urls, function () {
            // 서버로 부터 리턴받은 코드들이 수행되어 그 결과를 arguments로 받아옵니다.
            // 정상적으로 define을 써서 모듈화를 수행한 코드의 경우, return하는 object를 AB.module[name] 에 넣어줍니다.
            // 그렇지 않은 경우 (예를 들어 스크립트를 실행하여 함수만 정의하는 경우) AB.module[name] 에는 undefined가 들어갑니다.
            for (var i = 0; i < arguments.length; i++) {
                AB.module[deps[i]] = arguments[i];
            }

            // 현재 코드를 실행시키기 위한 script를 추가합니다.
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.text = code;
            callback(); // remove loading bar;
            head.appendChild(script);
        });
    };

    return {
        run: function (cid, callback) {

            /** cid를 이용해서 코드를 실행하는 경우 **/
            if (cid) {
                // cid를 이용하여 코드와 dependency를 읽어 온 뒤 실행
                $.get('/jsloader/code/'+cid)
                    .done(function (res) {
                        var code = res.ctext;
                        var deps = JSON.parse(res.deps);
                        executeCode(code, deps, callback);
                    });

                /** local Storage에 저장된 코드를 실행하는 경우 **/
            } else {
                var deps = JSON.parse(localStorage.getItem('adeps'))
                var code = localStorage.getItem('acode');
                executeCode(code, deps, callback);
                localStorage.removeItem('acode');
                localStorage.removeItem('adeps');
            }
        }
    }
});
