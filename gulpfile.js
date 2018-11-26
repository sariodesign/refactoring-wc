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
var imageminJpegtran = require('imagemin-jpegtran');
var imageminOptipng = require('imagemin-optipng');
var webp = require('gulp-webp');
var browserSync = require('browser-sync').create();

gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('html', function () {
  return gulp.src('src/pages/*.njk')
   .pipe(data(function() {
      return JSON.parse(fs.readFileSync('src/data.json'));
    }))
    .pipe(nunjucksRender({
      path: ['./src/partials','./src/templates/','./src/pages/'] // String or Array
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
  return gulp.src('./src/assets/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
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

gulp.task('slide', function() {
  return gulp.src(['./src/assets/images/carousel/*.jpg'])
    .pipe(imagemin([imagemin.jpegtran({progressive: true})]))
    .pipe(gulp.dest('./dist/img/carousel/'))
    .pipe(webp())
    .pipe(gulp.dest('./dist/img/carousel/webp'))
});

gulp.task('logo', function() {
  return gulp.src(['./src/assets/images/logo.png'])
    .pipe(imagemin([imagemin.optipng({optimizationLevel: 5})]))
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('parallaxImg', function() {
  return gulp.src(['./src/assets/images/parallax-img.png'])
    .pipe(imagemin([imagemin.optipng({optimizationLevel: 5})]))
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('optimizeImg', function() {
  return gulp.src(['./src/assets/images/*.jpg'])
    .pipe(imagemin([imagemin.jpegtran({progressive: true})]))
    .pipe(gulp.dest('./dist/img'))
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

gulp.task('default', gulpSequence('clean', ['html', 'fonts', 'sass', 'js', 'slide', 'logo', 'parallaxImg', 'launch-browser']));
