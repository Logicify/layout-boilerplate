var config = {
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
            baseDir: 'dist'
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
        .pipe(browserSync.reload({stream: true}))
});

// concatenation and minimization js files
gulp.task('js', function () {
    return gulp.src([
        'src/libs/jquery/dist/jquery-3.3.1.min.js',
        'src/js/common.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Html compile with html-fragments and copy to .dist
gulp.task('import', function () {
    gulp.src('./src/*.html')
        .pipe(gulpImport('./src/html_fragments/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scss', 'js', 'browser-sync', 'import'], function () {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**/*.html', ['import']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
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

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('build', ['removedist', 'imagemin', 'scss', 'js', 'import', 'fonts'], function () {
});


gulp.task('removedist', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
