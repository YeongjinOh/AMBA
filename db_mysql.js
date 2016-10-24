/**
 * Created by JiSoo on 2016-10-23.
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