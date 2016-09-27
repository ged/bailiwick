// Karma configuration
// Generated on Mon Feb 29 2016 12:59:33 GMT-0800 (PST)

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: [
			'jasmine',
			'jspm'
		],
		jspm: {
			loadFiles: [ 'spec/helpers', 'spec/**/*.js' ],
			serveFiles: [ 'dist/es6/**/*.js' ]
		},
		preprocessors: {},
		files: [],
		exclude: [],
		preprocessors: {},
		reporters: ['spec'],
		port: 9876,
		colors: true,
		// logLevel: config.LOG_INFO,
		logLevel: config.LOG_DEBUG,
		autoWatch: true,
		browsers: [
			'ChromeCanary'
		],
		singleRun: true,
		concurrency: Infinity
	})
}
