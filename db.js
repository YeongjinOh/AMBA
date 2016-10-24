/**
 * Created by JiSoo on 2016-09-28.
 */

var config = require('./config');
var mysql = require('promise-mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'iamhappy',
    database: 'amba',
    connectionLimit: 20
});

module.exports = pool;

// var config = require('./config');
// var pgp = require('pg-promise')();
// pgp.pg.defaults.poolSize = 20;
// pgp.pg.defaults.ssl = true;
// var DB = pgp(config.db.DATABASE_URL);
//
// module.exports = DB;