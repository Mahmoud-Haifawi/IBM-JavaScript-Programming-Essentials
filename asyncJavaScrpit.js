// Convert JSON string → Object
const obj = JSON.parse('{"name": "John", "age": 30}');
console.log(obj.name); // John

// Convert Object → JSON string
const json = JSON.stringify(obj);
console.log(json); // {"name":"John","age":30}

/*
  Extended: Introduction to Sync vs Async execution — all important cases
  - Each section contains a short explanation (beginner-friendly) followed by a tiny runnable example.
  - Run with: node asyncJavaScrpit.js
*/

/* ==========================================================================
   1) Synchronous (blocking) execution - basics
   What: Code runs line-by-line. Each statement finishes before the next starts.
   When: CPU-bound work or small tasks where blocking is acceptable.
   Why: Simple to reason about but can make apps unresponsive for long tasks.
   Example: heavy loop blocks the event loop in Node/browser.
*/
console.log('\n--- 1) Synchronous execution ---');
console.log('sync start');
function heavySyncWork(iterations) {
    let s = 0;
    for (let i = 0; i < iterations; i++) s += i; // blocks
    return s;
}
console.log('heavy result (quick):', heavySyncWork(1e5));
console.log('sync end');

/* ==========================================================================
   2) Asynchronous basics: callbacks
   What: Pass a function (callback) to be invoked later.
   When: Legacy APIs, simple timers, or Node-style async functions.
   Why: Simple but leads to nesting ("callback hell") if overused.
*/
console.log('\n--- 2) Callback-style async ---');
console.log('before timeout');
setTimeout(() => console.log('timeout callback (after 500ms)'), 500);
console.log('after timeout scheduling');

/* ==========================================================================
   3) Promises: composition & state
   What: Promise represents a future result (pending → fulfilled/rejected).
   When: Modern replacement for many callback patterns.
   Why: Chainable, composable, better error handling via .catch.
*/
console.log('\n--- 3) Promises ---');
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve(42), 200);
});
p.then(value => console.log('promise resolved with', value))
 .catch(err => console.error('promise error', err));

/* ==========================================================================
   4) async / await (syntactic sugar over Promises)
   What: Write asynchronous code in sequential style using await.
   When: Use for clearer flow control for async code.
   Why: Easier to read, still returns a Promise.
*/
console.log('\n--- 4) async / await ---');
async function fetchNumber() {
    // simulate async
    return await new Promise(res => setTimeout(() => res(7), 150));
}
(async () => {
    const n = await fetchNumber();
    console.log('awaited number', n);
})();

/* ==========================================================================
   5) Error handling: Promises vs async/await
   - Promises: use .catch()
   - async/await: try/catch
*/
console.log('\n--- 5) Error handling ---');
function willReject(shouldReject) {
    return new Promise((resolve, reject) => {
        setTimeout(() => shouldReject ? reject(new Error('boom')) : resolve('ok'), 50);
    });
}
willReject(true).then(console.log).catch(e => console.log('caught (promise):', e.message));

(async () => {
    try {
        await willReject(true);
    } catch (e) {
        console.log('caught (await):', e.message);
    }
})();

/* ==========================================================================
   6) Promise utilities: all, race, allSettled, any
   - Promise.all: all must resolve; rejects on first rejection.
   - Promise.race: first settled (resolve or reject) wins.
   - Promise.allSettled: wait for all, get statuses.
   - Promise.any: first fulfilled (rejects only if all reject).
*/
console.log('\n--- 6) Promise utilities ---');
const pa = Promise.resolve(1);
const pb = Promise.resolve(2);
const pc = new Promise(res => setTimeout(() => res(3), 100));
Promise.all([pa, pb, pc]).then(vals => console.log('all =>', vals));
Promise.race([pa, pb, pc]).then(v => console.log('race =>', v));
Promise.allSettled([pa, pb, Promise.reject('err')]).then(r => console.log('allSettled =>', r));
Promise.any([Promise.reject('x'), Promise.resolve('first ok')]).then(v => console.log('any =>', v));

/* ==========================================================================
   7) Event loop overview (beginner-friendly)
   - Call stack executes functions.
   - Web/API or Node provides async ops that schedule callbacks to queues.
   - Microtask queue (Promises, process.nextTick/queueMicrotask) runs before macrotasks.
   - Macrotasks (timers like setTimeout, I/O callbacks) run after microtasks.
   Key takeaway: .then callbacks run before a scheduled setTimeout callback even if both were scheduled.
*/
console.log('\n--- 7) Event loop ordering demo ---');
console.log('start');
setTimeout(() => console.log('macrotask: setTimeout'), 0);
Promise.resolve().then(() => console.log('microtask: promise then'));
console.log('end');

