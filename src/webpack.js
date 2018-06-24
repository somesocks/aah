/* global __dirname */

const glob = require('glob');

const BUILDS = glob
	.sync(__dirname + '/**/webpack.*.js')
	.map((path) => require(path));

module.exports = BUILDS;
