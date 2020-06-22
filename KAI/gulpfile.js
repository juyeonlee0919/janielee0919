const gulp = require('gulp');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const copy = require("gulp-copy");
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const clean = require('gulp-clean');
const html = require('gulp-file-include');
const del = require('del');
const makeDir = require('make-dir');
const debug = require('gulp-debug');
const open = require('gulp-open');
const watch = require('gulp-watch');
const replace = require('gulp-replace');
const htmlbeautify = require('gulp-html-beautify');
const cssImport = require('postcss-import');
const sprites = require('postcss-sprites');

gulp.task('distDel', function () {
    del('dist');
});
/*sprite TASK*/
// function sprite() {
//     del('src/img/sprite/sprite.png');
//     console.log('sprite를 시작합니다.')
//     var opts = {
//         spritePath: 'src/img/sprite'
//     };
//     var processors = [
//         sprites(opts)
//     ];
//     return gulp.src('src/pcss/style/sprite.pcss')
//         .pipe(postcss(processors))
//         // .pipe(rename({suffix: '.compile'}))
//         .pipe(
//             rename({extname: '.compile.pcss'})
//         )
//         .pipe(gulp.dest('src/pcss/style/'));
// }
// function sprite_copy() {
//     console.log('sprite를 카피합니다.')
//     return gulp.src('src/img/sprite/sprite.png')
//         .pipe(gulp.dest('dist/img/sprite/'));
// }
// gulp.task("spriteMake", gulp.series(sprite,sprite_copy));


/* pcss TASK*/
function pcss() {
    return gulp.src(['src/pcss/*/*.pcss'])
        .pipe(
            postcss([
                cssImport(),
                require('postcss-preset-env')({
                    stage: 0,
                    features: {
                        'nesting-rules': true
                    }
                })
            ])
        )
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest('dist/css/'))
}

function htmlInclude() {
    let source = 'src/html/include/*.html';
    return gulp.src(source)
        .pipe(html())
        .pipe(gulp.dest('dist/html/include'))
}

function htmlPage() {
    let source = 'src/html/*/*.html';
    return gulp.src(source)
        .pipe(html())
        .pipe(gulp.dest('dist/html/'))
}

function copyImg() {
    return gulp.src('src/img/**/**')
        .pipe(gulp.dest('dist/img'));
}

function copyFonts() {
    return gulp.src('src/fonts/**/**')
        .pipe(gulp.dest('dist/fonts'));
}


function jsLib() {
    let sourceLib = [
        'src/js/lib/jquery.js',
        'src/js/lib/bootstrap.js',
        'src/js/lib/jquery.sticky.js',
    ];
    return gulp.src(sourceLib)
        .pipe(concat('front.lib.js'))
        .pipe(gulp.dest('dist/js/lib'))
}

function jsCommon() {
    let sourceUi = ['src/js/ui/*.js'];
    return gulp.src(sourceUi)
        .pipe(concat('front.common.js'))
        .pipe(gulp.dest('dist/js/ui'))
}

gulp.task("release", gulp.series(pcss, copyImg, copyFonts, jsLib, jsCommon, htmlInclude, htmlPage));

function watchPcss() {
    gulp.watch('src/pcss/*/*/*.pcss', gulp.series(pcss));
}

function watchHtml() {
    gulp.watch(['src/html/pages/*.html'], gulp.series(htmlPage));
}

function watchInclue() {
    gulp.watch('src/html/*/*.html', gulp.series(htmlInclude, htmlPage));
}

function watchJs() {
    gulp.watch('src/js/*/*.js', gulp.series(jsLib, jsCommon));
}

gulp.task("watchCss", watchPcss);
gulp.task("watchHtml", watchHtml);
gulp.task("watchInclude", watchInclue);
gulp.task("watchJs", watchJs);


gulp.task('htmlbeautify', function () {
    var options = {
        indentSize: 4
    }
    gulp.src('./dist/**/*.html')
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('./dist/'))
});