/* In Node you can also observe:
   process.nextTick(() => ...) -> runs before Promises (microtasks) in Node.
   queueMicrotask(() => ...) -> schedules microtask similar to Promise.then.
*/
if (typeof process !== 'undefined' && process.nextTick) {
    process.nextTick(() => console.log('process.nextTick (Node, runs before Promise.then)'));
    queueMicrotask(() => console.log('queueMicrotask (microtask)'));
}

/* ==========================================================================
   8) Microtasks vs macrotasks demonstration (clear ordering)
*/
console.log('\n--- 8) Microtask vs Macrotask clear ordering ---');
setTimeout(() => console.log('A: setTimeout 1'), 0);
Promise.resolve().then(() => {
    console.log('B: promise then 1');
    setTimeout(() => console.log('C: setTimeout 2 after promise'), 0);
});
console.log('D: synchronous');

/* ==========================================================================
   9) Async iterators & async generators
   What: Produce async sequence of values (useful for streaming).
   Example: async function* yields values with await; consumed via for await...of.
*/
console.log('\n--- 9) Async generator ---');
async function* asyncRange(n) {
    for (let i = 0; i < n; i++) {
        await new Promise(r => setTimeout(r, 50));
        yield i;
    }
}
(async () => {
    for await (const v of asyncRange(3)) {
        console.log('async generator yielded', v);
    }
})();

/* ==========================================================================
   10) Cancellation patterns (AbortController)
   What: Signal to cancel fetch or other APIs that support AbortSignal.
   Why: Prevent unnecessary work and free resources.
*/
console.log('\n--- 10) Cancellation (AbortController) ---');
if (typeof AbortController !== 'undefined') {
    const ac = new AbortController();
    const signal = ac.signal;
    // example: cancel a Promise that observes the signal
    const cancellable = new Promise((res, rej) => {
        signal.addEventListener('abort', () => rej(new Error('aborted')));
        setTimeout(() => res('done'), 300);
    });
    setTimeout(() => ac.abort(), 100);
    cancellable.then(v => console.log('cancellable resolved', v)).catch(e => console.log('cancellable error', e.message));
} else {
    console.log('AbortController not available in this runtime.');
}

/* ==========================================================================
   11) CPU-bound vs I/O-bound & concurrency vs parallelism
   - I/O-bound tasks often benefit from async non-blocking I/O (Node/browser).
   - CPU-bound tasks block the main thread; use Worker Threads (Node) or Web Workers (browser) for parallelism.
   - Concurrency: many tasks appear to run together (cooperative multitasking).
   - Parallelism: truly simultaneous execution on multiple CPU cores.
*/
console.log('\n--- 11) CPU-bound warning ---');
console.log('If heavySyncWork(1e9) were used, it would block the event loop. Use workers for heavy CPU tasks.');

/* ==========================================================================
   12) Interop patterns & utilities
   - promisify: convert Node callback APIs (err-first) to Promise APIs (util.promisify).
   - thenables: objects with .then are treated like Promises.
   - finally: runs regardless of resolve/reject.
*/
console.log('\n--- 12) Promisify / finally demo ---');
const fsDemo = () => new Promise((res) => setTimeout(() => res('file contents'), 80));
fsDemo().then(console.log).finally(() => console.log('cleanup in finally'));

/* ==========================================================================
   13) Controlling concurrency (limit parallel requests)
   - Useful when you must make many async calls but limit simultaneous operations.
   - Example: a simple concurrency pool implementation pattern (small demo).
*/
console.log('\n--- 13) Concurrency limit pattern ---');
async function mapWithLimit(inputs, limit, asyncMapper) {
    const results = [];
    const executing = new Set();
    for (const item of inputs) {
        const p = Promise.resolve().then(() => asyncMapper(item));
        results.push(p);
        executing.add(p);
        const cleanup = () => executing.delete(p);
        p.then(cleanup, cleanup);
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    return Promise.all(results);
}
(async () => {
    const items = [1,2,3,4,5];
    const res = await mapWithLimit(items, 2, async (n) => {
        await new Promise(r => setTimeout(r, 100));
        return n * 2;
    });
    console.log('mapWithLimit results', res);
})();

/* ==========================================================================
   14) Best practices (short list for beginners)
   - Prefer Promises/async-await over nested callbacks.
   - Keep async functions small and testable.
   - Always handle errors (catch and/or try/catch around await).
   - Use AbortController to cancel long-running requests if API supports it.
   - Avoid blocking the event loop with CPU-heavy synchronous code—use workers.
   - Use Promise.all when parallel independent tasks are needed; use mapWithLimit for many tasks.
*/

/* ==========================================================================
   15) Quick cheatsheet (summary)
   - Synchronous: immediate, blocking (use for trivial CPU-work).
   - Asynchronous callbacks: simple, older style.
   - Promises: composable, modern.
   - async/await: readable sequential style over Promises.
   - Microtasks (Promise.then) run before macrotasks (setTimeout).
   - Use workers for CPU-bound parallelism.
   - Cancel with AbortController.
*/

console.log('\n--- End of async vs sync demo file ---');




