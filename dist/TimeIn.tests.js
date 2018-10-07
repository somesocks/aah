//
// import * as Vet from 'vet';
// const { isFunction } = Vet;
//
// import test from 'ava';
//
// import { TimeIn } from '../dist/aah.dev';
//
// test(
// 	'TimeIn is a function',
// 	(test) => {
// 		test.true(isFunction(TimeIn));
// 	}
// );
//
// test(
// 	'TimeIn works 1',
// 	async (test) => {
//
// 		const task = TimeIn(async (i) => i + 1, 100);
//
// 		const start = Date.now();
//
// 		const res = await task(0);
//
// 		const end = Date.now();
//
// 		test.true(res === 1);
// 		test.true((end - start) >= 100);
// 	}
// );
