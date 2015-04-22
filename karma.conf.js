// Karma configuration
// Generated on Tue Apr 21 2015 17:57:48 GMT-0700 (PDT)

module.exports = function(config) {
	config.set({

		basePath: '',
		frameworks: ['jasmine', 'systemjs'],
		// plugins: ['karma-systemjs'],

		systemjs: {
			// Path to your SystemJS configuration file
			configFile: 'src/system.config.js',

			// File patterns for your application code, dependencies, and test suites
			// list of files / patterns to load in the browser
			files: [
				'src/**/*.js',
				'spec/**/*.spec.js'
			],

			// SystemJS configuration specifically for tests, added after your config file.
			// Good for adding test libraries and mock modules
			config: {
				paths: {
					// 'angular-mocks': 'bower_components/angular-mocks/angular-mocks.js'
				}
			},

			// Specify the suffix used for test suite file names.  Defaults to 
			// .test.js, .spec.js, _test.js, and _spec.js
			testFileSuffix: '.spec.js'
		},

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome', 'PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
};
