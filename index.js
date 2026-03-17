const express = require('express');
// BUG: We are importing lodash but it's not in package.json!
const _ = require('lodash');

const app = express();

app.get('/', (req, res) => {
    const array = [1, 2, 3];
    // Use lodash just to prove we need it
    res.send('Hello World! ' + _.reverse(array).join(','));
});

// For build step, we just exit immediately to simulate a build check
console.log("Building app...");
const testArray = [1, 2, 3];
console.log("Reversed:", _.reverse(testArray));
console.log("Build successful!");
process.exit(0);
