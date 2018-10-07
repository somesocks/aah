
const Delay = require('./Delay');
const InSeries = require('./InSeries');
const Race = require('./Race');
const PassThrough = require('./PassThrough');

const DEFAULT_ERROR_TASK = async function (request) {
	throw new Error('TimeOut error');
};

/**
* ```javascript
	const task1 = TimeOut( Delay(100), 1000);
	const task2 = TimeOut( Delay(1000), 100);

	const result1 = await task1(1); // result1 = 1, after 100 ms
	const result2 = await task2(1); // throws a timeout error after 100 ms
* ```
*
* @name TimeOut
* @param {function} task - an async tasks
* @param {function} timeOut - the number of ms before throwing an error
* @returns {function} an async task
* @memberof aah
*/
const TimeOut = function (task, timeOut) {
	task = task || PassThrough;
	timeOut = timeOut || 0;
	const timeOutTask = Delay(timeOut);
	const errorTask = DEFAULT_ERROR_TASK;

	return Race(
		task,
		InSeries(timeOutTask, errorTask)
	);
};

module.exports = TimeOut;
