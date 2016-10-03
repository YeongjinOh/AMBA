/**
 * Created by JiSoo on 2016-09-28.
 */

var config = require('./config');
var pgp = require('pg-promise')();
pgp.pg.defaults.poolSize = 20;
pgp.pg.defaults.ssl = true;
var DB = pgp(config.db.DATABASE_URL);

module.exports = DB;