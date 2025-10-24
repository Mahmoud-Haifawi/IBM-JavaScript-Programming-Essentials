console.log("HI");

let var1 = 5;

const finalvar=6;

var v2 =20;

function add (a, b)
{
    var sum = a+b;
    console.log(sum);

}

// Added: modern JS function types and usage examples

// -----------------------------------------------------------------------------
// Primer: tiny explanations of common sub-concepts used below (beginner-friendly)
// -----------------------------------------------------------------------------
// "this" - refers to the execution context object for a function call. Behavior differs:
//   - Regular functions: "this" is dynamic and depends on how function is called (global, object, call/apply, strict mode).
//   - Arrow functions: "this" is lexical — they inherit "this" from the surrounding scope.
// Hoisting - function declarations are hoisted (available before they appear in code). Function expressions and arrow functions are not hoisted in the same way.
// Promise - an object representing a future value. async functions always return Promises.
// Generator - a function that can pause and resume (function* and yield).
// Callback vs Promise - callback is an older pattern (err-first in Node). Promises/async-await are the modern preferred approach.
// Rest params vs arguments - use rest (...args) in modern code. "arguments" is older and not available in arrow functions.
// -----------------------------------------------------------------------------


// 1) Function declaration (pure, returns value)
/*
  What: A named function declared using the "function" keyword at top-level or inside blocks.
  When: Use for stable, reusable functions where hoisting is acceptable and you want a clear name.
  How: Hoisted at parse time so you can call it before the declaration in the file.
  Why: Good for libraries or module-level functions. Clear stack traces and debuggable names.
  Notes for beginners:
    - Use when you want predictable behavior for "this" (it's dynamic for declarations).
    - Returns a value with "return".
*/
function addDeclaration(a, b) {
    return a + b;
}

// 2) Function expression
/*
  What: A function assigned to a variable. Can be anonymous.
  When: Use when you want to create functions conditionally or pass them as values.
  How: Not hoisted like declarations; the variable holds the function at runtime.
  Why: Flexible; allows closing over variables and creating: const fn = function() { } or let fn = function() { }.
  Notes:
    - Use const to avoid accidental reassignments.
*/
const addExpression = function(a, b) {
    return a + b;
};

// 3) Named function expression
/*
  What: Function expression with an internal name.
  When: Use when you want a function expression but want a stable name for stack traces or recursion.
  How: The name is visible inside the function only.
  Why: Helpful for debugging and self-reference without polluting outer scope.
*/
const addNamedExpression = function addNE(a, b) {
    return a + b;
};

// 4) Arrow function (block body)
/*
  What: Short syntax introduced in ES6: (args) => { ... }.
  When: Use for concise functions, especially inline callbacks or where you want lexical "this".
  How: Arrow functions do not have their own "this", "arguments", or "new" behavior.
  Why: Cleaner syntax and avoids common "this" bugs in callbacks/event handlers.
  When not to use: Do not use arrow functions as object constructors (no "new") or when you need its own "this".
*/
const addArrow = (a, b) => {
    return a + b;
};

// 5) Arrow function (concise body)
/*
  What: Concise arrow returns an expression directly: (a,b) => a + b
  When: Use for very small pure functions that return an expression.
  Why: Shorter and readable for simple transformations or callbacks.
*/
const addArrowConcise = (a, b) => a + b;

// 6) Async function (returns a Promise)
/*
  What: Declared with "async", may use "await" inside. Always returns a Promise.
  When: Use when performing asynchronous operations (I/O, network, timers) and you want readable sequential code.
  How: Use "await" to pause until a Promise resolves. Wrap in try/catch to handle errors.
  Why: Async/await makes asynchronous code look synchronous and easier to reason about than chains of .then().
*/
async function addAsync(a, b) {
    return a + b;
}

// 7) Async arrow function
/*
  What: Arrow function variant with async behavior.
  When: Use for short asynchronous callbacks or when preserving lexical "this" is desired.
  Notes: Still returns a Promise.
*/
const addAsyncArrow = async (a, b) => a + b;

// 8) Generator function (yields the result)
/*
  What: function* that can yield multiple values over time. Caller controls iteration using next().
  When: Use when you need lazy sequences, iterators, or cooperative concurrency.
  How: Use yield to emit values. Generators are not Promises — they are synchronous iterators unless combined with async generators.
  Why: Useful when producing values on demand or implementing custom iterators.
*/
function* addGenerator(a, b) {
    yield a + b;
}

// 9) Method shorthand inside an object
/*
  What: Short syntax for functions on object literals: obj = { method() { } }.
  When: Use when defining methods on objects.
  How: This method's "this" is dynamic based on call site (object.method()).
  Why: Cleaner syntax and conveys intent of object behavior.
*/
const calculator = {
    addMethod(a, b) {
        return a + b;
    }
};

