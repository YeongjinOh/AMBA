var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
// var redis = require('redis');
// var cache = redis.createClient();

var nodeadmin = require('nodeadmin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(nodeadmin(app));

//라우터보다 먼저 미들웨어 등록!!
//app.use(function (req, res, next) {
//  req.cache = cache;
//  next();
//});


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/projects', require('./routes/projects'));
app.use('/modules', require('./routes/modules'));
app.use('/datastore', require('./routes/datastore'));
app.use('/cachestore', require('./routes/cachestore'));
app.use('/hashstore', require('./routes/hashstore'));
app.use('/jsloader', require('./routes/jsloader'));
app.use('/fileupload', require('./routes/fileupload'));
app.use('/migration', require('./routes/migration'));
app.use('/blog', require('./routes/blog'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
