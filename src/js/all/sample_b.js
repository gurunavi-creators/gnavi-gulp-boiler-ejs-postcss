/**
 * gnavi-gulp-boiler-ejs-postcss
 * all.js - sample_b.js
 * Author: sekiya
 * ---------------------------------------------------------------------- */
/* globals Utility */

// sample B module
var sampleB = {
  init: function init() {
    Utility.console('B')
  }
}

// sample function
function sampleFunction2() {
  var hoge = '1'
  var huga = '2'
  return hoge + huga
}

// run
$(function run() {
  sampleB.init()
  sampleFunction2()
})
