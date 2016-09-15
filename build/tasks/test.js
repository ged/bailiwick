var gulp  = require( 'gulp' );
var karma = require( 'karma' );

/**
* Run test once and exit
*/
gulp.task('test', ['build'], function (done) {
	var server = new karma.Server({
		configFile: __dirname + '/../../karma.conf.js',
		singleRun: true
	}, function(e) {
		done();
	});

	return server.start();
});
gulp.task('ci', ['build'], function (done) {
	var server = new karma.Server({
		configFile: __dirname + '/../../karma.conf.js',
		singleRun: true,
		browsers: ['phantomjs']
	}, function(e) {
		done();
	});

	return server.start();
});

/**
* Watch for file changes and re-run tests on each change
*/
gulp.task('tdd', ['build'], function (done) {
	var server = new karma.Server({
		configFile: __dirname + '/../../karma.conf.js'
	}, function(e) {
		done();
	});

	return server.start();
});

