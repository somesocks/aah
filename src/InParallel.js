
const PassThrough = require('./PassThrough');

const InParallel = function (...tasks) {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {

		const results = await Promise.all(tasks.map(task => task(request)));

		return results;
	};

};

module.exports = InParallel;
