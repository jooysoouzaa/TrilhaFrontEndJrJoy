const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); //Comprimir SASS
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin'); // Comprimir imagens

function comprimeImagens() { //Comprimir imagens

    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}


function compilaSass() { //Comprimir SASS
    return gulp.src('./source/styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function () {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
}

//Basta executar no terminal "npm run gulp"
//Colocar a pasta build e node_modules dentro do arquivo .gitignore