// 10) Class instance method and static method
/*
  What: Methods defined in class bodies. Instance methods run on instances; static methods on the class.
  When: Use classes for related behavior with shared state (instances) or utility functions (static).
  How: Use class syntax; private fields/methods are available via #privateName (modern JS).
  Why: Organizes code for object-oriented patterns; clear separation of instance vs static behavior.
*/
class Adder {
    add(a, b) {
        return a + b;
    }
    static addStatic(a, b) {
        return a + b;
    }
}

// 11) Bound function (binds this / preset args)
/*
  What: Function returned by .bind(thisArg, ...presetArgs).
  When: Use to permanently set "this" and optionally preset initial args.
  How: boundFn = original.bind(context, arg1)
  Why: Handy when passing methods as callbacks where you want their "this" fixed (e.g., event handlers).
  Note: Binding creates a new function; avoid unnecessary binds in hot code paths.
*/
const addBound = addDeclaration.bind(null); // same signature as addDeclaration

// 12) Rest parameters (sum any number of args)
/*
  What: Function collects unequal number of args into an array with ...rest.
  When: Use for variadic functions where number of args varies (sum, concat, etc).
  How: function(...nums) { nums is an array }
  Why: Cleaner and safer than using "arguments". Works with arrow functions too.
*/
function addRest(...nums) {
    return nums.reduce((s, n) => s + Number(n || 0), 0);
}
const addRestArrow = (...nums) => nums.reduce((s, n) => s + Number(n || 0), 0);

// 13) IIFE returning a function
/*
  What: Immediately Invoked Function Expression — runs once and returns something (closure).
  When: Use to create encapsulated state or initialize a module without polluting globals.
  How: (function(){ ... })() or (() => { ... })()
  Why: Good for private state or factory initializations; mostly replaced by module imports in modern code.
*/
const addIIFE = (function() {
    return (a, b) => a + b;
})();

// 14) Curried function (higher-order)
/*
  What: A function that returns another function until all args are supplied: a => b => a + b.
  When: Use for partial application or composing functions functionally.
  How: Useful for building specialized functions like addFive = addCurried(5).
  Why: Functional programming style; can improve reusability and composition.
*/
const addCurried = a => b => a + b;

// 15) Default parameters
/*
  What: function parameters with default values: function(a = 0, b = 0) { }.
  When: Use to avoid checking undefined and to express default behavior.
  How: Defaults evaluate at call time.
  Why: Cleaner code than manual "a = a || 0" because it handles falsy values correctly in many cases.
*/
function addDefault(a = 0, b = 0) {
    return a + b;
}

// 16) Variadic using the arguments object (older style)
/*
  What: "arguments" is an array-like object available in regular functions (not arrow functions).
  When: Historical pattern before rest params; still found in older code.
  How: Convert to real array with Array.from or use rest params instead.
  Why: Prefer rest params in modern code; arguments is retained for compatibility.
*/
function addArguments() {
    let s = 0;
    for (let i = 0; i < arguments.length; i++) {
        s += Number(arguments[i] || 0);
    }
    return s;
}

// 17) Wrapper that logs then calls an inner function
/*
  What: Higher-order function that returns a wrapper adding cross-cutting behavior (logging, validation).
  When: Use to decorate behavior without changing original function (AOP-like).
  How: function makeLoggingAdd(fn) { return (...args) => { ... fn(...args) } }
  Why: Great for adding telemetry, input validation, caching, or retry logic.
*/
function makeLoggingAdd(fn) {
    return function(...args) {
        const res = fn(...args);
        console.log('add called with', args, '→', res);
        return res;
    };
}
const addLogged = makeLoggingAdd(addArrowConcise);

// 18) Async generator (yields intermediate sums, each value can be awaited)
/*
  What: Combination of async + generator: async function* which yields Promises that can be awaited.
  When: Use for streaming async results (e.g., reading lines from network or progressive computation).
  How: for await (const x of asyncGenerator()) { ... } to consume.
  Why: Useful when values arrive over time and you want async iteration semantics.
*/
async function* addAsyncGenerator(...nums) {
    let sum = 0;
    for (const n of nums) {
        // simulate async step (could be an I/O call)
        const v = await Promise.resolve(Number(n || 0));
        sum += v;
        yield sum;
    }
}

// 19) Class with private method, class-field arrow, getters/setters, static async
/*
  What: Modern class features: private methods (#), class fields, getters/setters, static async methods.
  When: Use for encapsulation and instance state management in object-oriented code.
  How: #privateName hides implementation details; class fields can be arrow functions to bind lexical this.
  Why: Strong encapsulation, clearer APIs, and safer object invariants in larger codebases.
*/
class AdvancedAdder {
    // private helper (not accessible outside)
    #privateAdd(a, b) {
        return a + b;
    }

    // class-field arrow method (preserves lexical this)
    addField = (a, b) => a + b;

    // normal instance method
    add(a, b) {
        return this.#privateAdd(a, b);
    }

    // static async method
    static async addStaticAsync(a, b) {
        return a + b;
    }

    // simple getter/setter example to show property-like methods
    get lastResult() {
        return this._lastResult;
    }
    set lastResult(v) {
        this._lastResult = v;
    }
}

