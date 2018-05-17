//this file is more for example app....extract widget app bits later in a separate file
var gulp = require('gulp');
var html2js = require('gulp-html2js');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var styleInject = require('gulp-style-inject');


var SOURCEPATHS = {
    htmlSource : 'src/index.html',
    htmlPartialSource : 'src/dynaform/templates/*.html',
    cssSource : 'src/dynaform/css/*.css',
    jsSource : 'src/**/*.js',
    jsonSource: 'src/*.json'
}

gulp.task('html', function(){
    return gulp.src('src/dynaform/templates/*.html')
       .pipe(styleInject())
        .pipe(html2js('temp.js', {
            adapter: 'angular',
            base: 'src/dynaform/templates',
            name: 'widgetApp'
        }))
        .pipe(gulp.dest('dist/js'));

});


gulp.task('js', ['html'],function(){
    return gulp.src(['node_modules/moment/moment.js',
        'node_modules/angular-moment/angular-moment.min.js',
        'src/dynaform/**/*.js','dist/js/temp.js'])
        .pipe(concat('dynaForm.min.js'))
        .pipe(gulp.dest('dist/js'))
});


gulp.task('serve', function() {
    var files = [
        '*.html'
    ];

    browserSync.init(files,{
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('reload',function () {
    reload() ;
});

gulp.task('watch', [ 'serve', 'js', 'html'], function() {
    gulp.watch([SOURCEPATHS.htmlSource,SOURCEPATHS.jsonSource], [ 'reload']);
    gulp.watch([SOURCEPATHS.htmlPartialSource,SOURCEPATHS.cssSource], ['html','js', 'reload']);
    gulp.watch([SOURCEPATHS.jsSource], ['js','reload']);

});
gulp.task('default', ['watch']);
