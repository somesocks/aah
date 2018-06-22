# aah
A JavaScript library of async/await helpers

<a name="aah"></a>

## aah : <code>object</code>
**Kind**: global namespace  

* [aah](#aah) : <code>object</code>
    * [.Callbackify](#aah.Callbackify) ⇒ <code>function</code>
    * [.CatchError](#aah.CatchError) ⇒ <code>function</code>
    * [.Delay](#aah.Delay) ⇒ <code>function</code>
    * [.InParallel](#aah.InParallel) ⇒ <code>function</code>
    * [.InSeries](#aah.InSeries) ⇒ <code>function</code>
    * [.PassThrough](#aah.PassThrough)
    * [.Promisify](#aah.Promisify) ⇒ <code>function</code>
    * [.Race](#aah.Race) ⇒ <code>function</code>
    * [.TimeOut](#aah.TimeOut) ⇒ <code>function</code>

<a name="aah.Callbackify"></a>

### aah.Callbackify ⇒ <code>function</code>
```javascript
	const task = Callbackify(
		async (i) => i + 1
	);

	// logs 'res 1', eventually
	task(
		(err, res) => console.log('res', res),
		0
	);
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - a callback-expecting function  
**Params**

- task <code>function</code> - an async function

<a name="aah.CatchError"></a>

### aah.CatchError ⇒ <code>function</code>
```javascript
  let task = CatchError(task);

  const { error, result } = await task(request);
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async wrapper function around the task  
**Params**

- task <code>function</code> - an async function to wrap around with a catch wrapper.

<a name="aah.Delay"></a>

### aah.Delay ⇒ <code>function</code>
```javascript
	const task = Delay(1000);

	const result = await task(1); // result is 1, after 1 second
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async function  
**Params**

- time <code>number</code> - the time to delay

<a name="aah.InParallel"></a>

### aah.InParallel ⇒ <code>function</code>
```javascript
	const task = InParallel(
		async (i) => i + 1,
		async (i) => i + 2,
		async (i) => i + 3
	);

	const results = await task(0); // results is [1, 2, 3]
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async wrapper function that runs all the tasks in parallel, and returns an array of results  
**Params**

- ...tasks <code>function</code> - any number of async tasks.

<a name="aah.InSeries"></a>

### aah.InSeries ⇒ <code>function</code>
```javascript
	const task = InSeries(
		async (i) => i + 1,
		async (i) => i + 1,
		async (i) => i + 1
	);

	const results = await task(0); // results is 3
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async wrapper function that runs all of the tasks in series, calling each one with the results of the previous one  
**Params**

- ...tasks <code>function</code> - any number of async tasks.

<a name="aah.PassThrough"></a>

### aah.PassThrough
```javascript
	const task = PassThrough;

	const results = await task(0); // results is 0
```

PassThrough does nothing, just passes the request through as the result

**Kind**: static property of [<code>aah</code>](#aah)  
<a name="aah.Promisify"></a>

### aah.Promisify ⇒ <code>function</code>
```javascript
	const task = Promisify(
		(onDone, i) => onDone(
			i === 0 ? new Error('i cant be 0') : null,
			i + 1
		),
	);

	const results = await task(1); // results is 2
	const results2 = await taks(0); // throws 'i cant be 0 Error
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async function  
**Params**

- task <code>function</code> - a callback-expecting function

<a name="aah.Race"></a>

### aah.Race ⇒ <code>function</code>
```javascript
	const task = Race(
		async (i) => i + 1,
		async (i) => i + 2,
	);

	const result = await task(1); // 2
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async task that resolves or rejects as soon as the first one of its "children" resolves or rejects  
**Params**

- ...tasks <code>function</code> - any number of async tasks

<a name="aah.TimeOut"></a>

### aah.TimeOut ⇒ <code>function</code>
```javascript
	const task1 = TimeOut( Delay(100), 1000);
	const task2 = TimeOut( Delay(1000), 100);

	const result1 = await task1(1); // result1 = 1, after 100 ms
	const result2 = await task2(1); // throws a timeout error after 100 ms
```

**Kind**: static property of [<code>aah</code>](#aah)  
**Returns**: <code>function</code> - an async task  
**Params**

- task <code>function</code> - an async tasks
- timeOut <code>function</code> - the number of ms before throwing an error

