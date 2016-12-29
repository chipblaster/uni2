var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');



gulp.task('less', function() {
    return gulp.src('./css/design.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cleanCSS({ debug: true }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        //.pipe(csso())
        .pipe(gulp.dest('../wwwroot/assets/css'));
});

// Rerun the task when a file changes 
gulp.task('watch', ['less'], function() {
    gulp.watch('./css/bem/commons/*.less', ['less']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', function() {
    runSequence('less', function() {
        console.log('Run something else');
    });
});