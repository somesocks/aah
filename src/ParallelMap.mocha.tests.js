/* eslint-env mocha */

const Vet = require('vet');
const { isFunction } = Vet;

const { Assert, InParallel, InSeries, ParallelMap, Callbackify } = require('./');

const TestCase = require('./TestCase');

const Test1 = TestCase()
	.describe('ParallelMap is a function')
	.execute(
		() => {
			if (!isFunction(ParallelMap)) { throw new Error('ParallelMap is not a function'); }
		}
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown
	)
	.build();

const Test2 = TestCase()
	.describe('ParallelMap works')
	.prepare(() => 0)
	.execute(
		InSeries(
			InParallel(
				() => 1,
				() => 2,
				() => 3,
			),
			ParallelMap((val) => val + 1),
		)
	)
	.verify(
		TestCase.VerifyErrorWasNotThrown,
		Assert(
			({ result }) => Array.isArray(result),
			({ result }) => `result is not array`
		),
		Assert(
			({ result }) => result[0] === 2,
			({ result }) => `result[0] invalid`
		),
		Assert(
			({ result }) => result[1] === 3,
			({ result }) => `result[1] invalid`
		),
		Assert(
			({ result }) => result[2] === 4,
			({ result }) => `result[2] invalid`
		)
	)
	.build();

const Tests = Callbackify(
	InParallel(
		Test1,
		Test2
	)
);

describe(
	'aah.ParallelMap',
	() => {
		it('', Tests);
	}
)
