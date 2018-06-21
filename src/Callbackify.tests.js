
import * as Vet from 'vet';
const { isFunction } = Vet;

import test from 'ava';

import { Callbackify } from '../dist/aah.dev';

test(
	'Callbackify is a function',
	(test) => {
		test.true(isFunction(Callbackify));
	}
);

test(
	'Callbackify works 1',
	(test) => {

		const task = Callbackify(
			async (i) => i + 1
		);

		// logs 'res 1', eventually
		task(
			(err, res) => test.pass(),
			0
		);

	}
);
