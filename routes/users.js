var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var db = require('../db');
var config = require('../config');

/* 기존 사용자 정보를 얻는다. */
router.get('/', function(req, res, next) {
  if (!req.query.token)
    return res.send(401);

  var token = jwt.decode(req.query.token, config.secret);
  db.one("select * from users_tb where username_cd = $1;", [token.username])
      .then( function() {
        res.send({
            type: true
        });
      })
      .catch( function(err) {
        res.send(err);
      });
});

/* 새로운 사용자를 생성한다. */
router.post('/', function(req, res, next) {
  db.one("select * from users_tb where username_cd = $1;", [req.body.username])
      .then(function (err) {
        res.send(err);
      })
      .catch( function() {
        db.none("insert into users_tb(username_cd, password_nm) values($1, $2);", [req.body.username, req.body.password])
            .then(function() {
              res.send({
                type: true
              })
            })
            .catch(function(err) {
              res.send(err)
            });
      });
});

module.exports = router;
