
const PassThrough = require('./PassThrough');

const InSeries = function (...tasks) {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {
		let index = 0;

		while (index < tasks.length) {
			request = await tasks[index](request);
			index++;
		}

		return request;
	};

};

module.exports = InSeries;
