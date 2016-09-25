/**
 * Created by Lightsoo on 2016. 9. 12..
 */
//kks3805@naver.com 


var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');

// 자바스크립트 파일을 하나로 합치고 압축한다. + 난독화
gulp.task('combine-js', function () {
    return gulp.src('routes/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});


// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
    return gulp.src('views/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('public.dist/html'));
});

gulp.task('default', ['combine-js', 'compress-html'])

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

