var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/module/:dep', function (req, res) {
    db.one("SELECT ctext FROM code_store WHERE mstatus=1 AND title=${dep}", req.params)
        .then(function (data) {
            var code = data.ctext;
            // scope의 충돌을 막기 위해 읽어온 코드를 function으로 한번 감싸서 수행해줍니다.
            res.send('(function(){' + code + '\n})();');
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: "모듈을 불러올 수 없습니다."
            });
        });
});

router.get('/code/:cid', function (req, res) {
    db.one("SELECT ctext, deps FROM code_store WHERE cid=${cid}", req.params)
        .then(function (data) {
            console.log(data);
            // scope의 충돌을 막기 위해 읽어온 코드를 function으로 한번 감싸서 수행해줍니다.
            res.json({
                ctext: '(function(){' + data.ctext + '\n})();',
                deps: data.deps
            });
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
            res.json({
                resultCode: -1,
                msg: "코드를 불러올 수 없습니다."
            });
        });
});


module.exports = router;


