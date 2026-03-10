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

    test('Invalid operation', () => {
        try {
            runCalc('mod', 7, 3);
        } catch (e) {
            expect(e.stdout).toBeUndefined();
            expect(e.stderr).toContain('Usage: calculator <add|sub|mul|div> <num1> <num2>');
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
