const { createBar } = require('../utils/createBar.js');

test('No params given', () => {
	expect(() => {
		createBar();
	}).toThrow('Total value is either not provided or invalid');
});

test('Only total given', () => {
	expect(() => {
		createBar(3);
	}).toThrow('Current value is either not provided or invalid');
});

test('Total param is not a number', () => {
	expect(() => {
		createBar('funny', 3);
	}).toThrow('Total value is not an integer');
});

test('Current param is not a number', () => {
	expect(() => {
		createBar(10, 'funny');
	}).toThrow('Current value is not an integer');
});

test('Size param is not a number', () => {
	expect(() => {
		createBar(3, 10, 'funny');
	}).toThrow('Size is not an integer');
});

test('Current greater than total', () => {
	expect(() => {
		createBar(10, 11);
	}).toThrow('Current value is greater than total');
});

test('Correct params', () => {
	expect(createBar(10, 3, 10)).toBe('▬▬🔵▬▬▬▬▬▬▬');
});
