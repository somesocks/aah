/* eslint-env mocha */

const Vet = require('vet');
const { isFunction } = Vet;

const { Assert, InParallel, InSeries, ParallelFilter, Callbackify } = require('./');

const TestCase = require('./TestCase');

const Test1 = TestCase()
	.describe('ParallelFilter is a function')
	.execute(
		() => {
			if (!isFunction(ParallelFilter)) { throw new Error('ParallelFilter is not a function'); }
		}
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Test2 = TestCase()
	.describe('ParallelFilter works')
	.prepare(() => 0)
	.execute(
		InSeries(
			InParallel(
				() => 1,
				() => 2,
				() => 3,
				() => 4,
			),
			ParallelFilter((val) => val % 2 === 0),
		)
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown,
		Assert(
			({ result }) => Array.isArray(result),
			({ result }) => `result is not array`
		),
		Assert(
			({ result }) => result.length === 2,
			({ result }) => `result has wrong length`
		),
		Assert(
			({ result }) => result[0] === 2,
			({ result }) => `result[0] invalid`
		),
		Assert(
			({ result }) => result[1] === 4,
			({ result }) => `result[1] invalid`
		),
	)
	.build();

const Tests = Callbackify(
	InParallel(
		Test1,
		Test2
	)
);

describe(
	'aah.ParallelFilter',
	() => {
		it('', Tests);
	}
)
