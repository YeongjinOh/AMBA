/**
 * Created by JiSoo on 2016-10-16.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './tmp/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);// + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).array('amba_file');

router.post('/put', function(req, res) {
    console.log(req.body);
    console.log(req.files);

    upload(req, res, function(err) {
        if (err) {
            res.json({
               resultCode: -1,
                msg: err
            });
        }
        res.json({
            resultCode: 0
        });
    });
});

module.exports = router;