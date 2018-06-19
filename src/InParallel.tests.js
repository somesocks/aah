
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { InParallel } from '../dist/aah.dev';

test(
	'InParallel is a function',
	(test) => {
		test.true(isFunction(InParallel));
	}
);

test(
	'InParallel works 1',
	async (test) => {

		const task = InParallel(
			async (i) => i + 1,
			async (i) => i + 2,
			async (i) => i + 3
		);

		const results = await task(0);

		test.deepEqual(results, [1, 2, 3]);
	}
);

test(
	'InParallel errors propagate 1',
	async (test) => {

		const task = InParallel(
			async (i) => { throw new Error() },
			async (i) => i + 2,
			async (i) => i + 3
		);

		try {
			const results = await task(0);
		} catch (e) {
			test.pass();
			return;
		}

		test.fail();
	}
);
