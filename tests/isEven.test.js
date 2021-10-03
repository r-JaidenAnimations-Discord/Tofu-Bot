const { isEven } = require('../utils/isEven.js');

test('No params given', () => {
	expect(() => {
		isEven();
	}).toThrow('No param geven');
});

test('Param not a number', () => {
	expect(() => {
		isEven('funny');
	}).toThrow('Parameter is not a number');
});

test('Zero', () => {
	expect(isEven(0)).toBeTruthy();
});

test('Even number', () => {
	expect(isEven(20)).toBeTruthy();
});

test('Odd number', () => {
	expect(isEven(9)).toBeFalsy();
});
