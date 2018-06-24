module.exports = {
	parser: "babel-eslint",
	extends: "esnext",
	rules: {
		'import/no-commonjs': ['off'],
		'import/no-namespace': ['warn'],
		'no-unused-vars': ['warn'],
		'prefer-arrow-callback': ['warn'],
	},
};
