/* eslint-env mocha */

const Vet = require('vet');
const { isFunction } = Vet;

const { Assert, InParallel, InSeries, Callbackify } = require('./');

const TestCase = require('./TestCase');

const Test1 = TestCase()
	.describe('Assert is a function')
	.execute(
		() => {
			if (!isFunction(Assert)) { throw new Error('Assert is not a function'); }
		}
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Test2 = TestCase()
	.describe('Assert works')
	.prepare(() => 0)
	.execute(
		InSeries(
			async (i) => i + 1,
			Assert((i) => i > 0),
			async (i) => i + 1
		)
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Test3 = TestCase()
	.describe('Assert throws an error correctly')
	.prepare(() => 0)
	.execute(
		InSeries(
			async (i) => i + 1,
			Assert((i) => i < 0),
			async (i) => i + 1
		)
	)
	.verify(
		TestCase.VerifyErrorWasThrown
	)
	.build();

const Tests = Callbackify(
	InParallel(
		Test1,
		Test2,
		Test3
	)
);

describe(
	'aah.Assert',
	() => {
		it('', Tests);
	}
)
