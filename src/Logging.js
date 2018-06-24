/* global console */
const isFunction = (val) => typeof val === 'function';

const DEFAULT = ((...args) => `Logging [ ${args} ]`);

const logWrapper = (log) => {
	const wrapper =
		(isFunction(log) ? log : null) ||
		(() => log);
	return wrapper;
};


/**
* A logging utility.
* It passes the request received into all the statements, collects the results, and pushes them into console.log
* @param {...*} statements - any number of logging values.  Functions are called with the calling request, everything else is passed directly to
* @returns {function} a logging task
* @memberof aah
*/
const Logging = (...statements) => {
	statements = statements || [ DEFAULT ];
	statements = statements.map(logWrapper);

	return async (request) => {

		const logs = statements
			.map(s => s(request));

		console.log(...logs); // eslint-disable-line no-console

		return request;
	};
};

export default Logging;
