const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

// Função para comprimir imagens
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Função para compilar SASS
function compilaSass() {
    return gulp.src('./source/styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Função para copiar arquivos HTML
function copiaHtml() {
    return gulp.src('./source/*.html')
        .pipe(gulp.dest('./build'));
}

// Tarefa de build para Vercel
gulp.task('build', gulp.parallel(compilaSass, comprimeImagens, copiaHtml));

exports.default = function () {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
    gulp.watch('./source/*.html', { ignoreInitial: false }, gulp.series(copiaHtml));
}
