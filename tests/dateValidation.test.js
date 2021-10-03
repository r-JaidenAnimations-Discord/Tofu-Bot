const { validateDate } = require('../utils/dateValidation.js');

test('Check invalid date in random string', () => {
	expect(validateDate('aiosdjf')).toBeFalsy();
});

test('Check invalid date flipped month and day', () => {
	expect(validateDate('31/12/2021')).toBeFalsy();
});

test('Invalid leap year', () => {
	expect(validateDate('02/29/2021')).toBeFalsy();
});

test('Valid leap year', () => {
	expect(validateDate('02/29/2024')).toBe('02/29/2024');
});

test('Valid date with \'/\' separators', () => {
	expect(validateDate('12/31/2002')).toBe('12/31/2002');
});

test('Valid date with \'-\' separators', () => {
	expect(validateDate('12-31-2002')).toBe('12/31/2002');
});

test('Valid date with mixed separators', () => {
	expect(validateDate('12/31-2002')).toBe('12/31/2002');
});
