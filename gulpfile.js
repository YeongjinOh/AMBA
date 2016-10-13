/**
 * Created by Lightsoo on 2016. 9. 12..
 */



var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var jsdoc = require('gulp-jsdoc3');


gulp.task('jsdoc', function (cb) {
    gulp.src('public/javascripts/amba.js', {read: false})
        .pipe(jsdoc(cb));
});

////config파일 사용
//gulp.task('jsdoc', function (cb) {
//    var config = require('./jsdoc.json');
//    gulp.src('public/javascript/amga.js', {read: false})
//        .pipe(jsdoc(config, cb));
//});

// 자바스크립트 파일을 하나로 합치고 압축한다. + 난독화
gulp.task('combine-js', function () {
    return gulp.src('public/module/kakao.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});


// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
    return gulp.src('public/index.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('public/dist/html'));
});

//gulp.task('default', ['combine-js', 'compress-html', 'jsdoc'])
gulp.task('default', ['combine-js']);

gulp.task('watch', function () {
    //routes 디렉토리 안에 js 확장자를 가진 파일이 변경되면 combine-js task 실행
    gulp.watch('routes/*.js', ['combine-js']);
});

//hello작업을 수행하면 welcome작업이 끝날 때까지 기다린다.
gulp.task('hello',['welcome'], function () {
    console.log("welcome to gulp")

    //console.log('hello world');
})

gulp.task('welcome', function () {
    return gulp.pipe(console.log('hello')).pipe(console.log("world"))
    //console.log('hello world')
})

