const gulp = require('gulp');

const shell = require('gulp-shell');

gulp.task(
	'build-docs',
	shell.task(
		`(export NODE_PATH=./; find ./src -name '*.js' |sort -t'/' -k2.2 -k2.1 | xargs jsdoc2md --param-list-format list --separators  --template README.hbs --files ) > README.md`
	)
);

gulp.task(
	'build',
	'build aah',
	[ 'build-docs' ],
	shell.task('webpack --config ./src/webpack.js')
);
