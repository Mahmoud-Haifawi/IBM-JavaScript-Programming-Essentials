/*
 * JAVASCRIPT PROMISES - A Beginner's Guide
 * =======================================
 * 
 * What is a Promise?
 * - A Promise is like a receipt for a future value
 * - Example: When you order food, you get a receipt (Promise) and later get your food (Result)
 * 
 * A Promise has 3 states:
 * 1. Pending   - Still waiting (like when your order is being prepared)
 * 2. Fulfilled - Success! Got the value (your food arrived)
 * 3. Rejected  - Failed! Got an error (restaurant can't make your order)
 */

// SECTION 1: Creating Simple Promises
// =================================

// Example 1: Immediate success
console.log('--- Example 1: Immediate Success ---');
const successPromise = Promise.resolve('Hello!');
successPromise.then(message => {
    console.log('Success:', message);  // prints "Success: Hello!"
});

// Example 2: Immediate failure
console.log('\n--- Example 2: Immediate Failure ---');
const failurePromise = Promise.reject(new Error('Oops!'));
failurePromise.catch(error => {
    console.log('Failed:', error.message);  // prints "Failed: Oops!"
});

// Example 3: Promise that takes time (like waiting for food)
console.log('\n--- Example 3: Delayed Promise ---');
const waitingPromise = new Promise((resolve, reject) => {
    console.log('Starting to prepare...');
    setTimeout(() => {
        resolve('Food is ready!');
    }, 2000);  // Wait 2 seconds
});

waitingPromise.then(result => {
    console.log('Finished:', result);
});

// SECTION 2: Promise Chaining (doing things in order)
// ================================================

console.log('\n--- Example 4: Promise Chain ---');
function orderFood() {
    return Promise.resolve('🌮 Taco ordered!')
        .then(order => {
            console.log('1.', order);
            return '🔨 Taco being prepared...';  // Pass to next .then()
        })
        .then(preparing => {
            console.log('2.', preparing);
            return '✅ Taco is ready!';  // Pass to next .then()
        })
        .then(ready => {
            console.log('3.', ready);
        });
}

orderFood();

// SECTION 3: Handling Errors (when things go wrong)
// ==============================================

console.log('\n--- Example 5: Error Handling ---');
function makeSandwich(hasIngredients) {
    return new Promise((resolve, reject) => {
        if (hasIngredients) {
            resolve('🥪 Sandwich made!');
        } else {
            reject(new Error('❌ No ingredients!'));
        }
    });
}

// Try making sandwich without ingredients
makeSandwich(false)
    .then(success => {
        console.log(success);  // Won't run
    })
    .catch(error => {
        console.log('Failed:', error.message);  // Will run
    });

// SECTION 4: Async/Await (easier way to use Promises)
// ===============================================

console.log('\n--- Example 6: Async/Await ---');
async function makeBreakfast() {
    try {
        console.log('Starting breakfast...');
        
        // Wait for coffee
        const coffee = await new Promise(resolve => 
            setTimeout(() => resolve('☕ Coffee ready!'), 1000)
        );
        console.log(coffee);

        // Wait for toast
        const toast = await new Promise(resolve =>
            setTimeout(() => resolve('🍞 Toast ready!'), 1000)
        );
        console.log(toast);

        return '🍳 Breakfast is served!';
    } catch (error) {
        console.log('Breakfast failed:', error);
    }
}

// Using our async function
makeBreakfast().then(result => {
    console.log(result);
});

// SECTION 5: Useful Promise Tools
// ============================

console.log('\n--- Example 7: Promise Tools ---');

// Promise.all - Wait for ALL promises (like waiting for all your food)
Promise.all([
    Promise.resolve('🍔 Burger'),
    Promise.resolve('🍟 Fries'),
    Promise.resolve('🥤 Drink')
])
.then(meals => {
    console.log('Complete meal:', meals.join(', '));
});

// Promise.race - Take the FIRST finished promise (like first person to finish eating)
Promise.race([
    new Promise(resolve => setTimeout(() => resolve('First'), 1000)),
    new Promise(resolve => setTimeout(() => resolve('Second'), 2000))
])
.then(winner => {
    console.log('Race winner:', winner);
});

/*
 * TIPS FOR BEGINNERS:
 * ==================
 * 1. Always use .catch() or try/catch to handle errors
 * 2. Promises are great for:
 *    - Loading data from servers (fetch)
 *    - Reading files
 *    - Any task that takes time
 * 3. async/await makes Promises easier to read
 * 4. Promises run in the background, letting other code run
 */

// Show that the file loaded
console.log('\nPromises demo loaded! Try these examples in your console.');