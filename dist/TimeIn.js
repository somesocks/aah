
const Delay = require('./Delay');
const InSeries = require('./InSeries');
const InParallel = require('./InParallel');
const PassThrough = require('./PassThrough');

/**
* ```javascript
	const task = TimeIn(async (i) => i + 1, 1000);

	const result = await task(1); // result1 = 2, after 1000 ms
* ```
*
* @name TimeIn
* @param {function} task - an async task
* @param {function} timeIn - the minimum time the task can take
* @returns {function} an async task
* @memberof aah
*/
const TimeIn = function (task, timeIn) {
	task = task || PassThrough;
	timeIn = timeIn || 0;
	const timeInTask = Delay(timeIn);

	return InSeries(
		InParallel(task, timeInTask),
		([ res1, res2 ]) => res1
	)
};

module.exports = TimeIn;
