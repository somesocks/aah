
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { Assert, InSeries } from '../dist/aah.dev';

test(
	'Assert is a function',
	(test) => {
		test.true(isFunction(Assert));
	}
);

test(
	'Assert works 1',
	async (test) => {

		const task = InSeries(
			async (i) => i + 1,
			Assert((i) => i > 0),
			async (i) => i + 1
		);

		const results = await task(0);

		test.deepEqual(results, 2);
	}
);

test(
	'Assert works 2',
	async (test) => {

		const task = InSeries(
			async (i) => i + 1,
			Assert((i) => i < 0),
			async (i) => i + 1
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
