/* globals console */

const { Assert, CatchError, InSeries, InOrder, Logging } = require('./');

const _defaultSetup = () => ({});

const _defaultPrepare = () => {};

const _defaultExecute = () => {};

const _defaultVerify = Assert(
	({ error }) => error === undefined
);

const _defaultTeardown = () => {};

function TestCase () {
	const self = this instanceof TestCase ? this : Object.create(TestCase.prototype);

	self._description = '';
	self._setupTask = _defaultSetup;
	self._prepareTask = _defaultPrepare;
	self._executeTask = _defaultExecute;
	self._verifyTasks = [ _defaultVerify ];
	self._teardownTask = _defaultTeardown;

	return self;
}

TestCase.prototype.describe = function describe(desc) {
	this._description = desc;
	return this;
};

TestCase.prototype.setup = function setup(task) {
	this._setupTask = task;
	return this;
};

TestCase.prototype.prepare = function prepare(task) {
	this._prepareTask = task;
	return this;
};

TestCase.prototype.execute = function execute(task) {
	this._executeTask = task;
	return this;
};

TestCase.prototype.verify = function verify(...tasks) {
	this._verifyTasks = tasks;
	return this;
};

TestCase.prototype.teardown = function teardown(task) {
	this._teardownTask = task;
	return this;
};

TestCase.prototype.build = function build() {
	const {
		_description,
		_setupTask,
		_prepareTask,
		_executeTask,
		_verifyTasks,
		_teardownTask,
	} = this;

	const _setupWrapper = async (context) => {
		context.setup = await _setupTask();
		return context;
	};

	const _prepareWrapper = async (context) => {
		context.request = await _prepareTask(context);
		return context;
	};

	const _executeWrapper = async (context) => {
		const { error, result } = await CatchError(_executeTask)(context.request);
		context.error = error;
		context.result = result;
		return context;
	};

	const _verifyWrapper = InOrder(..._verifyTasks);

	const _teardownWrapper = _teardownTask;

	const test = CatchError(
		InOrder(
			_setupWrapper,
			_prepareWrapper,
			_executeWrapper,
			_verifyWrapper,
			_teardownWrapper
		)
	);

	const testWrapper = async () => {
		const context = {};
		const { error, result } = await test(context);
		if (error) {
			//eslint-disable-next-line no-console
			console.error(`✕ - ${_description} - ${error}`);
			throw error;
		} else {
			//eslint-disable-next-line no-console
			console.log(`✓ - ${_description}`);
			return;
		}
	};

	return testWrapper;
};

TestCase.VerifyErrorWasNotThrown = Assert(
	(test) => test.error === undefined,
	(test) => `TestCase.VerifyErrorWasNotThrown: error was thrown ${test.error.message}`
);

TestCase.VerifyErrorWasThrown = Assert(
	(test) => test.error !== undefined,
	`TestCase.VerifyErrorWasThrown: error was not thrown`
);


module.exports = TestCase;
