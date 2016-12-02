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
			serveFiles: [ 'dist/es6/**/*.js' ],
			paths: {
				'*': 'src/*',
				'spec/*': 'spec/*',
				'github:*': 'jspm_packages/github/*',
				'npm:*': 'jspm_packages/npm/*'
			}
		},
		preprocessors: {
			'test/**/*.js': ['babel'],
			'src/**/*.js': ['babel']
		},
		'babelPreprocessor': {
			options: {
				sourceMap: 'inline',
				presets: [ ['es2015', { loose: true }], 'stage-1'],
				plugins: [
					'syntax-flow',
					'transform-decorators-legacy',
					'transform-flow-strip-types',
					[ 'istanbul', { 'ignore': 'test/' } ]
				]
			}
		},
		files: [],
		exclude: [],
		preprocessors: {},
		reporters: ['spec'],
		port: 9876,
		colors: true,
    logLevel: config.LOG_INFO,
    // logLevel: config.LOG_DEBUG,
		autoWatch: true,
		browsers: [
			'ChromeCanary'
		],
		singleRun: true,
		concurrency: Infinity
	})
}
