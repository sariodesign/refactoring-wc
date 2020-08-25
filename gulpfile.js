'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
var del = require('del');
var fs = require('file-system');
var data = require('gulp-data');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var ext_replace = require('gulp-ext-replace');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminOptipng = require('imagemin-optipng');
var webp = require('gulp-webp');
var browserSync = require('browser-sync').create();

gulp.task('clean', function () {
  return del(['./dist/*.html', './dist/css', './dist/js']);
});

gulp.task('html', function () {
  return gulp.src('src/pages/*.njk')
   .pipe(data(function() {
      return JSON.parse(fs.readFileSync('src/data.json'));
    }))
    .pipe(nunjucksRender({
      path: ['./src/partials','./src/php','./src/templates/','./src/pages/'] // String or Array
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('html-rename', function() {
  gulp.src(['./dist/contatti.html', './dist/preventivo.html'])
      .pipe(ext_replace('.php'))
      .pipe(gulp.dest('./dist'))
});

gulp.task('fonts', function() {
  return gulp.src('./src/assets/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('images', function() {
  return gulp.src('./src/assets/images/**/*{jpg,png,svg}')
    //.pipe(webp())
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
});

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./src/assets/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('./src/assets/javascript/*.js')
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('launch-browser', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/assets/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./src/assets/javascript/*.js', ['js']);
    gulp.watch('./src/**/*.njk', ['html']);
});

gulp.task('default', gulpSequence('clean', ['html', 'fonts', 'images', 'sass', 'js', 'launch-browser']));
