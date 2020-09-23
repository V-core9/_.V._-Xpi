var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

//Single file export all
gulp.task('min-css-export-single-file', function(cb){
    // create task
    gulp.src('src/public/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../assets/public/css'))
    // create task
    gulp.src('src/application/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../assets/application/css'))
    // create task
    gulp.src('src/merchant/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../assets/merchant/css'))
    // create task
    gulp.src('src/admin/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../assets/admin/css'))
    
    cb();
});

//Separate files export
gulp.task('min-css-export-all', function(cb){
    // create task
    gulp.src('src/public/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('../assets/public/css'))

    gulp.src('src/application/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('../assets/application/css'))

    gulp.src('src/merchant/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('../assets/merchant/css'))

    gulp.src('src/admin/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('../assets/admin/css'))

    cb();
});

gulp.task('sass-export', function(cb){
  gulp.src('src/public/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/public/css'))
  gulp.src('src/application/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/application/css'))
    gulp.src('src/merchant/scss/*.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('src/merchant/css'))
  gulp.src('src/admin/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/admin/css'))

    cb();
});

gulp.task('watch', function(){
    gulp.watch('src/public/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('src/public/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    gulp.watch('src/application/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('src/application/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    gulp.watch('src/merchant/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('src/merchant/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    gulp.watch('src/admin/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('src/admin/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    // Other watchers
  })