#!/usr/bin/env node

// Node.js CLI Calculator
// Supports: Addition, Subtraction, Multiplication, Division

const [,, operation, ...args] = process.argv;

function printUsage() {
    console.log('Usage: calculator <add|sub|mul|div|mod|power|sqrt> <num1> <num2>');
    console.log('Examples:');
    console.log('  calculator add 2 3');
    console.log('  calculator mod 10 3');
    console.log('  calculator power 2 4');
    console.log('  calculator sqrt 9');
}

if (!operation || (operation !== 'sqrt' && args.length !== 2) || (operation === 'sqrt' && args.length !== 1)) {
    printUsage();
    process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = args.length > 1 ? parseFloat(args[1]) : undefined;

if (operation === 'sqrt') {
    if (isNaN(num1)) {
        console.error('Argument must be a valid number.');
        process.exit(1);
    }
} else {
    if (isNaN(num1) || isNaN(num2)) {
        console.error('Both arguments must be valid numbers.');
        process.exit(1);
    }
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
    case 'mod':
        // Modulo
        if (num2 === 0) {
            console.error('Error: Modulo by zero.');
            process.exit(1);
        }
        console.log(`${num1} % ${num2} = ${num1 % num2}`);
        break;
    case 'power':
        // Exponentiation (power)
        console.log(`${num1} ^ ${num2} = ${Math.pow(num1, num2)}`);
        break;
    case 'sqrt':
        // Square Root
        if (num1 < 0) {
            console.error('Error: Cannot take square root of a negative number.');
            process.exit(1);
        }
        console.log(`sqrt(${num1}) = ${Math.sqrt(num1)}`);
        break;
    default:
        printUsage();
        process.exit(1);
}
