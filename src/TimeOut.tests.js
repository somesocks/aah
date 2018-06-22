
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { Delay, TimeOut } from '../dist/aah.dev';

test(
	'TimeOut is a function',
	(test) => {
		test.true(isFunction(TimeOut));
	}
);

test(
	'TimeOut works 1',
	async (test) => {

		const task = TimeOut(
			async (i) => i + 1,
			100
		);

		const start = Date.now();

		const res = await task(1);

		const end = Date.now();

		test.true(res === 2);
	}
);

test(
	'TimeOut works 2',
	async (test) => {

		const task = TimeOut(
			Delay(1000),
			100
		);

		let res;
		let err;

		try {
			res = await task(1);
		} catch (e) {
			err = e;
		}

		test.true(res === undefined);
		test.true(err != null);
	}
);
