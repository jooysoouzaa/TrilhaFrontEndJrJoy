const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Para compilar SASS
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin'); // Para comprimir imagens
const replace = require('gulp-replace'); // Plugin para substituir strings

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
        .pipe(gulp.dest('./build'));
}

// Tarefa de build completa
gulp.task('build', gulp.series(compilaSass, comprimeImagens, substituiUrls));

// Tarefa padrão (watch)
gulp.task('default', function () {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
    gulp.watch('./source/*.html', { ignoreInitial: false }, gulp.series(substituiUrls));
});
