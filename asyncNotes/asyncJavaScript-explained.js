/*
 * COMPREHENSIVE GUIDE TO ASYNCHRONOUS JAVASCRIPT
 * ===========================================
 * 
 * Table of Contents:
 * 1. Basic Concepts (Sync vs Async)
 * 2. Three Ways to Handle Async Code
 * 3. Promise Deep Dive
 * 4. Event Loop & Task Queues
 * 5. Real-World Examples
 * 6. Best Practices
 */

// ========================================
// SECTION 1: BASIC CONCEPTS
// ========================================

/* 
 * SYNCHRONOUS vs ASYNCHRONOUS
 * --------------------------
 * Synchronous: Like waiting in line - each person (task) must wait for their turn
 * Asynchronous: Like ordering at a restaurant - order (task) is placed and you can do other things while waiting
 */

// Example 1: Synchronous (Blocking) Code
console.log('\n--- Synchronous Example ---');
function syncExample() {
    console.log('1. Starting');
    // This blocks everything until complete
    const result = Array(1000000).fill(1).reduce((a, b) => a + b, 0);
    console.log('2. Heavy calculation done:', result);
    console.log('3. Ending');
}
syncExample();

// Example 2: Asynchronous (Non-blocking) Code
console.log('\n--- Asynchronous Example ---');
function asyncExample() {
    console.log('1. Starting');
    // This doesn't block - continues immediately
    setTimeout(() => {
        console.log('3. Timer finished (after 1 second)');
    }, 1000);
    console.log('2. Continuing without waiting');
}
asyncExample();

// ========================================
// SECTION 2: THREE WAYS TO HANDLE ASYNC CODE
// ========================================

/* 
 * 1. Callbacks (Traditional Way)
 * 2. Promises (Modern Way)
 * 3. Async/Await (Newest Way)
 */

// 1. Callback Example (Old Style)
console.log('\n--- Callback Style ---');
function getUserCallback(id, callback) {
    setTimeout(() => {
        const user = { id: id, name: 'John' };
        callback(user);
    }, 1000);
}

getUserCallback(1, (user) => {
    console.log('Got user via callback:', user);
});

// 2. Promise Example (Modern Style)
console.log('\n--- Promise Style ---');
function getUserPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: id, name: 'John' };
            resolve(user);
            // If something goes wrong: reject(new Error('Failed to get user'));
        }, 1000);
    });
}

getUserPromise(1)
    .then(user => console.log('Got user via promise:', user))
    .catch(error => console.error('Error:', error));

// 3. Async/Await Example (Newest Style)
console.log('\n--- Async/Await Style ---');
async function getUserAsync(id) {
    try {
        const user = await getUserPromise(id);
        console.log('Got user via async/await:', user);
    } catch (error) {
        console.error('Error:', error);
    }
}

getUserAsync(1);

// ========================================
// SECTION 3: PROMISE DEEP DIVE
// ========================================

/* 
 * Promise States:
 * 1. Pending: Initial state
 * 2. Fulfilled: Operation completed successfully
 * 3. Rejected: Operation failed
 */

// Promise Creation Patterns
console.log('\n--- Promise Patterns ---');

// Pattern 1: Basic Promise
const simplePromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve('Success!');
    } else {
        reject(new Error('Failed!'));
    }
});

// Pattern 2: Promise with Timeout
function promiseWithTimeout(timeoutMs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Completed in time!');
        }, timeoutMs);
    });
}

// Pattern 3: Promise.all (Parallel Execution)
console.log('\n--- Promise.all Example ---');
Promise.all([
    promiseWithTimeout(100),
    promiseWithTimeout(200),
    Promise.resolve('instant')
])
.then(results => console.log('All promises completed:', results))
.catch(error => console.error('One promise failed:', error));

// ========================================
// SECTION 4: EVENT LOOP VISUALIZATION
// ========================================

console.log('\n--- Event Loop Demo ---');
console.log('1. Script Start');

setTimeout(() => console.log('4. Timer 1'), 0);

Promise.resolve()
    .then(() => console.log('3. Promise 1'))
    .then(() => console.log('5. Promise 2'));

console.log('2. Script End');

// ========================================
// SECTION 5: REAL-WORLD EXAMPLES
// ========================================

// Example 1: Loading User Data
async function loadUserData(userId) {
    try {
        const user = await getUserAsync(userId);
        const permissions = await getUserPermissions(userId);
        return { ...user, permissions };
    } catch (error) {
        console.error('Failed to load user data:', error);
        throw error;
    }
}

// Example 2: Parallel Data Loading
async function loadDashboardData() {
    try {
        const [users, posts, comments] = await Promise.all([
            getUsers(),
            getPosts(),
            getComments()
        ]);
        return { users, posts, comments };
    } catch (error) {
        console.error('Failed to load dashboard:', error);
        throw error;
    }
}

// ========================================
// SECTION 6: BEST PRACTICES
// ========================================

/*
 * 1. Always handle errors (try/catch with async/await, .catch() with promises)
 * 2. Avoid callback hell - use promises or async/await
 * 3. Don't mix async styles - stick to one approach
 * 4. Use Promise.all for parallel operations
 * 5. Remember that async functions always return promises
 */

// Example of good practice
async function goodPracticeExample() {
    try {
        const result = await someAsyncOperation();
        return result;
    } catch (error) {
        console.error('Operation failed:', error);
        // Handle error appropriately
        throw error;
    } finally {
        // Cleanup if needed
        console.log('Operation completed (success or failure)');
    }
}

// Helper functions for examples
function getUsers() { return Promise.resolve([]); }
function getPosts() { return Promise.resolve([]); }
function getComments() { return Promise.resolve([]); }
function getUserPermissions() { return Promise.resolve([]); }
function someAsyncOperation() { return Promise.resolve(); }

console.log('\n--- End of Async JavaScript Guide ---');