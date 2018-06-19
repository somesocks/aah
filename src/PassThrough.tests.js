
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { PassThrough, InSeries } from '../dist/aah';

test(
	'PassThrough works',
	async (test) => {

		const req = {};
		const res = await PassThrough(req);

		test.true(req === res);
	}
);

test(
	'PassThrough is a function',
	async (test) => {
		test.true(isFunction(PassThrough));
	}
);
