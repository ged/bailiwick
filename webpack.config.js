/* -*- javascript -*- */
"use strict";

var webpack        = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path           = require('path');
var env            = require('yargs').argv.mode;

var libraryName = 'bailiwick';
var plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({ minimize: true }));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: __dirname + '/src/index.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /(\.js)$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /(\.js)$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	plugins: plugins,
	externals: {
		"bluebird": {
			commonjs: "bluebird",
			commonjs2: "bluebird",
			amd: "bluebird",
			root: "Promise"
		},
		"inflection": "inflection",
		"es6-error": "es6-error"
	}
};

module.exports = config;

