const contacts = require("./contacts"); // import pliku contacts.js

// Testowanie czasu wykonania funkcji listContacts
const startTime = Date.now();
contacts.listContacts();
const endTime = Date.now();
const elapsedTime = endTime - startTime;
console.log(`Time elapsed: ${elapsedTime} ms`);

// console.log("Hello, Node.js!");
