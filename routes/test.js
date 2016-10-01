/**
 * Created by JiSoo on 2016-10-02.
 */

var crypto = require('crypto');
var config = require('../config');

var password = crypto.createHmac('sha256', config.pwSecret).update('testtest').digest('hex');

console.log(password);