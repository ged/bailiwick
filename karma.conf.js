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
			serveFiles: [ 'dist/amd/**/*.js' ]
		},
		preprocessors: {
			'spec/**/*.js': ['babel']
		},
		babelPreprocessor: {
			options: {
				sourceMap: 'inline',
				presets: [ 'stage-1' ],
				plugins: [ 'transform-decorators-legacy' ]
			}
		},
		files: [],
		exclude: [],
		preprocessors: {},
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['ChromeCanary'],
		singleRun: true,
		concurrency: Infinity
	})
}
