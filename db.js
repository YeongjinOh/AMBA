/**
 * Created by JiSoo on 2016-09-28.
 */

var pgp = require('pg-promise')();
pgp.pg.defaults.poolSize = 10;
pgp.pg.defaults.ssl = true;
var DB = pgp('postgres://eynernjlrihgzw:2cSSchyFA0jNj0etElZ574Y0z2@ec2-54-243-54-21.compute-1.amazonaws.com:5432/d1o7q84tkif5t0');

module.exports = DB;