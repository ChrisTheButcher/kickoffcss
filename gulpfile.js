const gulp = require('gulp')
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');

gulp.task('styles', ()=> gulp.src('./src/style.scss')
    .pipe(sass().on('error', sass.logError))    
    .pipe(prefix(['last 2 versions'], { cascade: true }))    
    .pipe(cleanCss({compatibility: 'ie8'}))    
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.write('./maps'))    
    .pipe(browserSync.stream()));

gulp.task('sync', ['watch'], ()=> browserSync({
    server: './',
    open: true
}))

gulp.task('watch', ['styles'], ()=> {
    gulp.watch('./src/**/*.scss', ['styles']);
    gulp.watch(['./**/*.html'], ()=> browserSync.reload());
});

gulp.task('default', ['sync']);