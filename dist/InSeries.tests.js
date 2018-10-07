//
// import * as Vet from 'vet';
// const { isFunction } = Vet;
//
// import test from 'ava';
//
// import { InSeries } from '../dist/aah.dev';
//
// test(
// 	'InSeries is a function',
// 	(test) => {
// 		test.true(isFunction(InSeries));
// 	}
// );
//
// test(
// 	'InSeries works 1',
// 	async (test) => {
//
// 		const task = InSeries(
// 			async (i) => i + 1,
// 			async (i) => i + 1,
// 			async (i) => i + 1
// 		);
//
// 		const results = await task(0);
//
// 		test.deepEqual(results, 3);
// 	}
// );
//
// test(
// 	'InSeries errors propagate 1',
// 	async (test) => {
//
// 		const task = InSeries(
// 			async (i) => { throw new Error() },
// 			async (i) => i + 1,
// 			async (i) => i + 1
// 		);
//
// 		try {
// 			const results = await task(0);
// 		} catch (e) {
// 			test.pass();
// 			return;
// 		}
//
// 		test.fail();
// 	}
// );
