// -------------------- Function Hoisting Examples --------------------

// 1. Function Declaration Hoisting
// This works because sayHello is hoisted to the top
console.log(sayHello()); // Outputs: "Hello there!"

function sayHello() {
    return "Hello there!";
}

// 2. Function Expression - NOT hoisted
try {
    console.log(notHoisted()); // This will throw an error
} catch (e) {
    console.log("Error: Cannot access before initialization");
}

const notHoisted = function() {
    return "This won't work before declaration";
};

// -------------------- Function Closure Examples --------------------

// 1. Basic Closure - Counter Example
function createCounter() {
    let count = 0;  // Private variable

    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
// console.log(count); // Would throw ReferenceError - count is private!

// 2. Closure with Parameters - Person Greeter
function createGreeter(name) {
    const greeting = `Hello, ${name}!`; // This will be "remembered"

    return function() {
        return greeting;
    };
}

const greetJohn = createGreeter("John");
const greetAlice = createGreeter("Alice");

console.log(greetJohn());  // "Hello, John!"
console.log(greetAlice()); // "Hello, Alice!"

// 3. Practical Closure - API Creation Example
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable

    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return `Deposited ${amount}. New balance: ${balance}`;
            }
            return "Invalid deposit amount";
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return `Withdrawn ${amount}. New balance: ${balance}`;
            }
            return "Invalid withdrawal amount or insufficient funds";
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.getBalance()); // 100
console.log(account.deposit(50));  // Deposited 50. New balance: 150
console.log(account.withdraw(30)); // Withdrawn 30. New balance: 120
// console.log(balance); // Would throw ReferenceError - balance is private!

// 4. Combining Hoisting and Closure - Module Pattern
const calculator = (function() {
    // Private variables and functions
    let result = 0;
    
    function validateNumber(num) {
        return typeof num === 'number' && !isNaN(num);
    }

    // Public API
    return {
        add(num) {
            if (validateNumber(num)) {
                result += num;
                return result;
            }
            return "Invalid input";
        },
        subtract(num) {
            if (validateNumber(num)) {
                result -= num;
                return result;
            }
            return "Invalid input";
        },
        getResult() {
            return result;
        }
    };
})();

console.log(calculator.add(5));      // 5
console.log(calculator.subtract(2)); // 3
console.log(calculator.getResult()); // 3
// console.log(result); // Would throw ReferenceError - result is private!

// 5. Event Handler with Closure Example
function createButtonHandler(buttonId) {
    let clickCount = 0;  // Private counter for this specific button

    return function() {
        clickCount++;
        console.log(`Button ${buttonId} clicked ${clickCount} times`);
    };
}

// Usage in browser would be:
// const button1Handler = createButtonHandler('btn1');
// button1.addEventListener('click', button1Handler);

// Test the handler manually
const handler = createButtonHandler('test');
handler(); // "Button test clicked 1 times"
handler(); // "Button test clicked 2 times"