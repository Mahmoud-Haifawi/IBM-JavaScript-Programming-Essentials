/*
 * JavaScript Operators - concise reference with examples
 *
 * Run: node opreatos.js
 *
 * Categories covered:
 *  - Arithmetic
 *  - Assignment
 *  - Comparison (relational & equality)
 *  - Logical
 *  - Bitwise
 *  - Unary
 *  - Ternary (conditional)
 *  - Spread / Rest
 *  - Optional chaining / Nullish coalescing
 *  - typeof, instanceof, in, delete, void, comma
 *  - Precedence & common pitfalls
 */

// ---------- 1) Arithmetic operators ----------
console.log('\n--- Arithmetic ---');
console.log('1 + 2 =', 1 + 2);
console.log('5 - 3 =', 5 - 3);
console.log('4 * 3 =', 4 * 3);
console.log('10 / 4 =', 10 / 4);      // floating point
console.log('10 % 3 =', 10 % 3);      // remainder
console.log('2 ** 3 =', 2 ** 3);      // exponentiation
let a = 1;
console.log('++a =', ++a, 'a after pre-increment'); // pre-increment
a = 1;
console.log('a++ =', a++, 'value returned then incremented', 'a now =', a); // post-increment

// ---------- 2) Assignment operators ----------
console.log('\n--- Assignment ---');
let x = 10;
x += 5; // x = x + 5
console.log('x after +=5:', x);
x *= 2; // x = x * 2
console.log('x after *=2:', x);

// ---------- 3) Comparison operators ----------
console.log('\n--- Comparison ---');
// Relational
console.log('3 > 2:', 3 > 2);
console.log('2 >= 2:', 2 >= 2);
console.log('1 < 2:', 1 < 2);
console.log('1 <= 1:', 1 <= 1);

// Equality
console.log('"2" == 2 (loose):', "2" == 2);   // converts types
console.log('"2" === 2 (strict):', "2" === 2); // no conversion, recommended

// Special note: NaN is not equal to itself
console.log('NaN === NaN:', NaN === NaN);

// ---------- 4) Logical operators ----------
console.log('\n--- Logical ---');
console.log('true && false =', true && false); // AND
console.log('true || false =', true || false); // OR
console.log('!true =', !true);                 // NOT

// Short-circuiting and truthy/falsy values
console.log('null || "fallback" =', null || 'fallback');
console.log('0 && "nope" =', 0 && 'nope'); // 0 is falsy so returns 0

// ---------- 5) Bitwise operators ----------
console.log('\n--- Bitwise ---');
// Works on 32-bit integer representations
console.log('5 & 3 =', 5 & 3);
console.log('5 | 2 =', 5 | 2);
console.log('~5 =', ~5);   // bitwise NOT
console.log('1 << 2 =', 1 << 2); // left shift
console.log('8 >> 1 =', 8 >> 1); // right shift

// ---------- 6) Unary operators ----------
console.log('\n--- Unary ---');
console.log('typeof [] =', typeof []);
console.log('typeof 123 =', typeof 123);
console.log('typeof null =', typeof null, '(historical quirk: "object")');
console.log('+ "42" =', + '42'); // unary plus converts to number
console.log('- "5" =', - '5');   // unary minus

// delete operator (removes property on objects)
const obj = { a: 1, b: 2 };
delete obj.b;
console.log('after delete obj.b =', obj);

// void operator (rare): returns undefined
console.log('void 0 =', void 0);

// ---------- 7) Ternary (conditional) ----------
console.log('\n--- Ternary ---');
const age = 18;
const allowed = age >= 18 ? 'yes' : 'no';
console.log('Allowed?', allowed);

// ---------- 8) Spread and Rest ----------
console.log('\n--- Spread / Rest ---');
const arr = [1, 2, 3];
const arr2 = [...arr, 4]; // spread
console.log('arr2:', arr2);

// rest in function arguments
function sum(...nums) { // nums is an array
    return nums.reduce((s, n) => s + n, 0);
}
console.log('sum(1,2,3)=', sum(1, 2, 3));

// object spread (shallow copy)
const o1 = { x: 1, y: 2 };
const o2 = { ...o1, z: 3 };
console.log('o2:', o2);

// ---------- 9) Optional chaining and Nullish coalescing ----------
console.log('\n--- Optional chaining & Nullish coalescing ---');
const nested = { a: { b: 2 } };
console.log('nested.a?.b =', nested.a?.b);
console.log('nested.x?.y =', nested.x?.y); // undefined safely
const value = null ?? 'default'; // nullish coalescing (only null or undefined)
console.log('null ?? "default" =', value);

// ---------- 10) instanceof and in ----------
console.log('\n--- instanceof & in ---');
console.log('[] instanceof Array =', [] instanceof Array);
console.log("'a' in {a:1} =", 'a' in { a: 1 }); // property existence

// ---------- 11) Comma operator ----------
console.log('\n--- Comma operator ---');
// evaluates multiple expressions, returns last
let c = (1, 2, 3);
console.log('c =', c);

// ---------- 12) typeof quirks & best-practices ----------
console.log('\n--- typeof quirks & best practices ---');
console.log('typeof null ->', typeof null); // "object" historical
console.log('typeof function ->', typeof function () {});

// ---------- 13) Operator precedence ----------
console.log('\n--- Precedence examples ---');
// Multiplication before addition
console.log('2 + 3 * 4 =', 2 + 3 * 4);
console.log('(2 + 3) * 4 =', (2 + 3) * 4);

// ---------- 14) Equality pitfalls ----------
console.log('\n--- Equality pitfalls ---');
console.log('0 == false ->', 0 == false);   // true (coercion)
console.log('"" == 0 ->', "" == 0);         // true
console.log('null == undefined ->', null == undefined); // true
console.log('Use === and !== to avoid coercion issues');

// ---------- 15) BigInt operators ----------
console.log('\n--- BigInt ---');
const big = 10n ** 20n;
console.log('big:', big);
// Note: BigInt cannot mix with Number for arithmetic (will throw)

// ---------- 16) Summary ----------
console.log('\n--- Summary ---');
console.log('Use === for equality, prefer const, avoid bitwise unless needed, use optional chaining and ?? to handle missing values, and keep operator precedence in mind.');