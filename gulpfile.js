'use strict';

const PATHS = {
    src: {
        scss: './src/scss/main.scss'
    },
    build: {
        css: './src/css'
    }
};

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');

gulp.task('sass', function () {
    return gulp.src(PATHS.src.scss)
        .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(uglifycss({
            "cuteComments": true
        }))
        .pipe(sourcemap.write('./maps'))
        .pipe(gulp.dest(PATHS.build.css));
});