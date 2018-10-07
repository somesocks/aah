/* global setTimeout */

/**
* ```javascript
	const task = Delay(1000);

	const result = await task(1); // result is 1, after 1 second
* ```
*
* @name Delay
* @param {number} time - the time to delay
* @returns {function} an async function
* @memberof aah
*/
const Delay = function (time) {
	time = time || 0;

	return function (request) {
		const delayHandler = function (resolve, reject) {
			setTimeout(function () { resolve(request); }, time);
		};

		return new Promise(delayHandler);
	};
};

module.exports = Delay;
