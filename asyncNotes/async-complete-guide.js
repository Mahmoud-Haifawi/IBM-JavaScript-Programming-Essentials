/*
 * COMPLETE GUIDE TO ASYNCHRONOUS JAVASCRIPT
 * =======================================
 * 
 * TABLE OF CONTENTS:
 * -----------------
 * 1. Core Concepts
 *    - What is Async?
 *    - Sync vs Async
 *    - Event Loop Basics
 * 
 * 2. Three Ways to Handle Async
 *    - Callbacks (Old Way)
 *    - Promises (Modern Way)
 *    - Async/Await (Current Best Practice)
 * 
 * 3. Promise Deep Dive
 *    - Creating Promises
 *    - Promise States
 *    - Promise Methods
 *    - Error Handling
 * 
 * 4. Advanced Topics
 *    - JSON & Data Handling
 *    - Cancellation Patterns
 *    - Concurrency Control
 *    - Memory Management
 * 
 * 5. Real-World Examples
 *    - API Calls
 *    - File Operations
 *    - Multiple Async Operations
 * 
 * 6. Best Practices & Patterns
 */

// ============================================
// SECTION 1: CORE CONCEPTS
// ============================================

/* 
 * What is Asynchronous Programming?
 * -------------------------------
 * Think of it like a restaurant:
 * - Synchronous: Waiting in line at a food truck (one person at a time)
 * - Asynchronous: Sitting at a restaurant (many orders handled at once)
 */

// --- 1.1 Sync vs Async Examples ---

// Synchronous (Blocking) - Like waiting in line
console.log('\n=== Synchronous Example ===');
function syncExample() {
    console.log('1. Order coffee');
    // This blocks everything until complete
    const result = Array(100000).fill(1).reduce((a, b) => a + b, 0);
    console.log('2. Coffee ready');
    console.log('3. Drink coffee');
}
syncExample();

// Asynchronous (Non-blocking) - Like restaurant ordering
console.log('\n=== Asynchronous Example ===');
function asyncExample() {
    console.log('1. Order coffee');
    setTimeout(() => {
        console.log('2. Coffee ready (after 2 seconds)');
    }, 2000);
    console.log('3. Chat with friend while waiting');
}
asyncExample();

// --- 1.2 Event Loop Visualization ---
console.log('\n=== Event Loop Demo ===');
console.log('1. Start');
setTimeout(() => console.log('4. Timeout done'), 0);
Promise.resolve().then(() => console.log('2. Promise done'));
console.log('3. End');

// ============================================
// SECTION 2: THREE WAYS TO HANDLE ASYNC
// ============================================

// --- 2.1 Callback Pattern (Old Way) ---
console.log('\n=== Callback Style ===');
function getUserCallback(id, callback) {
    setTimeout(() => {
        const user = { id, name: 'User ' + id };
        callback(null, user);
    }, 1000);
}

getUserCallback(1, (error, user) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('User via callback:', user);
});

// --- 2.2 Promise Pattern (Modern Way) ---
console.log('\n=== Promise Style ===');
function getUserPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id, name: 'User ' + id };
            resolve(user);
        }, 1000);
    });
}

getUserPromise(1)
    .then(user => console.log('User via promise:', user))
    .catch(error => console.error('Error:', error));

// --- 2.3 Async/Await Pattern (Current Best Practice) ---
console.log('\n=== Async/Await Style ===');
async function getUserAsync(id) {
    try {
        const user = await getUserPromise(id);
        console.log('User via async/await:', user);
        return user;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Using async/await
(async () => {
    await getUserAsync(1);
})();

// ============================================
// SECTION 3: PROMISE DEEP DIVE
// ============================================

// --- 3.1 Promise States ---
console.log('\n=== Promise States ===');

// 1. Pending
const pendingPromise = new Promise(() => {});
console.log('Pending promise:', pendingPromise);

// 2. Fulfilled
const fulfilledPromise = Promise.resolve('Success!');
fulfilledPromise.then(value => console.log('Fulfilled with:', value));

// 3. Rejected
const rejectedPromise = Promise.reject('Failed!');
rejectedPromise.catch(error => console.log('Rejected with:', error));

// --- 3.2 Promise Methods ---
console.log('\n=== Promise Methods ===');

// Promise.all - All must succeed
Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
]).then(values => console.log('All succeeded:', values));

// Promise.race - First one wins
Promise.race([
    new Promise(res => setTimeout(() => res('Fast'), 100)),
    new Promise(res => setTimeout(() => res('Slow'), 200))
]).then(winner => console.log('Race winner:', winner));

// Promise.allSettled - Get all results
Promise.allSettled([
    Promise.resolve(1),
    Promise.reject('Error'),
    Promise.resolve(3)
]).then(results => console.log('All settled:', results));

// ============================================
// SECTION 4: ADVANCED TOPICS
// ============================================

// --- 4.1 Cancellation Pattern ---
console.log('\n=== Cancellation Pattern ===');

function cancellableOperation(signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => resolve('completed'), 5000);
        
        signal?.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error('Operation cancelled'));
        });
    });
}

const controller = new AbortController();
cancellableOperation(controller.signal)
    .then(result => console.log('Result:', result))
    .catch(error => console.log('Error:', error.message));

setTimeout(() => controller.abort(), 2000);

// --- 4.2 Concurrency Control ---
console.log('\n=== Concurrency Control ===');

async function processBatchWithLimit(items, limit, processItem) {
    const results = [];
    const inProgress = new Set();

    for (const item of items) {
        const promise = Promise.resolve().then(() => processItem(item));
        results.push(promise);
        inProgress.add(promise);
        promise.finally(() => inProgress.delete(promise));

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

// ============================================
// SECTION 5: REAL-WORLD EXAMPLES
// ============================================

// --- 5.1 API Call Example ---
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}

// --- 5.2 Multiple API Calls ---
async function fetchUserWithPosts(userId) {
    try {
        const [user, posts] = await Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId)
        ]);
        return { user, posts };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}

// ============================================
// SECTION 6: BEST PRACTICES
// ============================================

/*
 * Key Best Practices:
 * 1. Error Handling
 *    - Always use try/catch with async/await
 *    - Add .catch() to Promise chains
 *    - Handle both operational and programmer errors
 * 
 * 2. Performance
 *    - Use Promise.all for parallel operations
 *    - Control concurrency for large batches
 *    - Avoid blocking the event loop
 * 
 * 3. Code Organization
 *    - Keep async functions focused
 *    - Use meaningful names
 *    - Document async interfaces
 * 
 * 4. Resource Management
 *    - Clean up in finally blocks
 *    - Cancel long operations when needed
 *    - Be careful with closures
 */

// Example implementing best practices
async function bestPracticeExample() {
    const controller = new AbortController();
    const { signal } = controller;

    try {
        // Timeout for long operations
        setTimeout(() => controller.abort(), 5000);

        // Parallel operations
        const [result1, result2] = await Promise.all([
            fetchData1(signal),
            fetchData2(signal)
        ]);

        return processResults(result1, result2);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Operation timed out');
        }
        throw error;
    } finally {
        // Cleanup
        console.log('Cleanup complete');
    }
}

// Helper functions
function fetchData1() { return Promise.resolve(1); }
function fetchData2() { return Promise.resolve(2); }
function fetchUserPosts() { return Promise.resolve([]); }
function processResults(r1, r2) { return r1 + r2; }

console.log('\n=== End of Complete Async JavaScript Guide ===');