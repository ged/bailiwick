var gulp        = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var babel       = require( 'gulp-babel' );
var sourcemaps  = require( 'gulp-sourcemaps' );

var paths           = require( '../paths' );

var assign = Object.assign || require( 'object.assign' );

var babelOptions = {
    presets: ["stage-1"],
    plugins: [
		"transform-decorators-legacy",
		"transform-runtime"
	]
}



gulp.task('build-es6', function () {
  return gulp.src(paths.source).
	pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-commonjs', function () {
  var plugins = babelOptions.plugins.concat('transform-es2015-modules-commonjs');
  return gulp.src(paths.source).
	pipe(sourcemaps.init()).
	pipe(babel(assign({}, babelOptions, {plugins: plugins}))).
	pipe(sourcemaps.write()).
	pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function () {
  var plugins = babelOptions.plugins.concat('transform-es2015-modules-amd');
  return gulp.src(paths.source).
	pipe(sourcemaps.init()).
	pipe(babel(assign({}, babelOptions, {plugins: plugins}))).
	pipe(sourcemaps.write()).
	pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-system', function () {
  var plugins = babelOptions.plugins.concat('transform-es2015-modules-systemjs');
  return gulp.src(paths.source).
	pipe(sourcemaps.init()).
	pipe(babel(assign({}, babelOptions, {plugins: plugins}))).
	pipe(sourcemaps.write()).
	pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    callback
  );
});
