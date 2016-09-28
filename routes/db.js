/**
 * Created by JiSoo on 2016-09-28.
 */

// var pg = require('pg');
//
// pg.defaults.ssl = true;
// var url = process.env.DATABASE_URL;
//
// pg.connect(url, function(err, client) {
//     if(err) throw err;
//     console.log('Connected to postgres! Getting schemas...');
// });
//
// module.exports = pg;

var express = require('express');
var router = express.Router();

var pgp = require('pg-promise')();
pgp.pg.defaults.poolSize = 10;

router.get('/', function(req, res) {
    pgp(process.env.DATABASE_URL).any('select ...')
    .then(function(result) {
            res.status(200).send(result);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});