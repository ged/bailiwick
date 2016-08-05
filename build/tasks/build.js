var gulp        = require( 'gulp' );
var gutil       = require( 'gulp-util' );
var debug       = require( 'gulp-debug' );
var runSequence = require( 'run-sequence' );
var changed     = require( 'gulp-changed' );
var plumber     = require( 'gulp-plumber' );
var babel       = require( 'gulp-babel' );
var sourcemaps  = require( 'gulp-sourcemaps' );
var assign      = Object.assign || require( 'object.assign' );
var prefixer    = require( 'gulp-autoprefixer' );
var concat      = require( "gulp-concat" );
var debug       = require( 'gulp-debug' );
var notify      = require( 'gulp-notify' );

var paths = require( '../paths' );
var compilerOptions = require( '../babel-options' );

var plumberErrorHandler = {
	errorHandler: function(err) {
		gutil.log( err );
		notify.onError( 'Error: <%= error.message %>' );
	}
};

gulp.task('build-system', function() {
	return gulp.src( paths.source ).
		pipe( plumber(plumberErrorHandler) ).
		pipe( changed(paths.output, {extension: '.js'}) ).
		pipe( sourcemaps.init({loadMaps: true}) ).
		pipe( debug({title: 'build-system'}) ).
		pipe( babel(assign({}, compilerOptions.system())) ).
		pipe( sourcemaps.write({includeContent: false, sourceRoot: '/lib'}) ).
		pipe( gulp.dest(paths.output + '/system') );
});

gulp.task('build-es6', function() {
	return gulp.src( paths.source ).
		pipe( plumber(plumberErrorHandler) ).
		pipe( debug({title: 'build-es6'}) ).
		pipe( gulp.dest(paths.output + '/es6') );
});

gulp.task('build-amd', function() {
	return gulp.src( paths.source ).
		pipe( plumber(plumberErrorHandler) ).
		pipe( changed(paths.output, {extension: '.js'}) ).
		pipe( sourcemaps.init({loadMaps: true}) ).
		pipe( debug({title: 'build-amd'}) ).
		pipe( babel(assign({}, compilerOptions.amd())) ).
		pipe( sourcemaps.write({includeContent: false, sourceRoot: '/lib'}) ).
		pipe( gulp.dest(paths.output + '/amd') );
});

gulp.task('build', function(callback) {
	return runSequence(
		'clean',
		['build-system', 'build-es6'],
		callback
	);
});
