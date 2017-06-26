/**
 * gnavi-gulp-boiler-ejs-postcss
 * all.js - sample_a.js
 * Author: sekiya
 * ---------------------------------------------------------------------- */
/* globals Utility */

// sample A module
var sampleA = {
  init: function init() {
    Utility.console('A')
  }
}

// sample function
function sampleFunction1() {
  var hoge = '1'
  var huga = '2'
  return hoge + huga
}

// run
$(function run() {
  sampleA.init()
  sampleFunction1()
})
