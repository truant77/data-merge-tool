// This 'use strict' is good practice.
'use strict';

console.log("app.js loaded. Prototype is running.");

// Get references to our HTML elements
const fileInputA = document.getElementById('fileA');
const fileInputB = document.getElementById('fileB');

// We will store our parsed data here
let dataA = null;
let dataB = null;

// Add event listeners to the file inputs
fileInputA.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.log("No file selected for File A.");
        return;
    }
    
    // Use PapaParse to parse the CSV file
    Papa.parse(file, {
        header: true, // Treat the first row as headers
        dynamicTyping: true, // Automatically convert numbers/booleans
        complete: (results) => {
            console.log("File A Parsed:");
            console.log(results.data);
            dataA = results.data;
        },
        error: (error) => {
            console.error("Error parsing File A:", error.message);
        }
    });
});

fileInputB.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.log("No file selected for File B.");
        return;
    }
    
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            console.log("File B Parsed:");
            console.log(results.data);
            dataB = results.data;
        },
        error: (error) => {
            console.error("Error parsing File B:", error.message);
        }
    });
});