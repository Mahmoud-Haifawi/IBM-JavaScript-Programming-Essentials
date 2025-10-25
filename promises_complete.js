/*
 * COMPLETE GUIDE TO JAVASCRIPT PROMISES
 * ===================================
 * Table of Contents:
 * 1. Basic Promises
 * 2. Promise States & Flow
 * 3. Promise Chaining
 * 4. Error Handling
 * 5. Promise Utilities
 * 6. Async/Await
 * 7. Advanced Patterns
 * 8. Real World Examples
 */

// =====================================
// SECTION 1: BASIC PROMISES
// =====================================

// 1.1 Creating a Basic Promise
const basicPromise = new Promise((resolve, reject) => {
    // Promise takes a function with resolve and reject parameters
    const success = true;
    if (success) {
        resolve("It worked!");
    } else {
        reject(new Error("It failed!"));
    }
});

// 1.2 Immediate Promises
const instant = Promise.resolve("Ready immediately");
const failed = Promise.reject(new Error("Failed immediately"));

// 1.3 Basic Usage
instant
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Error:', error));

// =====================================
// SECTION 2: PROMISE STATES & FLOW
// =====================================

// 2.1 Pending → Fulfilled or Rejected
function delayedPromise(shouldSucceed) {
    console.log('Promise starts in pending state');
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                console.log('Promise becomes fulfilled');
                resolve('Success!');
            } else {
                console.log('Promise becomes rejected');
                reject(new Error('Failed!'));
            }
        }, 1000);
    });
}

// =====================================
// SECTION 3: PROMISE CHAINING
// =====================================

// 3.1 Basic Chain
Promise.resolve(5)
    .then(num => num * 2)          // 5 -> 10
    .then(num => num + 3)          // 10 -> 13
    .then(result => console.log('Chain result:', result));

// 3.2 Transform Values in Chain
function processUser() {
    return Promise.resolve({ id: 1, name: 'John' })
        .then(user => {
            user.verified = true;
            return user;
        })
        .then(user => {
            console.log('Processed user:', user);
            return user;
        });
}

// =====================================
// SECTION 4: ERROR HANDLING
// =====================================

// 4.1 Different Ways to Handle Errors
function errorDemo() {
    // Method 1: .catch()
    Promise.reject(new Error('Oops!'))
        .catch(err => console.log('Caught:', err.message));

    // Method 2: second parameter of .then()
    Promise.reject(new Error('Oops!'))
        .then(
            success => console.log(success),
            error => console.log('Error in then:', error.message)
        );

    // Method 3: try/catch with async/await
    async function handleError() {
        try {
            await Promise.reject(new Error('Oops!'));
        } catch (err) {
            console.log('Caught in try/catch:', err.message);
        }
    }
    handleError();
}

// =====================================
// SECTION 5: PROMISE UTILITIES
// =====================================

// 5.1 Promise.all - Wait for all
function allExample() {
    const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ];
    
    Promise.all(promises)
        .then(results => console.log('All finished:', results));
}

// 5.2 Promise.race - First to finish
function raceExample() {
    const promises = [
        new Promise(res => setTimeout(() => res('Fast'), 100)),
        new Promise(res => setTimeout(() => res('Slow'), 500))
    ];
    
    Promise.race(promises)
        .then(winner => console.log('Race winner:', winner));
}

// 5.3 Promise.allSettled - Get all results
function allSettledExample() {
    const promises = [
        Promise.resolve(1),
        Promise.reject('error'),
        Promise.resolve(3)
    ];
    
    Promise.allSettled(promises)
        .then(results => console.log('All settled:', results));
}

// =====================================
// SECTION 6: ASYNC/AWAIT
// =====================================

// 6.1 Basic async/await
async function asyncExample() {
    try {
        const result1 = await Promise.resolve('First');
        console.log(result1);
        
        const result2 = await Promise.resolve('Second');
        console.log(result2);
        
        return 'Done!';
    } catch (err) {
        console.error('Error:', err);
    }
}

// 6.2 Parallel vs Sequential
async function compareExecutions() {
    // Sequential
    console.time('sequential');
    const seq1 = await Promise.resolve(1);
    const seq2 = await Promise.resolve(2);
    console.timeEnd('sequential');

    // Parallel
    console.time('parallel');
    const [par1, par2] = await Promise.all([
        Promise.resolve(1),
        Promise.resolve(2)
    ]);
    console.timeEnd('parallel');
}

// =====================================
// SECTION 7: ADVANCED PATTERNS
// =====================================

// 7.1 Promisification (convert callbacks to promises)
function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    };
}

// 7.2 Cancellable Promise
function cancellablePromise(promise, signal) {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            signal.addEventListener('abort', 
                () => reject(new Error('Cancelled')));
        })
    ]);
}

// =====================================
// SECTION 8: REAL WORLD EXAMPLES
// =====================================

// 8.1 Fetch API
async function fetchExample() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

// 8.2 Loading Multiple Resources
async function loadResources() {
    const urls = [
        'https://api.example.com/users',
        'https://api.example.com/posts',
        'https://api.example.com/comments'
    ];

    try {
        const responses = await Promise.all(
            urls.map(url => fetch(url).then(r => r.json()))
        );
        console.log('All resources loaded:', responses);
    } catch (err) {
        console.error('Failed to load resources:', err);
    }
}

// Run examples
(async () => {
    console.log('Running Promise examples...');
    await asyncExample();
    await compareExecutions();
    console.log('Examples completed!');
})();