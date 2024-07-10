const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Comprimir SASS
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin'); // Comprimir imagens

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function compilaSass() {
    return gulp.src('./source/styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

//Tarefa de build para Vercel
gulp.task('build', gulp.parallel(compilaSass, comprimeImagens));


exports.default = function () {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
};
