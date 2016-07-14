/**
 * gulp-boiler
 *
 * ** 開発開始手順
 *
 * $ npm i
 * $ gulp sprite
 *
 *
 * ** 開発開始 with clean & watchコマンド
 *
 * $ gulp start
 *
 * ** spriteコマンド
 *
 * $ gulp sprite
 *
 * ** iamge optimコマンド
 *
 * $ gulp optim
 *
 * ** jshintコマンド
 *
 * $ gulp test
 *
 * ** dist、tmp削除コマンド
 *
 * $ gulp clean
 *
 * ---------------------------------------------------------------------- */

/*
 * init package
 */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var size = require('gulp-size');
var postcss = require('gulp-postcss');


/*
 * path
 */
var path = {
  src: 'src/',
  dist: 'dist/',
  tmp: 'tmp/',
  html_src: 'src/ejs/',
  css_src: 'src/css/',
  js_src: 'src/js/',
  img_src: 'src/img/',
  sprite_src: 'src/sprite/'
};


/*
 * clean
 */
var clean = require('del');
gulp.task('clean', function () {
  clean(path.tmp);
  clean(path.dist);
});


/*
 * sprite
 */
var spritesmith = require('gulp.spritesmith');
gulp.task('sprite', function () {
  var spriteData = gulp.src(path.sprite_src + 'sprite-sample/*.png')
  .pipe(spritesmith({
    imgName: 'sprite-sample.png',
    cssName: 'sprite-sample.css',
    imgPath: '../img/sprite-sample.png',
    cssFormat: 'css',
    padding: 5,
  }));
  spriteData.img.pipe(gulp.dest(path.img_src));
  spriteData.css
  .pipe(gulp.dest(path.css_src + 'all/module/'))
  .pipe(size({title:'size : sprite'}));
});

/*
 * image optim
 */
var imageOptim = require('gulp-imageoptim');
gulp.task('imageOptim', function() {
  return gulp.src(path.img_src + '**/*')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest(path.img_src));
});


/*
 * postcss
 */
// precss(scss like)
var precss = require('precss');
var clearfix = require('postcss-clearfix');
gulp.task('sass', function () {
  return gulp.src(path.css_src + '**/*.css')
    .pipe(plumber())
    .pipe(postcss([
        precss(),
        clearfix()
    ]))
    .pipe(gulp.dest(path.tmp + 'css/'));
 });

// rename
gulp.task('renamecss', function () {
  return gulp.src(path.tmp + 'css/all/import.css')
    .pipe(plumber())
    .pipe(rename('all.css'))
    .pipe(gulp.dest(path.tmp + 'css/'));
 });

// postcss
 var autoprefixer = require('autoprefixer');
 var cssnano = require('cssnano');
 gulp.task('postcss', function () {
  return gulp.src(path.tmp + 'css/*.css')
  .pipe(plumber())
  .pipe(postcss([
    autoprefixer ({
      browsers: ['last 2 version', 'ie >= 9'],
      cascade: false
     }),
    cssnano()
  ]))
  .pipe(gulp.dest(path.dist + 'css/'))
  .pipe(size({title:'size : css'}));
});


/*
 * js
 */
// concat
var concat = require('gulp-concat-util');
// lib
gulp.task('concat:lib', function () {
  return gulp.src([
    path.js_src + 'lib/jquery-1.12.1.min.js',
    path.js_src + 'lib/underscore-min.js'
  ])
    .pipe(plumber())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(path.dist + 'js/'));
});
// common
gulp.task('concat:common', function () {
  // js
  return gulp.src(path.js_src + 'all/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(concat.header([
    '(function(window, $, PROJECTNAMESPACE){',
    "  'use strict';",
    '  PROJECTNAMESPACE = PROJECTNAMESPACE || {};',
    '',
    ''
  ].join('\n')))
    .pipe(concat.footer([
    '',
    '',
    '})(window, jQuery, window.PROJECTNAMESPACE);'
  ].join('\n')))
    .pipe(gulp.dest(path.tmp + 'js/'));
});

// uglify
var uglify = require('gulp-uglify');
gulp.task('uglify', function () {
  return gulp.src(path.tmp + 'js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(size({title:'size : js'}));
});

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
  return gulp.src(path.js_src + 'all/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
var eslint = require('gulp-eslint');
gulp.task('eslint', function () {
  return gulp.src(path.js_src + 'all/*.js')
    .pipe(eslint('eslint-config-gnavi'));
});


/*
 * html
 */
// ejs
var ejs = require('gulp-ejs');
var minifyejs = require('gulp-minify-ejs');
gulp.task('ejs', function() {
  gulp.src(
      [
        path.html_src + 'html/**/*.ejs',
        '!' + path.html_src + 'html/include/**/*.ejs'
      ]
    )
    .pipe(plumber())
    .pipe(ejs(
      {
        data:{
          default: require('./' + path.html_src + 'data/common/default.json'),
          nav: require('./' + path.html_src + 'data/common/nav.json'),
          sample: require('./' + path.html_src + 'data/module/sample.json')
        }
      },
      {ext: '.html'}
    ))
    // minify
    //.pipe(minifyejs())
    .pipe(gulp.dest(path.dist + '/'))
    .pipe(size({title:'size : html'}));
});


/*
 * copy
 */
gulp.task('copy', function () {
  return gulp.src(
    [
      path.js_src + 'lib.js',
      path.img_src + '**/*'
    ],
    {base: path.src}
  )
  .pipe(plumber())
  .pipe(gulp.dest(path.dist))
  .pipe(size({title:'size : copy'}));
});

/*
 * server
 */
var browserSync = require('browser-sync');
gulp.task('serve', function () {
  gulpSequence('build')();
  browserSync({
    notify: false,
    server: {
      baseDir: path.dist
    }
  });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

/*
 * watch
 */
gulp.task('watch', ['serve'], function () {
  gulp.watch(path.css_src + '**/*.css', ['build:css']);
  gulp.watch(path.js_src + '**/*.js', ['build:js']);
  gulp.watch(path.src + 'ejs/**/*', ['build:html']);
  gulp.watch(path.img_src + '**/*.{png,jpg}', ['build:copy']);
  gulp.watch('gulpfile.js', ['build']);

  gulp.watch(path.dist + '**/*', ['bs-reload']);
});

/*
 * task manage
 */
// build:css
gulp.task('build:css', function () {
  gulpSequence('sass', 'renamecss', 'postcss')();
});

// build:js
gulp.task('build:js', function () {
  gulpSequence('concat', 'uglify', 'jshint')();
});
gulp.task('concat', function () {
  gulpSequence('concat:lib', 'concat:common')();
});

// build:html
gulp.task('build:html', function () {
  gulpSequence('ejs')();
});

// build:copy
gulp.task('build:copy', function () {
  gulpSequence('copy')();
});

// image optim
gulp.task('optim', function () {
  gulpSequence('imageOptim')();
});

// test
gulp.task('test', function () {
  gulpSequence('jshint', 'eslint')();
});

// build
gulp.task('build', function () {
  gulpSequence('build:css', 'build:js', 'build:html', 'build:copy')();
});

// default
gulp.task('default', function () {
  gulpSequence('build')();
});


/*
 * option task
 */
// start
gulp.task('start', function () {
  gulpSequence('clean', 'build', 'watch')();
});

// local
gulp.task('local', function () {
  gulpSequence('build')();
});

// dev
gulp.task('dev', function () {
  gulpSequence('build')();
});
