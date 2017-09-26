/* eslint-env node */
/**
 * gnavi-gulp-boiler-ejs-postcss
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
 * ** eslintコマンド
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
var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var size = require('gulp-size')
var postcss = require('gulp-postcss')
var spritesmith = require('gulp.spritesmith')
var imageOptim = require('gulp-imageoptim')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var concat = require('gulp-concat-util')
var eslint = require('gulp-eslint')
var ejs = require('gulp-ejs')
// var minifyejs = require('gulp-minify-ejs')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync')


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
}


/*
 * clean
 */
var clean = require('del')
gulp.task('clean', function gulpClean() {
  clean(path.tmp)
  clean(path.dist)
})


/*
 * sprite
 */
gulp.task('sprite', function gulpSprite() {
  var spriteData = gulp.src(path.sprite_src + 'sprite-sample/*.png')
    .pipe(spritesmith({
      imgName: 'sprite-sample.png',
      cssName: 'sprite-sample.css',
      imgPath: '../img/sprite-sample.png',
      cssFormat: 'css',
      padding: 5,
      cssOpts: {
        cssSelector: function cssSelector(sprite) {
          return '@define-extend icon--' + sprite.name
        }
      }
    }))
  spriteData.img.pipe(gulp.dest(path.img_src))
  spriteData.css.pipe(gulp.dest(path.css_src + 'all/module/'))
    .pipe(size({ title: 'size : sprite' }))
})

/*
 * image optim
 */
gulp.task('imageOptim', function gulpImageOptim() {
  return gulp.src(path.img_src + '**/*')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest(path.img_src))
})


/*
 * postcss
 */
// precss(scss like)
gulp.task('sass', function gulpSass() {
  return gulp.src(path.css_src + '**/*.css')
    .pipe(plumber())
    .pipe(postcss([
      precss()
    ]))
    .pipe(gulp.dest(path.tmp + 'css/'))
})

// rename
gulp.task('renamecss', function gulpRnameCss() {
  return gulp.src(path.tmp + 'css/all/import.css')
    .pipe(plumber())
    .pipe(rename('all.css'))
    .pipe(gulp.dest(path.tmp + 'css/'))
})

// postcss
gulp.task('postcss', function gulpPostCss() {
  return gulp.src(path.tmp + 'css/*.css')
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version', 'ie >= 9'],
        cascade: false
      }),
      cssnano({
        minifyFontValues: {
          removeQuotes: false
        }
      })
    ]))
    .pipe(gulp.dest(path.dist + 'css/'))
    .pipe(size({ title: 'size : css' }))
})


/*
 * js
 */
// concat
// lib
gulp.task('concat:lib', function gulpConcatLib() {
  return gulp.src([
    path.js_src + 'lib/jquery-1.12.1.min.js',
    path.js_src + 'lib/underscore-min.js'
  ])
    .pipe(plumber())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(path.dist + 'js/'))
})
// common
gulp.task('concat:common', function gulpConcatCommon() {
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
    .pipe(gulp.dest(path.tmp + 'js/'))
})

// uglify
gulp.task('uglify', function gulpUglify() {
  return gulp.src(path.tmp + 'js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(size({ title: 'size : js' }))
})

// eslint
gulp.task('eslint', function gulpEslint() {
  return gulp.src(path.js_src + 'all/*.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})


/*
 * html
 */
// ejs
gulp.task('ejs', function gulpEjs() {
  gulp.src(
    [
      path.html_src + 'html/**/*.ejs',
      '!' + path.html_src + 'html/include/**/*.ejs'
    ]
  )
    .pipe(plumber())
    .pipe(ejs(
      {
        data: {
          default: require('./' + path.html_src + 'data/common/default.json'),
          nav: require('./' + path.html_src + 'data/common/nav.json'),
          sample: require('./' + path.html_src + 'data/module/sample.json')
        }
      },
      { ext: '.html' }
    ))
    // minify
    // .pipe(minifyejs())
    .pipe(gulp.dest(path.dist + '/'))
    .pipe(size({ title: 'size : html' }))
})


/*
 * copy
 */
gulp.task('copy', function gulpCopy() {
  return gulp.src(
    [
      path.js_src + 'lib.js',
      path.img_src + '**/*'
    ],
    { base: path.src }
  )
    .pipe(plumber())
    .pipe(gulp.dest(path.dist))
    .pipe(size({ title: 'size : copy' }))
})

/*
 * server
 */
gulp.task('serve', function gulpServe() {
  browserSync({
    notify: false,
    server: {
      baseDir: path.dist
    }
  })
})

gulp.task('bs-reload', function gulpBsReload() {
  browserSync.reload()
})

/*
 * watch
 */
gulp.task('watch', ['serve'], function gulpWatch() {
  gulp.watch(path.css_src + '**/*.css', ['build:css'])
  gulp.watch(path.js_src + '**/*.js', ['build:js'])
  gulp.watch(path.src + 'ejs/**/*', ['build:html'])
  gulp.watch(path.img_src + '**/*.{png,jpg}', ['build:copy'])
  gulp.watch('gulpfile.js', ['build'])

  gulp.watch(path.dist + '**/*', ['bs-reload'])
})

/*
 * task manage
 */
// build:css
gulp.task('build:css', function gulpBuildCss() {
  gulpSequence('sass', 'renamecss', 'postcss')()
})

// build:js
gulp.task('build:js', function gulpBuildJs() {
  gulpSequence('concat', 'uglify', 'eslint')()
})
gulp.task('concat', function gulpConcat() {
  gulpSequence('concat:lib', 'concat:common')()
})

// build:html
gulp.task('build:html', function gulpBuildHtml() {
  gulpSequence('ejs')()
})

// build:copy
gulp.task('build:copy', function gulpBuildCopy() {
  gulpSequence('copy')()
})

// image optim
gulp.task('optim', function gulpOptim() {
  gulpSequence('imageOptim')()
})

// test
gulp.task('test', function gulpTest() {
  gulpSequence('eslint')()
})

// build
gulp.task('build', function gulpBuild() {
  gulpSequence('build:css', 'build:js', 'build:html', 'build:copy')()
})

// default
gulp.task('default', function gulpDefault() {
  gulpSequence('build')()
})


/*
 * option task
 */
// start
gulp.task('start', function gulpStart() {
  gulpSequence('clean', 'build', 'watch')()
})

// local
gulp.task('local', function gulpLocal() {
  gulpSequence('build')()
})

// dev
gulp.task('dev', function gulpDev() {
  gulpSequence('build')()
})
