
const PassThrough = require('./PassThrough');

/**
* ```javascript
	const task = InOrder(
		async (i) => i + 1,
		async (i) => i + 1,
		async (i) => i + 1
	);

	const results = await task(0); // results is 3
* ```
*
* @name InOrder
* @param {...function} tasks - any number of async tasks.
* @returns {function} an async wrapper function that runs all of the tasks in order, calling each one with original request
* @memberof aah
*/
const InOrder = function (...tasks) {
	tasks = tasks || [];

	if (tasks.length === 0) { return PassThrough; }

	return async function (request) {
		let index = 0;

		while (index < tasks.length) {
			await tasks[index](request);
			index++;
		}

		return request;
	};

};

module.exports = InOrder;
