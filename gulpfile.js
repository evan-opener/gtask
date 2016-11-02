'user strict';

var gulp = require('gulp'),
    _ = require('lodash'),
    runSequence = require('run-sequence'),
    nodemon = require('gulp-nodemon'),
    path = require('path');
/*  some plugins not use
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins({
      rename: {
        'gulp-angular-templatecache': 'templateCache'
      }
    });
*/

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
  });
});

gulp.task('default', function (done) {
  runSequence('env:dev', ['start']);
});
