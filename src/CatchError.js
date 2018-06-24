
import PassThrough from './PassThrough';

/**
* ```javascript
*   let task = CatchError(task);
*
*   const { error, result } = await task(request);
* ```
*
* @name CatchError
* @param {function} task - an async function to wrap around with a catch wrapper.
* @returns {function} an async wrapper function around the task
* @memberof aah
*/
const CatchError = function (task) {
	task = task || PassThrough;

	return async function (request) {
		let result = undefined;
		let error = undefined;

		try {
			result = await task(request);
		} catch (e) {
			error = e;
		}

		return { result, error };
	};

};

export default CatchError;
