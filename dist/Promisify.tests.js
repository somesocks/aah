//
// import * as Vet from 'vet';
// const { isFunction } = Vet;
//
// import test from 'ava';
//
// import { Promisify } from '../dist/aah.dev';
//
// test(
// 	'Promisify is a function',
// 	(test) => {
// 		test.true(isFunction(Promisify));
// 	}
// );
//
// test(
// 	'Promisify works 1',
// 	async (test) => {
//
// 		const task = Promisify(
// 			(next, i) => next(null, i + 1)
// 		);
//
// 		const res = await task(0);
//
// 		test.deepEqual(res, 1);
// 	}
// );
