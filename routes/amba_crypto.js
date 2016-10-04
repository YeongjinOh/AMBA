/**
 * Created by JiSoo on 2016-10-03.
 */

var config = require('../config');
var crypto = require('crypto');

module.exports.encrypt = function(enc_data) {
    var cipher = crypto.createCipher('aes192', config.secret);

    var encrypted = cipher.update(enc_data, 'utf8', 'base64');
    return encrypted + cipher.final('base64');
};

module.exports.decrypt = function(dec_data) {
    var decipher = crypto.createDecipher('aes192', config.secret);

    var decrypted = decipher.update(dec_data, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
};