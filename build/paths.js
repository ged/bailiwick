var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
	root: appRoot,
	source: appRoot + '**/*.js',
	index: 'index.html',
	html: appRoot + '**/*.html',
	style: appRoot + '**/*.css',
	themes: appRoot + '**/*.{eot,svg,ttf,woff,woff2,png}',
	config: appRoot + '**/*.json',
	output: outputRoot,
	sourceMapRelativePath: '../' + appRoot,
	docs:'./docs',
	semantic: './semantic',
	e2eSpecsSrc: 'test/e2e/src/*.js',
	e2eSpecsDist: 'test/e2e/dist/'
};
