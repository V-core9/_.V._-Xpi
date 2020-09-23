var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

//Single file export all
gulp.task('min-css-export-single-file', function(cb){
    // create task
    gulp.src('app_dev/src/public/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app/assets/public/css'))
    // create task
    gulp.src('app_dev/src/application/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app/assets/application/css'))
    // create task
    gulp.src('app_dev/src/merchant/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app/assets/merchant/css'))
    // create task
    gulp.src('app_dev/src/admin/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app/assets/admin/css'))
    
    cb();
});

//Separate files export
gulp.task('min-css-export-all', function(cb){
    // create task
    gulp.src('app_dev/src/public/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('app/assets/public/css'))

    gulp.src('app_dev/src/application/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('app/assets/application/css'))

    gulp.src('app_dev/src/merchant/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('app/assets/merchant/css'))

    gulp.src('app_dev/src/admin/css/*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename(function (path) {
        // Updates the object in-place
        path.basename += "";
        path.extname = ".min.css";
      }))
    .pipe(gulp.dest('app/assets/admin/css'))

    cb();
});

gulp.task('sass-export', function(cb){
  gulp.src('app_dev/src/public/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app_dev/src/public/css'))
  gulp.src('app_dev/src/application/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app_dev/src/application/css'))
    gulp.src('app_dev/src/merchant/scss/*.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('app_dev/src/merchant/css'))
  gulp.src('app_dev/src/admin/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app_dev/src/admin/css'))

    cb();
});

gulp.task('watch', function(){
    gulp.watch('app_dev/src/public/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('app_dev/src/public/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    gulp.watch('app_dev/src/application/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('app_dev/src/application/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    gulp.watch('app_dev/src/merchant/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('app_dev/src/merchant/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    gulp.watch('app_dev/src/admin/scss/*.scss', gulp.series(['sass-export'])); 
    gulp.watch('app_dev/src/admin/css/*.css', gulp.series(['min-css-export-all','min-css-export-single-file'])); 
    // Other watchers
  })


gulp.task('copy', function (cb) {
  gulp.src(['node_modules/@fortawesome/**/*','node_modules/bootstrap/**/*','node_modules/bootstrap-colorpicker/**/*','node_modules/sweetalert2/**/*','node_modules/toastr/**/*','node_modules/popper.js/**/*','node_modules/jquery/**/*'], {base: '.'}).pipe(gulp.dest('app/assets'));

  cb();
});