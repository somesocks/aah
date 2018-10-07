/* eslint-env mocha */

const Vet = require('vet');
const { isFunction } = Vet;

const { Assert, InParallel, InSeries, Callbackify, Promisify } = require('./');

const TestCase = require('./TestCase');

const Test1 = TestCase()
	.describe('Callbackify is a function')
	.execute(
		() => {
			if (!isFunction(Callbackify)) { throw new Error('Callbackify is not a function'); }
		}
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Test2 = TestCase()
	.describe('Callbackify works')
	.prepare(() => 0)
	.execute(
		InSeries(
			async (i) => i + 1,
			Promisify(Callbackify(async (i) => i + 1))
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
	'aah.Callbackify',
	() => {
		it('', Tests);
	}
)
