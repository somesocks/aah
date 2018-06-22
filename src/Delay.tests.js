
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { Delay } from '../dist/aah.dev';

test(
	'Delay is a function',
	(test) => {
		test.true(isFunction(Delay));
	}
);

test(
	'Delay works 1',
	async (test) => {

		const task = Delay(100);

		const start = Date.now();

		await task();

		const end = Date.now();

		test.true((end - start) >= 100);
	}
);
