const { getLongestString } = require('../utils/getLongestString.js');

test('Empty array', () => {
	expect(() => {
		getLongestString([]);
	}).toThrow('Array is empty');
});

test('Param is not array', () => {
	expect(() => {
		getLongestString('When you see it');
	}).toThrow('Given parameter is not an array');
});

test('Array with single item', () => {
	expect(getLongestString(['Hi'])).toBe('Hi');
});

test('Multiple items, no identical length', () => {
	const array = [
		'hi',
		'shorty',
		'i don\'t know',
		'what to put here',
		'the quick brown fox jumps over the lazy dog'
	];
	expect(getLongestString(array)).toBe('the quick brown fox jumps over the lazy dog');
});

test('Multiple items, identical length', () => {
	const array = [
		'*these',
		'**have',
		'***the',
		'**same',
		'length'
	];
	expect(getLongestString(array)).toBe('length');
});
