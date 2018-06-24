
const isFunction = (val) => typeof val === 'function';

const nop = () => false;

const errorWrapper = (log) => {
	const wrapper =
		(isFunction(log) ? log : null) ||
		(() => log);
	return wrapper;
};


/**
* Builds an async assertion task.  When called, if the arguments do not match the validator functions,
* @param {function} validator - a function that checks the request.
* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
* @returns {taskFunction} an assertion task
* @memberof uchain
*/
const Assert = (validator, message) => {
	validator = validator || nop;
	message = message || 'assert failed';
	message = errorWrapper(message);

	return async function (request) {
		if(!validator(request)) {
			throw new Error(message(request));
		}

		return request;
	};
};

export default Assert;
