/* eslint-env mocha */

const Vet = require('vet');
const { isFunction } = Vet;

const { Assert, InParallel, InSeries, Delay, Callbackify, Promisify } = require('./');

const TestCase = require('./TestCase');

const Test1 = TestCase()
	.describe('Delay is a function')
	.execute(
		() => {
			if (!isFunction(Delay)) { throw new Error('Delay is not a function'); }
		}
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Test2 = TestCase()
	.describe('Delay works')
	.prepare(() => 0)
	.execute(
		InSeries(
			async (i) => i + 1,
			Delay(100),
		)
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Tests = Callbackify(
	InParallel(
		Test1,
		Test2,
	)
);

describe(
	'aah.Delay',
	() => {
		it('', Tests);
	}
)
