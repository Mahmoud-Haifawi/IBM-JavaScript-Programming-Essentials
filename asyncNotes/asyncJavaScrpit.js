/*
 * MASTERING ASYNCHRONOUS JAVASCRIPT
 * ================================
 * 
 * CONTENTS:
 * ---------
 * 1. Fundamentals
 *    - JSON Basics
 *    - Sync vs Async
 *    - Event Loop Basics
 * 
 * 2. Core Async Patterns
 *    - Callbacks
 *    - Promises
 *    - Async/Await
 * 
 * 3. Advanced Topics
 *    - Error Handling
 *    - Promise Utilities
 *    - Cancellation
 *    - Concurrency Control
 * 
 * 4. Best Practices & Patterns
 */

// ==============================================
// SECTION 1: FUNDAMENTALS
// ==============================================

// --- 1.1 JSON Basics ---
console.log('\n=== JSON Basics ===');

// Converting between JSON and Objects
const person = {
    name: "John",
    age: 30
};

// Object → JSON string
const jsonString = JSON.stringify(person);
console.log('JSON string:', jsonString);

// JSON string → Object
const parsedPerson = JSON.parse(jsonString);
console.log('Parsed object:', parsedPerson);

// --- 1.2 Understanding Sync vs Async ---
console.log('\n=== Sync vs Async ===');

// Synchronous (Blocking) Example
console.log('1. Sync operation starts');
function blockingOperation(ms) {
    const start = Date.now();
    while(Date.now() - start < ms) {} // Blocks for ms milliseconds
}
blockingOperation(100); // Blocks for 100ms
console.log('2. Sync operation ends');

// Asynchronous (Non-blocking) Example
console.log('1. Async operation starts');
setTimeout(() => {
    console.log('3. Async operation ends');
}, 100);
console.log('2. Code continues immediately');

// ==============================================
// SECTION 2: CORE ASYNC PATTERNS
// ==============================================

// --- 2.1 Callback Pattern (Traditional) ---
console.log('\n=== Callback Pattern ===');

function fetchUserCallback(id, callback) {
    setTimeout(() => {
        const user = { id, name: 'User ' + id };
        callback(null, user);
    }, 100);
}

// Using callbacks (old style)
fetchUserCallback(1, (error, user) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('User via callback:', user);
});

// --- 2.2 Promise Pattern (Modern) ---
console.log('\n=== Promise Pattern ===');

function fetchUserPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id, name: 'User ' + id };
            resolve(user);
        }, 100);
    });
}

// Using Promises
fetchUserPromise(1)
    .then(user => console.log('User via promise:', user))
    .catch(error => console.error('Error:', error));

// --- 2.3 Async/Await Pattern (Modern) ---
console.log('\n=== Async/Await Pattern ===');

async function fetchUser(id) {
    return await fetchUserPromise(id);
}

// Using async/await
(async () => {
    try {
        const user = await fetchUser(1);
        console.log('User via async/await:', user);
    } catch (error) {
        console.error('Error:', error);
    }
})();

// ==============================================
// SECTION 3: ADVANCED TOPICS
// ==============================================

// --- 3.1 Promise Utilities ---
console.log('\n=== Promise Utilities ===');

// Promise.all - Wait for all promises
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise(res => setTimeout(() => res(3), 100));

Promise.all([promise1, promise2, promise3])
    .then(values => console.log('All promises resolved:', values));

// Promise.race - First to finish wins
Promise.race([
    new Promise(res => setTimeout(() => res('fast'), 100)),
    new Promise(res => setTimeout(() => res('slow'), 200))
])
    .then(winner => console.log('Race winner:', winner));

// --- 3.2 Cancellation with AbortController ---
console.log('\n=== Cancellation Pattern ===');

function cancellableOperation(signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => resolve('completed'), 5000);
        
        // Handle cancellation
        signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error('Operation cancelled'));
        });
    });
}

// Usage example
const controller = new AbortController();
cancellableOperation(controller.signal)
    .then(result => console.log('Result:', result))
    .catch(error => console.log('Error:', error.message));

// Cancel after 2 seconds
setTimeout(() => controller.abort(), 2000);

// --- 3.3 Concurrency Control ---
console.log('\n=== Concurrency Control ===');

async function processBatchWithLimit(items, limit, processItem) {
    const results = [];
    const inProgress = new Set();

    for (const item of items) {
        // Create promise for this item
        const promise = Promise.resolve().then(() => processItem(item));
        results.push(promise);

        // Add to in-progress set
        inProgress.add(promise);
        promise.finally(() => inProgress.delete(promise));

        // Wait if at limit
        if (inProgress.size >= limit) {
            await Promise.race(inProgress);
        }
    }

    return Promise.all(results);
}

// Example usage
const items = [1, 2, 3, 4, 5];
processBatchWithLimit(items, 2, async (item) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return item * 2;
}).then(results => console.log('Batch processed:', results));

// ==============================================
// SECTION 4: BEST PRACTICES
// ==============================================

/*
 * 1. Error Handling
 *    - Always use try/catch with async/await
 *    - Always add .catch() to Promises
 *    - Handle both operational and programmer errors
 *
 * 2. Performance
 *    - Use Promise.all for parallel operations
 *    - Control concurrency for large batches
 *    - Avoid blocking the event loop
 *
 * 3. Code Organization
 *    - Keep async functions focused and small
 *    - Use meaningful variable names
 *    - Document async interfaces
 *
 * 4. Memory Management
 *    - Clean up resources in finally blocks
 *    - Cancel long-running operations when needed
 *    - Be careful with closures in async code
 */

// Example of good practices
async function goodPracticeExample() {
    const controller = new AbortController();
    const { signal } = controller;

    try {
        // Timeout if operation takes too long
        setTimeout(() => controller.abort(), 5000);

        // Parallel operations with error handling
        const [result1, result2] = await Promise.all([
            fetchData1(signal),
            fetchData2(signal)
        ]);

        return processResults(result1, result2);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Operation timed out');
        }
        throw error; // Re-throw for caller to handle
    } finally {
        // Cleanup code here
    }
}

// Helper functions (just for the example)
function fetchData1() { return Promise.resolve(1); }
function fetchData2() { return Promise.resolve(2); }
function processResults(r1, r2) { return r1 + r2; }

console.log('\n=== End of Advanced Async JavaScript Guide ===');