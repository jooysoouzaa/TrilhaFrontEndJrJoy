const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Para compilar SASS
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin'); // Para comprimir imagens
const replace = require('gulp-replace'); // Plugin para substituir strings
const uglify = require('gulp-uglify'); // Para comprimir JavaScript
const obfuscate = require('gulp-obfuscate'); // Para ofuscar JavaScript

// Função para compilar SASS
function compilaSass() {
    return gulp.src('./source/styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Função para comprimir imagens
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Tarefa para substituir URLs no HTML
function substituiUrls() {
    return gulp.src('./source/*.html') // Assumindo que seus arquivos HTML estão em source/
        .pipe(replace('ENDERECO_DO_CSS', './styles/style.css'))
        .pipe(replace('ENDERECO_DAS_IMAGENS', './images')) // Substituir ENDERECO_DAS_IMAGENS pelo caminho das imagens
        .pipe(replace('ENDERECO_DO_JS', './scripts/script.js')) // Substituir ENDERECO_DO_JS pelo script correto
        .pipe(gulp.dest('./build'));
}

// Função para comprimir e ofuscar JavaScript
function comprimeJs() {
    return gulp.src('./source/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/scripts'));
}

// Tarefa de build completa
gulp.task('build', gulp.series(compilaSass, comprimeImagens, substituiUrls, comprimeJs));

// Tarefa padrão (watch)
gulp.task('default', function () {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
    gulp.watch('./source/*.html', { ignoreInitial: false }, gulp.series(substituiUrls));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJs));
});
