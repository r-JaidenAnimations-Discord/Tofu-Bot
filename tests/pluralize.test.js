const { pluralizeWithNumber, pluralizeWordOnly } = require('../utils/pluralize.js');

test('Pluralizes word only, non pluralized', () => {
	expect(pluralizeWordOnly('test', 1)).toBe('test');
});

test('Pluralizes word only, pluralized', () => {
	expect(pluralizeWordOnly('test', 5)).toBe('tests');
});

test('Pluralizes word with number, non pluralized', () => {
	expect(pluralizeWithNumber('test', 1)).toBe('1 test');
});

test('Pluralizes word with number, pluralized', () => {
	expect(pluralizeWithNumber('test', 5)).toBe('5 tests');
});
