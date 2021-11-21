const { firesObjectifier } = require('../utils/firesObjectifier.js');

test('Given data is not a number', () => {
	expect(() => {
		firesObjectifier('funny');
	}).toThrow('Given value is not a number');
});

test('Given data is a stringified number', () => {
	expect(() => {
		firesObjectifier('8');
	}).not.toThrow('Given value is not a number');
});

test('0', () => {
	expect(firesObjectifier(0)).toBe('00th');
});

test('1', () => {
	expect(firesObjectifier(1)).toBe('01st');
});

test('2', () => {
	expect(firesObjectifier(2)).toBe('02nd');
});

test('3', () => {
	expect(firesObjectifier(3)).toBe('03rd');
});

test('4', () => {
	expect(firesObjectifier(4)).toBe('04th');
});

test('10', () => {
	expect(firesObjectifier(10)).toBe('10th');
});

test('11', () => {
	expect(firesObjectifier(11)).toBe('11th');
});

test('13', () => {
	expect(firesObjectifier(13)).toBe('13th');
});

test('14', () => {
	expect(firesObjectifier(14)).toBe('14th');
});

test('22', () => {
	expect(firesObjectifier(22)).toBe('22nd');
});

test('1000', () => {
	expect(firesObjectifier(1000)).toBe('1000th');
});
