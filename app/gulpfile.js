var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

//Single file export all
gulp.task('min-css-export-single-file', function(cb){
    // create task
    gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('assets/css'))
    
    cb();
});

//Separate files export
gulp.task('min-css-export-all', function(cb){
    // create task
    gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('assets/css'))

    cb();
});

gulp.task('sass-export', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('src/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    // Other watchers
  })