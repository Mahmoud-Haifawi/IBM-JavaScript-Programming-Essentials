/*
 * JSON (JavaScript Object Notation) - Complete Guide
 * ===============================================
 * 
 * What is JSON?
 * - A lightweight data format for storing and transporting data
 * - Language independent (works with any programming language)
 * - Self-describing and easy to understand
 */

// ========================================
// 1. JSON DATA TYPES
// ========================================

const jsonTypes = {
    // 1. String
    name: "John Doe",
    
    // 2. Number
    age: 30,
    height: 1.75,
    
    // 3. Boolean
    isStudent: true,
    
    // 4. null
    certificate: null,
    
    // 5. Array
    hobbies: ["reading", "music", "sports"],
    
    // 6. Object
    address: {
        street: "123 Main St",
        city: "Boston",
        country: "USA"
    }
};

// ========================================
// 2. JSON CONVERSION
// ========================================

// 2.1 Convert JavaScript object to JSON string
console.log('\n=== Object to JSON ===');
const jsonString = JSON.stringify(jsonTypes);
console.log('JSON string:', jsonString);

// 2.2 Convert JSON string back to JavaScript object
console.log('\n=== JSON to Object ===');
const parsedObject = JSON.parse(jsonString);
console.log('Parsed object:', parsedObject);

// ========================================
// 3. JSON FORMATTING
// ========================================

// 3.1 Pretty printing JSON
console.log('\n=== Pretty JSON ===');
const prettyJson = JSON.stringify(jsonTypes, null, 2);
console.log(prettyJson);

// 3.2 Custom Formatting with Replacer
console.log('\n=== Custom JSON Formatting ===');
const customJson = JSON.stringify(jsonTypes, (key, value) => {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}, 2);
console.log(customJson);

// ========================================
// 4. COMMON JSON OPERATIONS
// ========================================

// 4.1 Nested Object Access
const user = {
    id: 1,
    name: "Jane Doe",
    skills: {
        programming: ["JavaScript", "Python"],
        languages: {
            native: "English",
            foreign: ["Spanish", "French"]
        }
    }
};

// Converting complex object to JSON
console.log('\n=== Complex Object to JSON ===');
console.log(JSON.stringify(user, null, 2));

// 4.2 JSON Array Operations
const users = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 }
];

// Converting array to JSON
console.log('\n=== Array to JSON ===');
console.log(JSON.stringify(users, null, 2));

// ========================================
// 5. ERROR HANDLING
// ========================================

console.log('\n=== Error Handling ===');

// 5.1 Invalid JSON Handling
try {
    const invalidJson = '{"name": "John", age: 30}'; // Missing quotes around age
    JSON.parse(invalidJson);
} catch (error) {
    console.log('Invalid JSON error:', error.message);
}

// 5.2 Circular Reference Handling
try {
    const circular = { name: "John" };
    circular.self = circular; // Circular reference
    JSON.stringify(circular);
} catch (error) {
    console.log('Circular reference error:', error.message);
}

// ========================================
// 6. PRACTICAL EXAMPLES
// ========================================

// 6.1 API Response Handling
const apiResponse = `{
    "status": "success",
    "data": {
        "users": [
            {"id": 1, "name": "John"},
            {"id": 2, "name": "Jane"}
        ]
    }
}`;

console.log('\n=== API Response Handling ===');
const response = JSON.parse(apiResponse);
console.log('Parsed API response:', response.data.users);

// 6.2 JSON Configuration
const config = {
    appName: "MyApp",
    version: "1.0.0",
    settings: {
        theme: "dark",
        notifications: true,
        language: "en"
    }
};

console.log('\n=== Configuration Example ===');
const configString = JSON.stringify(config, null, 2);
console.log('App configuration:', configString);

/*
 * BEST PRACTICES:
 * 1. Always use try-catch when parsing JSON
 * 2. Validate JSON data structure after parsing
 * 3. Use proper error handling for API responses
 * 4. Consider using JSON schema validation for complex data
 * 5. Be careful with floating-point numbers in JSON
 * 6. Remember JSON doesn't support undefined or functions
 */

// ========================================
// 7. JSON SCHEMA VALIDATION EXAMPLE
// ========================================

const userSchema = {
    type: "object",
    required: ["name", "age"],
    properties: {
        name: { type: "string" },
        age: { type: "number" },
        email: { type: "string", format: "email" }
    }
};

// Note: In real applications, use libraries like 'ajv' for schema validation

console.log('\n=== JSON Guide Complete ===');