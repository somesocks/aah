
/**
* ```javascript
	const task = Promisify(
		(onDone, i) => onDone(
			i === 0 ? new Error('i cant be 0') : null,
			i + 1
		),
	);

	const results = await task(1); // results is 2
	const results2 = await taks(0); // throws 'i cant be 0 Error
* ```
*
* @name Promisify
* @param {function} task - a callback-expecting function
* @returns {function} an async function
* @memberof aah
*/
const Promisify = function (task) {

	return function (request) {

		const handler = (resolve, reject) => {
			const callback = (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			};

			try {
				task(callback, request);
			} catch (err) {
				reject(err);
			}
		};

		return new Promise(handler);
	};
};

module.exports = Promisify;
