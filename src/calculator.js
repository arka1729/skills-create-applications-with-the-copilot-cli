#!/usr/bin/env node

// Node.js CLI Calculator
// Supports: Addition, Subtraction, Multiplication, Division

const [,, operation, ...args] = process.argv;

function printUsage() {
    console.log('Usage: calculator <add|sub|mul|div> <num1> <num2>');
    console.log('Example: calculator add 2 3');
}

if (!operation || args.length !== 2) {
    printUsage();
    process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

if (isNaN(num1) || isNaN(num2)) {
    console.error('Both arguments must be valid numbers.');
    process.exit(1);
}

switch (operation) {
    case 'add':
        // Addition
        console.log(`${num1} + ${num2} = ${num1 + num2}`);
        break;
    case 'sub':
        // Subtraction
        console.log(`${num1} - ${num2} = ${num1 - num2}`);
        break;
    case 'mul':
        // Multiplication
        console.log(`${num1} * ${num2} = ${num1 * num2}`);
        break;
    case 'div':
        // Division
        if (num2 === 0) {
            console.error('Error: Division by zero.');
            process.exit(1);
        }
        console.log(`${num1} / ${num2} = ${num1 / num2}`);
        break;
    default:
        printUsage();
        process.exit(1);
}
