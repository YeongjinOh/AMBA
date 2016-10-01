/**
 * Created by JiSoo on 2016-09-29.
 */

var jwt = require('jwt-simple');
var config = require('./config');

var test = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Inlqc2dvb25AbmF2ZXIuY29tIn0.jVkop85kwK1tu7vl-i51XYfz1ZNWlgdctsUpW8mGByc";

console.log(jwt.decode(test, config.secret));