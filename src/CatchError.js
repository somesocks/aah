
const PassThrough = require('./PassThrough');

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

module.exports = CatchError;
