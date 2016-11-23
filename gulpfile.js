"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var config = {
    port: 9005,
    devBaseUrl: 'http:localhost',
    paths: {
        root: './',
        dist: './dist',
        js:'./js/*.js',
        index: './js/index.js'
    }
};

// Start a local dev server
gulp.task('connect', function() {
    connect.server({
        root: config.paths.root,
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

// open in browser
gulp.task('open', ['connect'], function() {
    gulp.src('./index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

// js files bundle
gulp.task('js-bundle', function() {
    browserify(config.paths.index)
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

// jshint task
gulp.task('jshint', function() {
    return gulp.src(config.paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// watch for file changes
gulp.task('watch', function() {
    gulp.watch(config.paths.js, ['js-bundle', 'jshint']);
});

// default task
gulp.task('default', ['js-bundle', 'jshint', 'open', 'watch']);
