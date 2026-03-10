// calculator.test.js
// Comprehensive unit tests for calculator.js

const { execSync } = require('child_process');

function runCalc(op, a, b) {
    const result = execSync(`node ../calculator.js ${op} ${a} ${b}`, { encoding: 'utf8' });
    return result.trim();
}

describe('Calculator CLI', () => {
    test('Addition: 7 + 3 = 10', () => {
        expect(runCalc('add', 7, 3)).toBe('7 + 3 = 10');
    });

    test('Subtraction: 7 - 3 = 4', () => {
        expect(runCalc('sub', 7, 3)).toBe('7 - 3 = 4');
    });

    test('Multiplication: 7 * 3 = 21', () => {
        expect(runCalc('mul', 7, 3)).toBe('7 * 3 = 21');
    });

    test('Division: 7 / 3 ≈ 2.333...', () => {
        expect(runCalc('div', 7, 3)).toBe('7 / 3 = ' + (7 / 3));
    });

    test('Division by zero', () => {
        try {
            runCalc('div', 7, 0);
        } catch (e) {
            expect(e.stdout).toBeUndefined();
            expect(e.stderr).toContain('Error: Division by zero.');
        }
    });

    // New operation tests
    test('Modulo: 10 % 3 = 1', () => {
        expect(runCalc('mod', 10, 3)).toBe('10 % 3 = 1');
    });

    test('Modulo by zero', () => {
        try {
            runCalc('mod', 10, 0);
        } catch (e) {
            expect(e.stdout).toBeUndefined();
            expect(e.stderr).toContain('Error: Modulo by zero.');
        }
    });

    test('Exponentiation: 2 ^ 4 = 16', () => {
        expect(runCalc('power', 2, 4)).toBe('2 ^ 4 = 16');
    });

    test('Exponentiation: 5 ^ 0 = 1', () => {
        expect(runCalc('power', 5, 0)).toBe('5 ^ 0 = 1');
    });

    test('Square root: sqrt(9) = 3', () => {
        const result = runCalc('sqrt', 9);
        expect(result).toBe('sqrt(9) = 3');
    });

    test('Square root: sqrt(2) ≈ 1.414...', () => {
        const result = runCalc('sqrt', 2);
        expect(result).toBe('sqrt(2) = ' + Math.sqrt(2));
    });

    test('Square root of negative number', () => {
        try {
            runCalc('sqrt', -4);
        } catch (e) {
            expect(e.stdout).toBeUndefined();
            expect(e.stderr).toContain('Error: Cannot take square root of a negative number.');
        }
    });

    // Existing error tests
    test('Invalid operation', () => {
        try {
            runCalc('foo', 7, 3);
        } catch (e) {
            expect(e.stdout).toBeUndefined();
            expect(e.stderr).toContain('Usage: calculator <add|sub|mul|div|mod|pow|sqrt> <num1> <num2>');
        }
    });

    test('Non-numeric input', () => {
        try {
            runCalc('add', 'a', 3);
        } catch (e) {
            expect(e.stdout).toBeUndefined();
            expect(e.stderr).toContain('Both arguments must be valid numbers.');
        }
    });
});
