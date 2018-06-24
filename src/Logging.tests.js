
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { InSeries, Logging } from '../dist/aah.dev';

test(
	'Logging is a function',
	(test) => {
		test.true(isFunction(Logging));
	}
);

test(
	'Logging works 1',
	async (test) => {

		const task = InSeries(
			async (i) => i + 1,
			Logging('val', (i) => i),
			async (i) => i + 1
		);

		const results = await task(0);

		test.deepEqual(results, 2);
	}
);
