var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require("vinyl-source-stream"),
	rename = require("gulp-rename"),
	watch = require('gulp-watch'),
	connect = require('gulp-connect'),
	watchify = require('watchify'),
	livereload = require('gulp-livereload'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  sourcemaps = require('gulp-sourcemaps'),
  autoPrefixLess = require('less-plugin-autoprefix'),
  minifyCSS = require('gulp-minify-css'),
  markdown = require('gulp-markdown'),
  autoprefix = new autoPrefixLess({browsers: ["last 2 versions"]}),
  less = require('gulp-less'),
  mochify = require('mochify');

gulp.task('server', function() {
  connect.server({
  	root : 'app',
  	port : 3333,
  	livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
  .pipe(connect.reload())
  .pipe(livereload())
  .pipe(plumber());
});

gulp.task('browserify', function(){
  browserifyShare();
});

function browserifyShare() {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  b = watchify(b);
  
  b.on('update', function(){
    bundleShare(b);
  });

  b.add('./src/javascripts/bundle.js');
  bundleShare(b);
}

function bundleShare(b){
  b.bundle()
  .pipe(source('./script.js'))
  .pipe(streamify(sourcemaps.init()))
  .pipe(streamify(uglify()))
  .pipe(streamify(sourcemaps.write()))
  .pipe(gulp.dest('./app/js'))
  .pipe(livereload())
  .pipe(connect.reload());
}


gulp.task('test', function(){
  var a = mochify('./test/*.js', {
    reporter : 'spec',
    watch: true
  }).bundle();
});


gulp.task('less', ['html'], function () {
  gulp.src('./src/less/main.less')
    .pipe(rename('style.css'))
    .pipe(less({
      plugins : autoprefix
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./app/css'));
});


gulp.task('markdown', ['html'], function () {
    return gulp.src('readme.md')
        .pipe(markdown())
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['browserify'], function() {
  //gulp.watch(['./*.md'],['markdown','html']);
	gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./src/less/*.less'], ['less', 'html']);
  //gulp.watch(['./*.md'],['markdown']);
});


gulp.task('default', ["server", "watch", "less"]);