// 20) Computed property name as method
/*
  What: Use a variable as the method name: const obj = { [name]() { } }.
  When: Use to create APIs dynamically or when mapping external names to functions.
  How: Useful with dynamic factories or plugin systems.
  Why: Enables flexible object shapes without writing lots of repetitive code.
*/
const methodName = 'computedAdd';
const dynamicObj = {
    [methodName](a, b) {
        return a + b;
    }
};

// 21) Arrow used as object property vs normal method (note: arrow has no 'this')
/*
  What: Storing arrow functions on objects vs normal methods.
  When: Use arrow properties when you don't need dynamic "this" (e.g., utility functions on an object).
  How: Normal methods are better for instance behavior that relies on "this".
  Why: Choose based on whether "this" semantics or a stable lexical binding is needed.
*/
const objWithArrow = {
    base: 10,
    arrowAdd: (a, b) => a + b,       // no 'this' binding
    normalAdd(a, b) { return a + b; } // dynamic this
};

// 22) Node-style callback (err-first)
/*
  What: Function that receives a callback with (err, result) signature.
  When: Common in older Node.js APIs and some libraries.
  How: Use when interoperating with legacy APIs, but prefer Promise-based abstractions in new code.
  Why: Still important to know for migration and interoperability.
*/
function addCallback(a, b, cb) {
    setTimeout(() => {
        // null error, result a+b
        cb(null, a + b);
    }, 0);
}

// 23) Promise-returning function (modern async style)
/*
  What: Function that returns a Promise directly (or via async).
  When: Use for asynchronous operations; consumers can use .then() or await.
  How: Prefer this over raw callbacks for new code. Promisify legacy APIs when necessary.
  Why: Promises support composition, error handling, and cleaner async control flow.
*/
function addPromise(a, b) {
    return Promise.resolve(a + b);
}

// 24) Thunk (deferred computation)
/*
  What: A function that returns another function which when called performs the computation.
  When: Use for lazy evaluation, delaying side effects, or test stubbing.
  How: Common in functional programming and middleware patterns.
  Why: Gives control over when work executes.
*/
const addThunk = (a, b) => () => a + b;

// 25) Trampoline helper + example to avoid deep recursion
/*
  What: Trampoline repeatedly invokes functions until a non-function value is returned.
  When: Use to convert recursive calls into iterative loops to avoid exceeding the call stack.
  How: The recursive function returns a thunk instead of recursing directly.
  Why: Useful for algorithms that may recurse deeply; rarely needed with tail-call optimizations absent.
*/
function trampoline(fn) {
    let result = fn;
    while (typeof result === 'function') {
        result = result();
    }
    return result;
}
const bounceAdd = (a, b) => () => a + b; // trivial thunk example

// 26) Proxy apply trap to intercept calls
/*
  What: Proxy can intercept function calls with an "apply" trap.
  When: Use to implement logging, validation, memoization, or mocking behaviors.
  How: new Proxy(targetFn, { apply(target, thisArg, args) { ... } })
  Why: Powerful meta-programming capability; use sparingly due to performance and complexity.
*/
const addThroughProxy = new Proxy(addDeclaration, {
    apply(target, thisArg, args) {
        // inspect / modify args, logging, validation, etc.
        console.log('Proxy intercepted call:', args);
        return Reflect.apply(target, thisArg, args);
    }
});

// Usage examples (uncomment to run)
console.log('addDeclaration:', addDeclaration(1, 2));
console.log('addExpression:', addExpression(1, 2));
console.log('addArrow:', addArrow(1, 2));
console.log('addArrowConcise:', addArrowConcise(1, 2));
addAsync(3, 4).then(r => console.log('addAsync:', r));
addAsyncArrow(4, 5).then(r => console.log('addAsyncArrow:', r));
console.log('addGenerator:', addGenerator(2, 3).next().value);
console.log('calculator.addMethod:', calculator.addMethod(2, 3));
console.log('Adder instance:', new Adder().add(2, 3));
console.log('Adder static:', Adder.addStatic(2, 3));
console.log('addBound:', addBound(5, 6));
console.log('addRest:', addRest(1, 2, 3, 4));
console.log('addCurried:', addCurried(5)(6));
console.log('addDefault:', addDefault());
console.log('addArguments:', addArguments(1, 2, 3));
console.log('addIIFE:', addIIFE(7, 8));
console.log('addLogged:', addLogged(9, 1));
(async () => {
    console.log('addAsyncGenerator first yield:', (await addAsyncGenerator(1,2,3).next()).value);
    const adv = new AdvancedAdder();
    console.log('AdvancedAdder.addField:', adv.addField(2,3));
    console.log('AdvancedAdder.add (private):', adv.add(4,5));
    console.log('dynamicObj computedAdd:', dynamicObj[methodName](1,1));
    addCallback(2,3,(err,res)=> console.log('addCallback:', err, res));
    addPromise(3,4).then(r => console.log('addPromise:', r));
    console.log('addThunk via trampoline:', trampoline(bounceAdd(7,8)));
    console.log('addThroughProxy:', addThroughProxy(2,2));
})();