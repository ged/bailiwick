// Karma configuration
// Generated on Tue Apr 21 2015 17:57:48 GMT-0700 (PDT)

module.exports = function(config) {
	config.set({

		basePath: '',
		frameworks: ['jspm', 'jasmine'],

		jspm: {
			// Edit this to your needs
			loadFiles: [
				'jspm_packages/npm/babel-core@5.1.13/browser-polyfill.js',
				'spec/**/*.spec.js'
			],
			serveFiles : ['src/**/*.js']
		},

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'spec/**/*.spec.js': ['babel'],
			'src/**/*.js': ['babel']
		},
		'babelPreprocessor': {
			options: {
				sourceMap: 'inline',
				modules: 'system',
				moduleIds: false,
				optional: [
					"es7.decorators"
				]
			}
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['dots', 'story'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		client: {
			captureConsole: true
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [
			// 'PhantomJS',
			'Chrome'
		],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
