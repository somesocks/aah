
/**
* ```javascript
	const task = PassThrough;

	const results = await task(0); // results is 0
* ```
*
* PassThrough does nothing, just passes the request through as the result
* @name PassThrough
* @memberof aah
*/
const PassThrough = async function (request) {
	return request;
};

module.exports = PassThrough;
