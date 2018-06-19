const path = require('path');
const glob = require('glob');

const BASE_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(BASE_DIR, 'src');
const DIST_DIR = path.resolve(BASE_DIR, 'dist');

const BUNDLE = {};

// BUNDLE.mode = 'development';
BUNDLE.mode = 'production';

BUNDLE.entry = {
	'aah': path.resolve(SRC_DIR, 'index.js'),
};

BUNDLE.output = {
	path: DIST_DIR,
	filename: '[name].umd.js',
	libraryTarget: 'umd',
	globalObject: 'this',
};

BUNDLE.module = {
	rules: [
		{
			test: /.\.js$/,
			loader: 'babel-loader',
			include: BASE_DIR,
			exclude: /(node_modules|bower_components|prebuilt)/,
			query: {
				presets: [
					[ 'es2015', { 'modules': 'commonjs' } ],
				],
				plugins: [ 'transform-async-to-generator', 'transform-runtime' ],
				cacheDirectory: true,
			},
		},
	],
};

BUNDLE.resolve = {
	modules: [ SRC_DIR, BASE_DIR, 'node_modules' ],
	extensions: [ '.*', '.js' ],
};

BUNDLE.plugins = [];


module.exports = BUNDLE;
