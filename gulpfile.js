var config = {
    DEST_DIR: 'dist',
    scssPattern: 'scss/**/*.scss'
};

var gulp = require('gulp'),
    gutil = require('gulp-util'), //add-on functions
    sass = require('gulp-sass'), //compile sass files
    browserSync = require('browser-sync'), //live reload
    concat = require('gulp-concat'), //concatenation js files
    uglify = require('gulp-uglify'), //minimization
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    gulpImport = require('gulp-html-import'),
    fileinclude = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html');


//live reload
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: config.DEST_DIR
        },
        notify: false
    });
});

// Scss compile to css
gulp.task('scss', function () {
    return gulp.src(['src/scss/**/*.scss', '!src/scss/**/module.scss'])
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

// concatenation and minimization js files
gulp.task('js', function () {
    return gulp.src([
        'src/js/vendor/jquery-3.3.1.min.js',
        'src/js/common.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Html compile with html-fragments and copy to .dist
gulp.task('import', function () {
    gulp.src('./src/*.html')
        .pipe(gulpImport('./src/html_fragments/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browser-sync', 'removedist', 'scss', 'js', 'import', 'assets'], function () {
    gulp.watch('src/scss/**/*.scss', ['scss', browserSync.reload]);
    gulp.watch('src/**/*.html', ['import', browserSync.reload]);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch(['src/js/**/*.js', 'src/js/*.js'], ['js', browserSync.reload]);
});


gulp.task('imagemin', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('assets', function () {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
});

gulp.task('build', ['removedist', 'imagemin', 'scss', 'js', 'import', 'assets'], function () {
});


gulp.task('removedist', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
