// Karma configuration
// Generated on Mon Mar 09 2015 15:08:56 GMT-0700 (PDT)

// Karma configuration

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jspm', 'jasmine'],
    browsers: ['Chrome'],
    reporters: ['progress', 'verbose', 'coverage'],
    singleRun: true,
    colors: true,
    files: [],
    jspm: {
      // Edit this to your needs
      config: 'src/system.config.js',
      loadFiles: ['spec/**/*.js'],
      serveFiles: [
        'dist/**/*',
        'jspm_packages/**/*.js',
        'jspm_packages/**/*.css'
      ]
    },

    proxies: {
      '/base/app': '/base/dist/app',
      '/base/common': '/base/dist/common',
      '/jspm_packages': '/base/jspm_packages'
    },

    // list of files to exclude
    exclude: [],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.js': ['babel', 'coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

  });
};