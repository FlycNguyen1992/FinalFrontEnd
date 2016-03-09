var gulp = require('gulp');
var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();
gulp.task('hello', function() {
  console.log('Hello Zell');
});
gulp.task('sass', function(){
  return gulp.src('scss/y.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('newcss'))
});
gulp.task('watch',function(){
    gulp.watch('scss/**/*.scss',['sass']);
})
