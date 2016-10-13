var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/:dep', function (req, res) {
    db.one("SELECT ctext FROM code_store WHERE mstatus=1 AND title=${dep}", req.params)
        .then(function (data) {
            var code = data.ctext;
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

module.exports = router;


