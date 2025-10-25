/*
 * JAVASCRIPT ARRAYS - COMPLETE GUIDE
 * ================================
 * 
 * Arrays in JavaScript are ordered collections of values.
 * They can store any type of value (numbers, strings, objects, etc.)
 */

// ========================================
// 1. CREATING ARRAYS
// ========================================

// Method 1: Array Literal
const fruits = ['apple', 'banana', 'orange'];

// Method 2: Array Constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Method 3: Array.from (create from array-like objects)
const arrayFromString = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// ========================================
// 2. BASIC ARRAY OPERATIONS
// ========================================

// 2.1 Accessing Elements
const firstFruit = fruits[0];      // 'apple'
const lastFruit = fruits[fruits.length - 1];  // 'orange'

// 2.2 Modifying Elements
fruits[1] = 'grape';               // Changes 'banana' to 'grape'

// 2.3 Array Length
console.log('Array length:', fruits.length);

// 2.4 Adding Elements
fruits.push('mango');              // Add to end
fruits.unshift('pear');           // Add to beginning

// 2.5 Removing Elements
const lastRemoved = fruits.pop();  // Remove from end
const firstRemoved = fruits.shift(); // Remove from beginning

// ========================================
// 3. ARRAY METHODS
// ========================================

// 3.1 forEach - Loop through array
console.log('\n=== forEach Example ===');
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

// 3.2 map - Create new array with transformed elements
console.log('\n=== map Example ===');
const doubled = numbers.map(num => num * 2);
console.log('Doubled numbers:', doubled);

// 3.3 filter - Create new array with filtered elements
console.log('\n=== filter Example ===');
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evenNumbers);

// 3.4 reduce - Reduce array to single value
console.log('\n=== reduce Example ===');
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);

// 3.5 find - Find first matching element
const firstEven = numbers.find(num => num % 2 === 0);

// 3.6 some/every - Check conditions
const hasEven = numbers.some(num => num % 2 === 0);
const allPositive = numbers.every(num => num > 0);

// ========================================
// 4. ARRAY MANIPULATION
// ========================================

// 4.1 Slice - Create sub-array (non-mutating)
const slicedArray = fruits.slice(1, 3);  // Get elements 1 through 2

// 4.2 Splice - Modify array (mutating)
const months = ['Jan', 'March', 'April'];
months.splice(1, 0, 'Feb');  // Insert 'Feb' at index 1

// 4.3 Concat - Combine arrays
const array1 = [1, 2];
const array2 = [3, 4];
const combined = array1.concat(array2);  // [1, 2, 3, 4]

// 4.4 Spread Operator
const spreadCombined = [...array1, ...array2];  // Same as concat

// ========================================
// 5. SEARCHING AND SORTING
// ========================================

// 5.1 indexOf/lastIndexOf
const fruits2 = ['apple', 'banana', 'apple', 'orange'];
console.log('First apple at:', fruits2.indexOf('apple'));     // 0
console.log('Last apple at:', fruits2.lastIndexOf('apple')); // 2

// 5.2 includes
console.log('Has banana:', fruits2.includes('banana'));  // true

// 5.3 sort
const unsortedNumbers = [3, 1, 4, 1, 5];
unsortedNumbers.sort((a, b) => a - b);  // Numeric sort
console.log('Sorted numbers:', unsortedNumbers);

// ========================================
// 6. ADVANCED ARRAY CONCEPTS
// ========================================

// 6.1 Multidimensional Arrays
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log('Matrix element:', matrix[1][1]);  // 5

// 6.2 Array Destructuring
const [first, second, ...rest] = fruits2;

// 6.3 Array.from with mapping
const squares = Array.from(numbers, x => x * x);

// ========================================
// 7. PRACTICAL EXAMPLES
// ========================================

// Example 1: Filter and Map Chain
const items = [
    { id: 1, name: 'book', price: 10 },
    { id: 2, name: 'pen', price: 2 },
    { id: 3, name: 'notebook', price: 5 }
];

const expensiveItems = items
    .filter(item => item.price > 3)
    .map(item => item.name);

console.log('\nExpensive items:', expensiveItems);

// Example 2: Group By
function groupBy(array, key) {
    return array.reduce((grouped, item) => {
        const value = item[key];
        grouped[value] = grouped[value] || [];
        grouped[value].push(item);
        return grouped;
    }, {});
}

const people = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 30 }
];

const groupedByAge = groupBy(people, 'age');
console.log('\nGrouped by age:', groupedByAge);

// Example 3: Remove Duplicates
const numbers2 = [1, 2, 2, 3, 3, 4, 5, 5];
const unique = [...new Set(numbers2)];
console.log('\nUnique numbers:', unique);

/*
 * BEST PRACTICES:
 * 1. Use const for arrays unless you need to reassign the variable
 * 2. Use array methods instead of loops when possible
 * 3. Chain array methods responsibly (consider performance)
 * 4. Use destructuring for cleaner code
 * 5. Consider using typed arrays for numeric data
 */

// Run examples to see output
console.log('\n=== Arrays Demo Complete ===');